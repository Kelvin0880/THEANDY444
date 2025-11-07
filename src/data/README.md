# Admin Panel Data

## Default Credentials

**Username:** `theandy`  
**Password:** `andy444secure`

The password is hashed using bcrypt in `userData.json`.

## How to Access Admin Panel

### Method 1: Keyboard Shortcut
Press `Shift + Ctrl + A` on the main website to access the admin login.

### Method 2: Direct URL
Navigate directly to `/admin-login`

## Changing the Password

To change the admin password, you'll need to:

1. Hash your new password using bcrypt
2. Update the `passwordHash` in `userData.json`

Example using Node.js:
```javascript
const bcrypt = require('bcryptjs');
const newPassword = 'your-new-password';
bcrypt.hash(newPassword, 10).then(hash => console.log(hash));
```

## Site Data

All editable site content is stored in `siteData.json`. Changes made through the admin panel are saved to browser localStorage and will persist across sessions.

To reset to defaults, clear localStorage or delete the `andy_site_data` key.
