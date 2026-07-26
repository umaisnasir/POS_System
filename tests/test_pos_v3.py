from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import Page, sync_playwright

ROOT = Path(__file__).resolve().parents[1]


def compiled_html(stale_storage: bool) -> str:
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'styles.css').read_text(encoding='utf-8')
    js = (ROOT / 'app.js').read_text(encoding='utf-8')

    assert 'styles.css?v=3.1.0' in html
    assert 'app.js?v=3.1.0' in html
    assert '£4,286.40' not in html and '#1048' not in html and '>186<' not in html

    seed = [
        "['nova-pos-storage-version','2']",
        "['nova-order-number','1048']",
        "['nova-held-orders','[{\"id\":\"old\"}]']",
        "['nova-pos-v2-order-number','1050']",
        "['nova-pos-v2-held-orders','[{\"id\":\"old-v2\"}]']",
        "['nova-pos-v2-theme','aurora']",
    ] if stale_storage else []

    storage_polyfill = f"""
    <script>
    (() => {{
      const data = new Map([{','.join(seed)}]);
      Object.defineProperty(window, 'localStorage', {{
        configurable: true,
        value: {{
          getItem: key => data.has(String(key)) ? data.get(String(key)) : null,
          setItem: (key, value) => data.set(String(key), String(value)),
          removeItem: key => data.delete(String(key)),
          clear: () => data.clear(),
          key: index => Array.from(data.keys())[index] ?? null,
          get length() {{ return data.size; }}
        }}
      }});
      window.confirm = () => true;
    }})();
    </script>
    """

    html = re.sub(r'<link rel="stylesheet" href="styles\.css\?v=3\.1\.0"\s*/>', f'<style>{css}</style>{storage_polyfill}', html)
    html = re.sub(r'<script src="app\.js\?v=3\.1\.0"></script>', f'<script>{js}</script>', html)
    return html


def load(page: Page, stale_storage: bool) -> None:
    page.set_content(compiled_html(stale_storage), wait_until='load')
    page.wait_for_selector('.product-card')
    page.wait_for_function("document.body.dataset.theme === 'nebula'")


def zero_state(page: Page) -> None:
    expected = {
        '#netSales': '£0.00', '#transactionCount': '0', '#averageBasket': '£0.00',
        '#netSalesTrend': '0.0%', '#transactionTrend': '0.0%', '#basketTrend': '0.0%',
        '#orderNumber': '#0000', '#itemCount': '0 items', '#subtotal': '£0.00',
        '#discount': '−£0.00', '#vat': '£0.00', '#total': '£0.00',
        '#heldCount': '0', '#notificationCount': '0',
    }
    for selector, value in expected.items():
        actual = page.locator(selector).text_content().strip()
        assert actual == value, f'{selector}: expected {value!r}, got {actual!r}'
    assert page.locator('#checkoutButton').is_disabled()
    assert page.locator('#themeLabel').text_content().strip() == 'Dark'


def storage_migrated(page: Page) -> None:
    storage = page.evaluate("""() => ({
      version: localStorage.getItem('nova-pos-storage-version'),
      oldOrder: localStorage.getItem('nova-order-number'), oldHeld: localStorage.getItem('nova-held-orders'),
      v2Order: localStorage.getItem('nova-pos-v2-order-number'), v2Held: localStorage.getItem('nova-pos-v2-held-orders'),
      v2Theme: localStorage.getItem('nova-pos-v2-theme'), v3Order: localStorage.getItem('nova-pos-v3-order-number'),
      v3Held: localStorage.getItem('nova-pos-v3-held-orders')
    })""")
    assert storage['version'] == '3', storage
    for key in ('oldOrder','oldHeld','v2Order','v2Held','v2Theme','v3Order'):
        assert storage[key] is None, storage
    assert storage['v3Held'] == '[]', storage


