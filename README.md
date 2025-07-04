# Moving Sale Website

A simple, responsive website to showcase household items for sale during a move. Features a clean table layout with image viewing capabilities.

## Features

- **Product Table**: Display items with market price vs. selling price
- **Image Gallery**: Click "View Images" to see product photos in a modal
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Easy Updates**: Simple file-based content management
- **No Database**: All data stored in JavaScript files

## Quick Start

1. **Add Your Products**: Edit `products.js` to add your items
2. **Add Images**: Place product photos in `images/[product-folder]/`
3. **Update Contact**: Edit contact information in `index.html`
4. **Open Website**: Open `index.html` in any web browser

## File Structure

```
product-demo/
├── index.html          # Main website page
├── style.css           # All styling
├── script.js           # Image viewing functionality
├── products.js         # Your product data
├── images/             # Product images
│   ├── sofa/           # Sofa images (1.jpg, 2.jpg, etc.)
│   ├── tv/             # TV images
│   └── ...             # Other product folders
└── README.md           # This file
```

## Adding Products

1. Open `products.js`
2. Add a new product object to the array:

```javascript
{
    name: "Your Item Name",
    marketPrice: 10000,
    sellingPrice: 7000,
    folder: "item-folder-name"
}
```

3. Create a folder in `images/` with the same name as the `folder` property
4. Add images to that folder (1.jpg, 2.jpg, etc.)

## Adding Images

### Method 1: Using Image List (Recommended)
1. Add your images to the appropriate folder in `images/`
2. Edit `image-list.js` and add the exact filenames to the corresponding product array

Example:
```javascript
'sofa': [
    'my-sofa-photo1.jpg',
    'my-sofa-photo2.jpg',
    'sofa-side-view.png'
]
```

### Method 2: Standard Naming (Fallback)
For products not listed in `image-list.js`, the system will automatically find images named:
- `1.jpg`, `2.jpg`, `3.jpg`, etc.
- `image1.jpg`, `image2.jpg`, etc.
- `main.jpg`, `front.jpg`, `back.jpg`, `side.jpg`, `detail.jpg`

### File Structure Example:
```
images/
├── sofa/
│   ├── pexels-francesco-albanese-2150950215-31418019.jpg
│   ├── pexels-heiler-31363284.jpg
│   └── pexels-kinz-studio-photographe-451535468-31405630.jpg
├── tv/
│   ├── 1.jpg
│   └── 2.jpg
└── dining-table/
    ├── main.jpg
    ├── side.jpg
    └── detail.jpg
```

Supported formats: JPG, JPEG, PNG, GIF, WebP

## Updating Contact Information

Edit the contact section in `index.html`:

```html
<p>📞 Phone: <a href="tel:+1234567890">+91 12345 67890</a></p>
<p>📧 Email: <a href="mailto:seller@example.com">seller@example.com</a></p>
<p>💬 WhatsApp: <a href="https://wa.me/1234567890">Message on WhatsApp</a></p>
```

## Deployment

### Option 1: Local Use
Simply open `index.html` in any web browser.

### Option 2: Online Hosting
Upload all files to any web hosting service:
- **GitHub Pages**: Free hosting for public repositories
- **Netlify**: Free tier with drag-and-drop deployment
- **Vercel**: Free tier with automatic deployments
- **Traditional Web Hosting**: Any static hosting service

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Works offline when accessed locally

## Tips

1. **Image Optimization**: Compress images to reduce loading time
2. **Mobile Testing**: Test on mobile devices for best user experience
3. **Regular Updates**: Mark items as sold by removing them from `products.js`
4. **Backup**: Keep a backup of your `products.js` file

## Troubleshooting

**Images not showing?**
- Check that image files are in the correct folder
- Verify file names match the expected patterns
- Ensure image formats are supported (JPG, PNG, etc.)

**Contact links not working?**
- Update phone numbers and email addresses in `index.html`
- For WhatsApp, use the format: `https://wa.me/[country-code][phone-number]`

**Website not loading?**
- Make sure all files are in the same directory
- Check that `products.js`, `style.css`, and `script.js` are present
- Open browser developer tools to check for errors
