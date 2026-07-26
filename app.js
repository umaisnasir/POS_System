'use strict';

const productSymbols = {
  coffee: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M23 24h34l-3 35H26z" fill="rgba(255,255,255,.92)" stroke="rgba(255,255,255,.4)"/><path d="M29 17h22l5 8H24z" fill="rgba(255,255,255,.78)"/><path d="M33 35c3-7 11-7 14 0-3 7-11 7-14 0Z" fill="rgba(90,55,28,.75)" stroke="none"/><path d="M40 30v10" stroke="rgba(255,255,255,.8)"/></svg>',
  tea: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M20 31h38v25a8 8 0 0 1-8 8H28a8 8 0 0 1-8-8Z" fill="rgba(255,255,255,.88)"/><path d="M58 37h5a9 9 0 0 1 0 18h-5" stroke="rgba(255,255,255,.8)" stroke-width="5"/><path d="M31 21c0-5 4-5 4-10M43 21c0-5 4-5 4-10" stroke="rgba(255,255,255,.7)" stroke-width="3"/></svg>',
  croissant: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M15 45c5-14 15-22 25-22s20 8 25 22c-8 13-17 18-25 18s-17-5-25-18Z" fill="rgba(255,219,145,.95)" stroke="rgba(144,87,28,.45)" stroke-width="2"/><path d="M26 28c3 8 3 19 0 29M54 28c-3 8-3 19 0 29M39 23v40" stroke="rgba(143,84,26,.38)" stroke-width="3"/></svg>',
  sandwich: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="m16 34 24-16 24 16-24 13Z" fill="#f8d89a"/><path d="m16 46 24-13 24 13-24 16Z" fill="#fff0bb"/><path d="m18 42 22-10 22 10-22 9Z" fill="#74c98b"/><path d="m19 48 21-8 21 8-21 8Z" fill="#e75f67"/></svg>',
  cake: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M18 35h44v27H18z" fill="#f0c1c8"/><path d="M18 35c10-16 34-16 44 0Z" fill="#fff0df"/><path d="M23 46h34" stroke="#fff" stroke-width="4"/><path d="M40 17v11" stroke="#fff" stroke-width="3"/><path d="M36 16c1-7 7-7 8 0-2 3-6 3-8 0Z" fill="#ffbe66" stroke="none"/></svg>',
  bowl: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M15 33h50c-2 20-11 30-25 30S17 53 15 33Z" fill="rgba(255,255,255,.9)"/><path d="M21 33c6-9 32-9 38 0" fill="#e8844b"/><path d="M27 27c0-6 5-6 5-12M40 27c0-6 5-6 5-12M53 27c0-6 5-6 5-12" stroke="rgba(255,255,255,.65)" stroke-width="3"/></svg>',
  bottle: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M31 13h18v11l6 8v28a7 7 0 0 1-7 7H32a7 7 0 0 1-7-7V32l6-8Z" fill="rgba(255,255,255,.82)"/><path d="M27 40h26v19H27z" fill="rgba(90,212,255,.7)" stroke="none"/><path d="M32 17h16" stroke="rgba(255,255,255,.75)" stroke-width="3"/></svg>',
  juice: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M22 24h38l-4 42H26z" fill="rgba(255,255,255,.84)"/><path d="M27 35h28l-3 27H30z" fill="#ffad60" stroke="none"/><path d="M46 27 57 12" stroke="#fff" stroke-width="4"/><circle cx="39" cy="48" r="7" fill="#ffcf65" stroke="none"/></svg>',
  salad: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M15 40h50c-3 16-12 23-25 23S18 56 15 40Z" fill="rgba(255,255,255,.9)"/><circle cx="28" cy="36" r="10" fill="#5edb8e" stroke="none"/><circle cx="42" cy="31" r="11" fill="#78e5a2" stroke="none"/><circle cx="54" cy="37" r="9" fill="#ff8b72" stroke="none"/></svg>',
  cookie: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="27" fill="#e4b06b" stroke="#9a6735" stroke-width="2"/><circle cx="30" cy="29" r="4" fill="#74401f" stroke="none"/><circle cx="49" cy="31" r="3" fill="#74401f" stroke="none"/><circle cx="35" cy="47" r="3" fill="#74401f" stroke="none"/><circle cx="51" cy="51" r="4" fill="#74401f" stroke="none"/><circle cx="25" cy="48" r="2" fill="#74401f" stroke="none"/></svg>',
  wrap: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="m20 19 40 11-15 37-28-8Z" fill="#f3dca6"/><path d="m24 28 31 8-4 9-31-8Z" fill="#65c878"/><path d="m19 42 29 8-4 8-27-7Z" fill="#ef6e61"/></svg>',
  matcha: '<svg class="product-symbol" viewBox="0 0 80 80" aria-hidden="true"><path d="M22 26h36l-4 37H26z" fill="rgba(255,255,255,.9)"/><path d="M27 40h28l-3 19H29z" fill="#72c89a" stroke="none"/><path d="M31 24c2-7 16-7 18 0" fill="#9adfb6"/></svg>'
};