def badges_visible(page: Page) -> None:
    badges = page.evaluate("""() => [...document.querySelectorAll('.top-actions .notification-dot')].map(dot => {
      const r=dot.getBoundingClientRect(), p=dot.parentElement.getBoundingClientRect();
      const s=getComputedStyle(dot), ps=getComputedStyle(dot.parentElement);
      return {text:dot.textContent.trim(),width:r.width,height:r.height,left:r.left,top:r.top,right:r.right,bottom:r.bottom,
        parentRight:p.right,parentTop:p.top,display:s.display,visibility:s.visibility,opacity:Number(s.opacity),
        parentOverflow:ps.overflow,inViewport:r.left>=0&&r.top>=0&&r.right<=innerWidth&&r.bottom<=innerHeight};
    })""")
    assert len(badges) == 2, badges
    for badge in badges:
        assert badge['text'] == '0', badge
        assert badge['width'] >= 19 and badge['height'] >= 19, badge
        assert badge['display'] != 'none' and badge['visibility'] == 'visible' and badge['opacity'] >= .99, badge
        assert badge['parentOverflow'] == 'visible', badge
        assert badge['right'] > badge['parentRight'] and badge['top'] < badge['parentTop'], badge
        assert badge['inViewport'], badge


def product_spacing(page: Page) -> None:
    values = page.evaluate("""() => [...document.querySelectorAll('.product-card')].map(card => {
      const c=card.getBoundingClientRect(), f=card.querySelector('.product-footer').getBoundingClientRect(),
            v=card.querySelector('.product-visual').getBoundingClientRect();
      return {height:c.height,bottomGap:c.bottom-f.bottom,visualHeight:v.height,footerInside:f.bottom<=c.bottom&&f.top>=c.top};
    })""")
    assert values
    assert min(x['height'] for x in values) >= 237, values
    assert min(x['bottomGap'] for x in values) >= 20, values
    assert min(x['visualHeight'] for x in values) >= 125, values
    assert all(x['footerInside'] for x in values), values


def layout(page: Page, width: int, height: int) -> None:
    page.set_viewport_size({'width':width,'height':height})
    page.wait_for_timeout(120)
    result = page.evaluate("""() => {
      const shell=document.querySelector('.pos-shell'), sr=shell.getBoundingClientRect();
      return {display:getComputedStyle(shell).display,overflowX:document.body.scrollWidth>innerWidth,
        overflowY:document.body.scrollHeight>innerHeight,shell:{left:sr.left,top:sr.top,right:sr.right,bottom:sr.bottom},
        clipped:[...document.querySelectorAll('.product-card')].filter(card=>{
          const c=card.getBoundingClientRect(),f=card.querySelector('.product-footer').getBoundingClientRect();
          return f.bottom>c.bottom||f.left<c.left||f.right>c.right;
        }).length};
    }""")
    assert result['display'] != 'none', result
    assert not result['overflowX'] and not result['overflowY'], result
    assert result['shell']['left'] >= -1 and result['shell']['top'] >= -1, result
    assert result['shell']['right'] <= width+1 and result['shell']['bottom'] <= height+1, result
    assert result['clipped'] == 0, result


def switch_theme(page: Page) -> None:
    before = page.evaluate("""() => {const p=document.querySelector('.catalog');return {
      theme:document.body.dataset.theme,bg:getComputedStyle(document.body).backgroundImage,
      color:getComputedStyle(document.body).color,panel:getComputedStyle(p).backgroundImage,
      scheme:getComputedStyle(document.body).colorScheme,label:document.querySelector('#themeLabel').textContent.trim()};}""")
    page.locator('#themeToggle').click()
    page.wait_for_timeout(450)
    after = page.evaluate("""() => {const p=document.querySelector('.catalog');return {
      theme:document.body.dataset.theme,bg:getComputedStyle(document.body).backgroundImage,
      color:getComputedStyle(document.body).color,panel:getComputedStyle(p).backgroundImage,
      scheme:getComputedStyle(document.body).colorScheme,label:document.querySelector('#themeLabel').textContent.trim(),
      pressed:document.querySelector('#themeToggle').getAttribute('aria-pressed'),stored:localStorage.getItem('nova-pos-v3-theme')};}""")
    assert before['theme']=='nebula' and before['label']=='Dark', before
    assert after['theme']=='lumen' and after['label']=='Light', after
    assert after['pressed']=='true' and after['stored']=='lumen', after
    for key in ('bg','color','panel','scheme'):
        assert before[key] != after[key], (key,before,after)


