# Build notes — v3.1.0

## Corrections

- Removed the old hard-coded dashboard figures from the HTML fallback.
- Added the missing metric and notification DOM IDs that previously stopped JavaScript initialization.
- Added storage schema v3, which clears legacy v1/v2 order and held-order values once.
- Initial operational state is £0.00, 0 transactions, £0.00 average basket, order #0000, 0 held orders and 0 notifications.
- Notification badges are 20px, positioned outside the rounded-button clipping region, and remain visible at zero.
- Product cards are 238px high with expanded lower padding and verified space below the price/rating row.
- Replaced the subtle second dark palette with a visibly different Lumen light theme.
- Added versioned CSS and JavaScript references to prevent the browser reusing earlier cached assets.

## Verification

The browser suite assembles the exact `index.html`, `styles.css`, and `app.js` source and executes it together. It also injects the stale order #1050 data seen in the previous build to verify that v3 resets it. See `TEST-REPORT.json`.