const products = [
  { id: 1, name: 'Velvet Flat White', sku: 'CF-101', category: 'Coffee', price: 4.20, rating: 4.9, badge: 'Bestseller', symbol: 'coffee', bg: 'linear-gradient(145deg,#5e3a2d,#bd7256)' },
  { id: 2, name: 'Iced Oat Latte', sku: 'CF-204', category: 'Coffee', price: 4.65, rating: 4.8, badge: 'Popular', symbol: 'coffee', bg: 'linear-gradient(145deg,#917056,#dcb98c)' },
  { id: 3, name: 'Ceremonial Matcha', sku: 'TE-109', category: 'Tea', price: 5.10, rating: 4.7, badge: 'New', symbol: 'matcha', bg: 'linear-gradient(145deg,#316e5c,#75c5a1)' },
  { id: 4, name: 'Earl Grey Cloud', sku: 'TE-121', category: 'Tea', price: 3.85, rating: 4.6, badge: 'Classic', symbol: 'tea', bg: 'linear-gradient(145deg,#30436c,#7089b8)' },
  { id: 5, name: 'Butter Croissant', sku: 'BK-304', category: 'Bakery', price: 3.40, rating: 4.9, badge: 'Fresh', symbol: 'croissant', bg: 'linear-gradient(145deg,#8e552a,#e5a85c)' },
  { id: 6, name: 'Ruby Velvet Slice', sku: 'BK-318', category: 'Bakery', price: 5.75, rating: 4.8, badge: 'Chef pick', symbol: 'cake', bg: 'linear-gradient(145deg,#6c283a,#c45d73)' },
  { id: 7, name: 'Dark Choc Cookie', sku: 'BK-329', category: 'Bakery', price: 2.80, rating: 4.7, badge: 'Vegan', symbol: 'cookie', bg: 'linear-gradient(145deg,#3c281f,#9f6d48)' },
  { id: 8, name: 'Truffle Melt', sku: 'ML-401', category: 'Meals', price: 8.90, rating: 4.9, badge: 'Premium', symbol: 'sandwich', bg: 'linear-gradient(145deg,#5b3528,#c58a5d)' },
  { id: 9, name: 'Miso Nourish Bowl', sku: 'ML-416', category: 'Meals', price: 10.50, rating: 4.8, badge: 'Healthy', symbol: 'bowl', bg: 'linear-gradient(145deg,#65452f,#d38d54)' },
  { id: 10, name: 'Garden Crunch Salad', sku: 'ML-430', category: 'Meals', price: 9.25, rating: 4.6, badge: 'Low carb', symbol: 'salad', bg: 'linear-gradient(145deg,#256049,#62b982)' },
  { id: 11, name: 'Harissa Chicken Wrap', sku: 'ML-443', category: 'Meals', price: 8.40, rating: 4.7, badge: 'Spicy', symbol: 'wrap', bg: 'linear-gradient(145deg,#783b30,#d8725c)' },
  { id: 12, name: 'Citrus Cold Press', sku: 'CD-502', category: 'Cold Drinks', price: 4.95, rating: 4.8, badge: 'Vitamin C', symbol: 'juice', bg: 'linear-gradient(145deg,#a75229,#ffad55)' },
  { id: 13, name: 'Alpine Sparkling', sku: 'CD-514', category: 'Cold Drinks', price: 2.95, rating: 4.5, badge: 'Zero sugar', symbol: 'bottle', bg: 'linear-gradient(145deg,#1f5872,#55bfe4)' },
  { id: 14, name: 'Rose Lemonade', sku: 'CD-526', category: 'Cold Drinks', price: 4.35, rating: 4.7, badge: 'Seasonal', symbol: 'juice', bg: 'linear-gradient(145deg,#8d395e,#e4779e)' },
  { id: 15, name: 'Chai Ember', sku: 'TE-137', category: 'Tea', price: 4.10, rating: 4.8, badge: 'Signature', symbol: 'tea', bg: 'linear-gradient(145deg,#704026,#c77e45)' },
  { id: 16, name: 'Piccolo Noir', sku: 'CF-224', category: 'Coffee', price: 3.60, rating: 4.6, badge: 'Strong', symbol: 'coffee', bg: 'linear-gradient(145deg,#2c2426,#725054)' }
];