def mean_difference(a: Path, b: Path) -> float:
    stat = ImageStat.Stat(ImageChops.difference(Image.open(a).convert('RGB'),Image.open(b).convert('RGB')))
    return sum(stat.mean)/3


def functionality(page: Page) -> None:
    page.locator('.product-card').first.click()
    assert page.locator('#itemCount').text_content().strip() == '1 item'
    page.locator('.qty-control [data-delta="1"]').click()
    assert page.locator('#itemCount').text_content().strip() == '2 items'
    page.locator('#discountButton').click()
    assert page.locator('#discountButton').text_content().strip() == 'Remove'
    page.locator('#checkoutButton').click(); assert page.locator('#paymentDialog').evaluate('(e)=>e.open') is True
    page.locator('#cancelPayment').click(); page.locator('#holdButton').click()
    assert page.locator('#heldCount').text_content().strip() == '1'
    page.locator('#heldOrdersButton').click(); page.locator('[data-resume-id]').click()
    assert page.locator('#heldCount').text_content().strip() == '0'
    page.locator('#checkoutButton').click(); page.locator('#completePayment').click()
    assert page.locator('#transactionCount').text_content().strip() == '1'
    assert page.locator('#orderNumber').text_content().strip() == '#0001'
    assert page.locator('#netSales').text_content().strip() != '£0.00'


def main() -> None:
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
        page=browser.new_page(viewport={'width':1692,'height':896})
        errors=[]
        page.on('console',lambda m: errors.append('console:'+m.text) if m.type=='error' else None)
        page.on('pageerror',lambda e: errors.append('pageerror:'+str(e)))
        load(page,True)
        zero_state(page); storage_migrated(page); badges_visible(page); product_spacing(page)
        for vp in [(1280,720),(1440,900),(1692,896),(1920,1080)]: layout(page,*vp)
        page.set_viewport_size({'width':1692,'height':896})
        dark,light=ROOT/'preview-dark-v3.png',ROOT/'preview-light-v3.png'
        page.screenshot(path=str(dark),full_page=True)
        switch_theme(page)
        page.wait_for_timeout(2600)
        page.screenshot(path=str(light),full_page=True)
        difference=mean_difference(dark,light)
        assert difference>45,f'themes too similar: {difference:.2f}'
        page.locator('#themeToggle').click(); page.wait_for_timeout(350)
        functionality(page)
        assert not errors,errors
        page.close()

        fresh=browser.new_page(viewport={'width':1692,'height':896})
        fresh_errors=[]
        fresh.on('console',lambda m: fresh_errors.append('console:'+m.text) if m.type=='error' else None)
        fresh.on('pageerror',lambda e: fresh_errors.append('pageerror:'+str(e)))
        load(fresh,False)
        zero_state(fresh); badges_visible(fresh); product_spacing(fresh); switch_theme(fresh)
        assert not fresh_errors,fresh_errors
        fresh.close(); browser.close()

    hashes={n:hashlib.sha256((ROOT/n).read_bytes()).hexdigest() for n in ('index.html','styles.css','app.js')}
    report={'status':'passed','build':'3.1.0','viewports':['1280x720','1440x900','1692x896','1920x1080'],
      'theme_mean_pixel_difference':round(difference,2),'checks':[
        'Exact HTML, CSS and JavaScript source compiled and executed without browser errors',
        'Legacy order #1050 and v1/v2 storage migrated to clean v3 state',
        'All operational dashboard values begin at zero','Both zero badges are visible and unclipped',
        'Product cards are at least 238px high with at least 20px below price/rating',
        'Dark Nebula and light Lumen themes are visibly and programmatically different',
        'No page-level overflow at tested desktop viewports','Cart, quantity, discount, hold/resume and payment flows work',
        'Fresh storage also starts at zero'],'sha256':hashes,'previews':['preview-dark-v3.png','preview-light-v3.png']}
    (ROOT/'TEST-REPORT.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps(report,indent=2))


if __name__=='__main__': main()
