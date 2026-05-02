# PWA Icons

To complete the PWA setup, you need to add app icons in various sizes.

## Required Icon Sizes

Create square PNG icons (transparent background recommended) in these sizes:

- `icon-72x72.png` (72x72 pixels)
- `icon-96x96.png` (96x96 pixels)
- `icon-128x128.png` (128x128 pixels)
- `icon-144x144.png` (144x144 pixels)
- `icon-152x152.png` (152x152 pixels)
- `icon-192x192.png` (192x192 pixels) - Used for Android home screen
- `icon-384x384.png` (384x384 pixels)
- `icon-512x512.png` (512x512 pixels) - Used for splash screens

## Design Recommendations

1. **Icon Design**: Use the AdEarn logo (dollar sign in gradient background)
2. **Colors**: Match the dark theme - use `#6366f1` (indigo) to `#8b5cf6` (purple) gradient
3. **Safe Area**: Keep important elements within the center 80% of the icon
4. **Format**: PNG with transparency

## How to Generate Icons

You can use these free tools:

1. **PWA Asset Generator**: https://pwa-asset-generator.nicepkg.cn/
2. **Favicon Generator**: https://favicon.io/
3. **ImageMagick**: Command line tool for batch processing

## After Adding Icons

Once icons are added, users can:

1. Visit the website on Android Chrome
2. Tap the menu (⋮)
3. Select "Add to Home screen"
4. The app will install and appear on their home screen

The app will then work like a native app with:
- Full-screen mode (no browser UI)
- Offline support
- Push notifications (when implemented)
- Native app-like experience