const STORAGE = Object.freeze({
  versionKey: 'nova-pos-storage-version',
  version: '3',
  orderNumber: 'nova-pos-v3-order-number',
  heldOrders: 'nova-pos-v3-held-orders',
  theme: 'nova-pos-v3-theme'
});

function initialiseStorage() {
  if (localStorage.getItem(STORAGE.versionKey) === STORAGE.version) return;
  [
    'nova-order-number',
    'nova-held-orders',
    'nova-pos-v2-order-number',
    'nova-pos-v2-held-orders',
    'nova-pos-v2-theme',
    STORAGE.orderNumber,
    STORAGE.heldOrders,
    STORAGE.theme
  ].forEach(key => localStorage.removeItem(key));
  localStorage.setItem(STORAGE.versionKey, STORAGE.version);
}

function readHeldOrders() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE.heldOrders) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

initialiseStorage();

const state = {
  category: 'Popular',
  query: '',
  sort: 'Featured',
  cart: new Map(),
  discountRate: 0,
  orderNumber: Number(localStorage.getItem(STORAGE.orderNumber) || 0),
  heldOrders: readHeldOrders(),
  theme: localStorage.getItem(STORAGE.theme) === 'lumen' ? 'lumen' : 'nebula',
  metrics: {
    netSales: 0,
    transactions: 0
  }
};

const refs = {
  categoryRow: document.getElementById('categoryRow'), productGrid: document.getElementById('productGrid'), emptyState: document.getElementById('emptyState'),
  search: document.getElementById('productSearch'), cartItems: document.getElementById('cartItems'), cartEmpty: document.getElementById('cartEmpty'),
  itemCount: document.getElementById('itemCount'), subtotal: document.getElementById('subtotal'), discount: document.getElementById('discount'), vat: document.getElementById('vat'),
  total: document.getElementById('total'), checkoutTotal: document.getElementById('checkoutTotal'), checkoutButton: document.getElementById('checkoutButton'),
  modalTotal: document.getElementById('modalTotal'), completePaymentAmount: document.getElementById('completePaymentAmount'), paymentDialog: document.getElementById('paymentDialog'),
  heldDialog: document.getElementById('heldDialog'), heldOrdersList: document.getElementById('heldOrdersList'), heldCount: document.getElementById('heldCount'), orderNumber: document.getElementById('orderNumber'),
  notificationCount: document.getElementById('notificationCount'), themeToggle: document.getElementById('themeToggle'), themeLabel: document.getElementById('themeLabel'), discountButton: document.getElementById('discountButton'),
  netSales: document.getElementById('netSales'), transactionCount: document.getElementById('transactionCount'), averageBasket: document.getElementById('averageBasket'),
  toastRegion: document.getElementById('toastRegion')
};

const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
const categories = ['Popular', 'Coffee', 'Tea', 'Bakery', 'Meals', 'Cold Drinks'];

function renderCategories() {
  refs.categoryRow.innerHTML = categories.map(category => `
    <button class="category-chip ${state.category === category ? 'active' : ''}" role="tab" aria-selected="${state.category === category}" data-category="${category}">${category}</button>
  `).join('');
}

function getVisibleProducts() {
  let visible = products.filter(product => {
    const query = state.query.trim().toLowerCase();
    const categoryMatch = query ? true : (state.category === 'Popular' ? product.rating >= 4.8 : product.category === state.category);
    const searchMatch = !query || [product.name, product.sku, product.category, product.badge].some(value => value.toLowerCase().includes(query));
    return categoryMatch && searchMatch;
  });
  if (state.sort === 'Price low') visible.sort((a, b) => a.price - b.price);
  if (state.sort === 'Price high') visible.sort((a, b) => b.price - a.price);
  if (state.sort === 'Rating') visible.sort((a, b) => b.rating - a.rating);
  return visible;
}

function renderProducts() {
  const visible = getVisibleProducts();
  refs.productGrid.hidden = visible.length === 0;
  refs.emptyState.hidden = visible.length !== 0;
  refs.productGrid.innerHTML = visible.map(product => `
    <article class="product-card" tabindex="0" data-product-id="${product.id}" aria-label="Add ${product.name} for ${money.format(product.price)}">
      <div class="product-visual" style="--product-bg:${product.bg}">
        <span class="product-badge">${product.badge}</span>
        ${productSymbols[product.symbol]}
        <button class="add-button" data-add-id="${product.id}" aria-label="Add ${product.name}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="product-footer">
          <strong>${money.format(product.price)}</strong>
          <span class="rating"><i class="star"></i>${product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;
  const current = state.cart.get(productId) || { product, quantity: 0 };
  current.quantity += 1;
  state.cart.set(productId, current);
  renderCart();
  showToast('Added to order', `${product.name} is now in the basket.`);
}

function updateQuantity(productId, delta) {
  const item = state.cart.get(productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) state.cart.delete(productId);
  renderCart();
}

function calculateTotals() {
  const subtotal = [...state.cart.values()].reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = subtotal * state.discountRate;
  const taxable = subtotal - discount;
  const vat = taxable * 0.20;
  return { subtotal, discount, taxable, vat, total: taxable + vat };
}

function renderMetrics() {
  const averageBasket = state.metrics.transactions
    ? state.metrics.netSales / state.metrics.transactions
    : 0;
  refs.netSales.textContent = money.format(state.metrics.netSales);
  refs.transactionCount.textContent = String(state.metrics.transactions);
  refs.averageBasket.textContent = money.format(averageBasket);
}

function renderCart() {
  const items = [...state.cart.values()];
  refs.cartItems.innerHTML = items.map(({ product, quantity }) => `
    <article class="cart-item" data-cart-id="${product.id}">
      <div class="cart-item-visual" style="--product-bg:${product.bg}">${productSymbols[product.symbol].replace('product-symbol','')}</div>
      <div class="cart-item-info"><h4>${product.name}</h4><strong>${money.format(product.price * quantity)}</strong></div>
      <div class="qty-control" aria-label="Quantity controls for ${product.name}">
        <button data-qty-id="${product.id}" data-delta="-1" aria-label="Decrease ${product.name}">−</button>
        <span>${quantity}</span>
        <button data-qty-id="${product.id}" data-delta="1" aria-label="Increase ${product.name}">+</button>
      </div>
    </article>
  `).join('');
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  refs.itemCount.textContent = `${quantity} item${quantity === 1 ? '' : 's'}`;
  refs.cartEmpty.hidden = items.length > 0;
  refs.cartItems.hidden = items.length === 0;

  const totals = calculateTotals();
  refs.subtotal.textContent = money.format(totals.subtotal);
  refs.discount.textContent = `−${money.format(totals.discount)}`;
  refs.vat.textContent = money.format(totals.vat);
  refs.total.textContent = money.format(totals.total);
  refs.checkoutTotal.textContent = money.format(totals.total);
  refs.modalTotal.textContent = money.format(totals.total);
  refs.completePaymentAmount.textContent = money.format(totals.total);
  refs.checkoutButton.disabled = items.length === 0;
  refs.discountButton.textContent = state.discountRate ? 'Remove' : 'Add';
  refs.orderNumber.textContent = `#${String(state.orderNumber).padStart(4, '0')}`;
}

function showToast(title, message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<strong>${title}</strong>${message}`;
  refs.toastRegion.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function openPayment() {
  if (!state.cart.size) return;
  refs.paymentDialog.showModal();
}

function completeSale(paymentMethod) {
  const totals = calculateTotals();
  const soldItems = [...state.cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  refs.paymentDialog.close();
  showToast('Payment approved', `${money.format(totals.total)} received by ${paymentMethod}. ${soldItems} item${soldItems === 1 ? '' : 's'} sold.`);
  state.metrics.netSales += totals.taxable;
  state.metrics.transactions += 1;
  state.cart.clear();
  state.discountRate = 0;
  state.orderNumber += 1;
  localStorage.setItem(STORAGE.orderNumber, String(state.orderNumber));
  renderCart();
  renderMetrics();
}

function holdOrder() {
  if (!state.cart.size) {
    showToast('Nothing to hold', 'Add at least one item before holding the order.');
    return;
  }
  const totals = calculateTotals();
  state.heldOrders.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    orderNumber: state.orderNumber,
    createdAt: new Date().toISOString(),
    discountRate: state.discountRate,
    items: [...state.cart.values()].map(({ product, quantity }) => ({ productId: product.id, quantity })),
    total: totals.total
  });
  persistHeldOrders();
  state.cart.clear();
  state.discountRate = 0;
  state.orderNumber += 1;
  localStorage.setItem(STORAGE.orderNumber, String(state.orderNumber));
  renderCart();
  showToast('Order held', 'The sale is available from Held orders.');
}

function persistHeldOrders() {
  localStorage.setItem(STORAGE.heldOrders, JSON.stringify(state.heldOrders));
  refs.heldCount.textContent = String(state.heldOrders.length);
  refs.heldCount.setAttribute('aria-label', `${state.heldOrders.length} held orders`);
}

function renderHeldOrders() {
  if (!state.heldOrders.length) {
    refs.heldOrdersList.innerHTML = '<div class="no-held">No held orders. Orders saved here remain on this device.</div>';
    return;
  }
  refs.heldOrdersList.innerHTML = state.heldOrders.map(order => {
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(new Date(order.createdAt));
    return `<article class="held-order">
      <div><h3>Order #${String(order.orderNumber).padStart(4, '0')} · ${money.format(order.total)}</h3><p>${itemCount} item${itemCount === 1 ? '' : 's'} · Held at ${time}</p></div>
      <div class="held-order-actions"><button class="resume" data-resume-id="${order.id}">Resume</button><button data-delete-held-id="${order.id}">Delete</button></div>
    </article>`;
  }).join('');
}

function resumeHeldOrder(id) {
  const index = state.heldOrders.findIndex(order => order.id === id);
  if (index < 0) return;
  if (state.cart.size && !window.confirm('Replace the current basket with this held order?')) return;
  const [order] = state.heldOrders.splice(index, 1);
  state.cart.clear();
  order.items.forEach(item => {
    const product = products.find(product => product.id === item.productId);
    if (product) state.cart.set(product.id, { product, quantity: item.quantity });
  });
  state.discountRate = order.discountRate || 0;
  state.orderNumber = order.orderNumber;
  localStorage.setItem(STORAGE.orderNumber, String(state.orderNumber));
  persistHeldOrders();
  refs.heldDialog.close();
  renderCart();
  showToast('Order resumed', `Order #${String(order.orderNumber).padStart(4, '0')} is active.`);
}

function deleteHeldOrder(id) {
  state.heldOrders = state.heldOrders.filter(order => order.id !== id);
  persistHeldOrders();
  renderHeldOrders();
}

function resetSale() {
  if (state.cart.size && !window.confirm('Clear all items and start a new sale?')) return;
  state.cart.clear();
  state.discountRate = 0;
  renderCart();
  showToast('New sale ready', 'The basket has been cleared.');
}

refs.categoryRow.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  renderCategories();
  renderProducts();
});

refs.productGrid.addEventListener('click', event => {
  const addButton = event.target.closest('[data-add-id]');
  const card = event.target.closest('[data-product-id]');
  if (addButton) {
    event.stopPropagation();
    addToCart(Number(addButton.dataset.addId));
  } else if (card) addToCart(Number(card.dataset.productId));
});
refs.productGrid.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-product-id]')) {
    event.preventDefault();
    addToCart(Number(event.target.dataset.productId));
  }
});

refs.cartItems.addEventListener('click', event => {
  const button = event.target.closest('[data-qty-id]');
  if (!button) return;
  updateQuantity(Number(button.dataset.qtyId), Number(button.dataset.delta));
});

refs.search.addEventListener('input', event => {
  state.query = event.target.value;
  renderProducts();
});

document.getElementById('resetFilters').addEventListener('click', () => {
  state.category = 'Popular'; state.query = ''; refs.search.value = '';
  renderCategories(); renderProducts();
});

document.getElementById('sortButton').addEventListener('click', event => {
  const cycle = ['Featured', 'Price low', 'Price high', 'Rating'];
  state.sort = cycle[(cycle.indexOf(state.sort) + 1) % cycle.length];
  event.currentTarget.childNodes[0].nodeValue = `${state.sort} `;
  renderProducts();
  showToast('Catalogue sorted', `Products are sorted by ${state.sort.toLowerCase()}.`);
});

document.getElementById('discountButton').addEventListener('click', event => {
  if (!state.cart.size) return showToast('No basket yet', 'Add an item before applying a discount.');
  state.discountRate = state.discountRate === 0 ? 0.10 : 0;
  renderCart();
  showToast(state.discountRate ? 'Discount applied' : 'Discount removed', state.discountRate ? 'A 10% promotional discount is active.' : 'Order pricing returned to standard.');
});

document.getElementById('checkoutButton').addEventListener('click', openPayment);
document.getElementById('holdButton').addEventListener('click', holdOrder);
document.getElementById('newSaleButton').addEventListener('click', resetSale);
document.getElementById('cancelPayment').addEventListener('click', () => refs.paymentDialog.close());
document.getElementById('paymentForm').addEventListener('submit', event => {
  event.preventDefault();
  const method = new FormData(event.currentTarget).get('payment');
  completeSale(method);
});

document.querySelectorAll('input[name="payment"]').forEach(input => input.addEventListener('change', () => {
  document.querySelectorAll('.payment-option').forEach(option => option.classList.toggle('selected', option.querySelector('input').checked));
}));

document.getElementById('heldOrdersButton').addEventListener('click', () => { renderHeldOrders(); refs.heldDialog.showModal(); });
document.getElementById('closeHeldDialog').addEventListener('click', () => refs.heldDialog.close());
refs.heldOrdersList.addEventListener('click', event => {
  const resume = event.target.closest('[data-resume-id]');
  const remove = event.target.closest('[data-delete-held-id]');
  if (resume) resumeHeldOrder(resume.dataset.resumeId);
  if (remove) deleteHeldOrder(remove.dataset.deleteHeldId);
});

function applyTheme(theme, persist = true) {
  const nextTheme = theme === 'lumen' ? 'lumen' : 'nebula';
  state.theme = nextTheme;
  document.body.dataset.theme = nextTheme;
  const isLight = nextTheme === 'lumen';
  refs.themeToggle.setAttribute('aria-pressed', String(isLight));
  refs.themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  refs.themeToggle.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
  refs.themeLabel.textContent = isLight ? 'Light' : 'Dark';
  refs.themeToggle.querySelector('svg').innerHTML = isLight
    ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>'
    : '<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z"></path>';
  document.querySelector('meta[name="theme-color"]').content = isLight ? '#e9f2f8' : '#0b1020';
  if (persist) localStorage.setItem(STORAGE.theme, nextTheme);
}

refs.themeToggle.addEventListener('click', () => {
  const nextTheme = state.theme === 'nebula' ? 'lumen' : 'nebula';
  applyTheme(nextTheme);
  showToast('Theme changed', nextTheme === 'lumen' ? 'Light Lumen theme is active.' : 'Dark Nebula theme is active.');
});

document.getElementById('notificationButton').addEventListener('click', () => showToast('Register healthy', 'Inventory, payments and cloud sync are operating normally.'));
document.getElementById('customerButton').addEventListener('click', () => showToast('Customer profiles', 'Guest checkout is active. Customer search can be connected to your CRM.'));

document.querySelectorAll('.nav-button[data-view]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.nav-button[data-view]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  if (button.dataset.view !== 'sell') showToast('Demo navigation', `${button.querySelector('span').textContent} is represented as a ready integration point in this front-end build.`);
}));

document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault(); refs.search.focus(); refs.search.select();
  }
  if (event.key === 'F2') { event.preventDefault(); holdOrder(); }
  if (event.key === 'F4') { event.preventDefault(); openPayment(); }
  if (event.key === 'Escape') {
    if (refs.paymentDialog.open) refs.paymentDialog.close();
    if (refs.heldDialog.open) refs.heldDialog.close();
  }
});

applyTheme(state.theme, false);
renderCategories();
renderProducts();
renderCart();
renderMetrics();
refs.notificationCount.textContent = '0';
refs.notificationCount.setAttribute('aria-label', '0 notifications');
persistHeldOrders();
