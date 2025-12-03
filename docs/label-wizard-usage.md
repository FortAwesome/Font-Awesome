# Label Wizard Usage Guide

## Overview

The **Label Wizard** is an interactive tool that allows you to create custom labeled icons by combining Font Awesome icons with text labels. This guide will walk you through using the Label Wizard and integrating the generated icons into your projects.

## Getting Started

### Opening the Label Wizard

1. Open `label-wizard.html` in your web browser
2. The tool works entirely in the browser - no server required
3. Compatible with all modern browsers (Chrome, Firefox, Safari, Edge)

## Features

### 1. Icon Selection

**Search for Icons:**
- Use the search box to find icons by name or description
- Example: Type "home", "download", "user", etc.

**Filter by Style:**
- **All**: Show all available icons
- **Solid**: Filled icons (most common)
- **Regular**: Outlined icons
- **Brands**: Brand logos (Facebook, Twitter, GitHub, etc.)

**Select an Icon:**
- Click on any icon in the grid to select it
- Selected icon will be highlighted with a gradient border
- Preview updates in real-time

### 2. Text Customization

**Label Text:**
- Enter your desired text in the "Label Text" field
- Text appears next to the icon in the preview
- Leave empty for icon-only export

**Font Family:**
- Choose from popular fonts: Inter, Roboto, Outfit, Arial, Helvetica, Georgia, Times New Roman
- Google Fonts are automatically loaded for web fonts

**Font Size:**
- Adjust from 8px to 72px using the slider
- Real-time preview shows exact size

**Font Weight:**
- Light (300)
- Normal (400)
- Medium (500)
- Semi-Bold (600)
- Bold (700)

**Text Color:**
- Use the color picker to select any color
- Hex value displayed for reference
- Color applies to both icon and text

### 3. Layout & Positioning

**Text Position Options:**
- **Top Left**: Text above and left-aligned
- **Top**: Text centered above icon
- **Top Right**: Text above and right-aligned
- **Left**: Text to the left of icon
- **Right**: Text to the right of icon (default)
- **Center**: Text centered below icon
- **Bottom Left**: Text below and left-aligned
- **Bottom**: Text centered below icon
- **Bottom Right**: Text below and right-aligned

**Spacing:**
- Adjust gap between icon and text (0-50px)
- Useful for fine-tuning visual balance

**Icon Size:**
- Adjust icon size from 24px to 128px
- Text size adjusts independently

### 4. Real-Time Preview

- See your labeled icon update instantly as you make changes
- Preview shows exact appearance of final export
- Helps visualize before committing to export

### 5. Export Options

#### SVG Export
- **Format**: Scalable Vector Graphics
- **Use Case**: Web, print, any size without quality loss
- **Features**: 
  - Includes embedded fonts
  - Preserves all styling
  - Accessibility attributes included
- **How to Use**: Click "SVG" button to download

#### PNG Export
- **Format**: Portable Network Graphics
- **Use Case**: Social media, presentations, raster graphics
- **Features**:
  - Transparent background
  - High resolution (800x400px)
  - Ready for immediate use
- **How to Use**: Click "PNG" button to download

#### React Code
- **Framework**: React.js
- **Use Case**: React applications
- **Features**:
  - Uses `@fortawesome/react-fontawesome`
  - Includes all styling as inline styles
  - Ready to paste into your component
- **How to Use**: Click "React Code" to copy to clipboard

**Example Output:**
```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function LabeledIcon() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px',
      flexDirection: 'row'
    }}>
      <FontAwesomeIcon 
        icon={faDownload} 
        style={{ fontSize: '64px', color: '#f1f5f9' }}
        aria-label="Download"
      />
      <span style={{ 
        fontFamily: 'Inter', 
        fontSize: '24px', 
        fontWeight: '400', 
        color: '#f1f5f9' 
      }}>Download</span>
    </div>
  );
}

export default LabeledIcon;
```

#### Vue Code
- **Framework**: Vue.js
- **Use Case**: Vue applications
- **Features**:
  - Uses `@fortawesome/vue-fontawesome`
  - Includes all styling in data properties
  - Ready to paste into your component
- **How to Use**: Click "Vue Code" to copy to clipboard

**Example Output:**
```vue
<template>
  <div :style="containerStyle">
    <font-awesome-icon 
      :icon="['solid', 'download']" 
      :style="iconStyle"
      :aria-label="ariaLabel"
    />
    <span :style="textStyle">Download</span>
  </div>
</template>

<script>
export default {
  name: 'LabeledIcon',
  data() {
    return {
      containerStyle: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexDirection: 'row'
      },
      iconStyle: {
        fontSize: '64px',
        color: '#f1f5f9'
      },
      textStyle: {
        fontFamily: 'Inter',
        fontSize: '24px',
        fontWeight: '400',
        color: '#f1f5f9'
      },
      ariaLabel: 'Download'
    }
  }
}
</script>
```

#### HTML/CSS Code
- **Format**: Vanilla HTML and CSS
- **Use Case**: Static websites, any HTML project
- **Features**:
  - No framework required
  - Uses Font Awesome CDN classes
  - Separate HTML and CSS for clarity
- **How to Use**: Click "HTML/CSS" to copy to clipboard

**Example Output:**
```html
<!-- HTML -->
<div class="labeled-icon" aria-label="Download">
  <i class="fas fa-download"></i>
  <span>Download</span>
</div>

<!-- CSS -->
<style>
.labeled-icon {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: row;
}

.labeled-icon i {
  font-size: 64px;
  color: #f1f5f9;
}

.labeled-icon span {
  font-family: Inter, sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: #f1f5f9;
}
</style>
```

### 6. Accessibility Features

The Label Wizard automatically generates accessibility information for your labeled icons:

**Alt Text:**
- Descriptive text for screen readers
- Combines icon name and label text
- Example: "Download icon"

**ARIA Label:**
- Semantic label for assistive technologies
- Uses your custom text or icon name
- Example: "Download"

**How to Use:**
- Click "Accessibility" button to copy all accessibility information
- Includes usage examples for different contexts

## Common Use Cases

### 1. Download Button
- **Icon**: download
- **Text**: "Download"
- **Position**: Right
- **Use**: Call-to-action buttons

### 2. Navigation Items
- **Icon**: home, user, settings
- **Text**: "Home", "Profile", "Settings"
- **Position**: Bottom
- **Use**: Navigation menus

### 3. Tutorial Steps
- **Icon**: 1, 2, 3
- **Text**: "Step 1", "Step 2", "Step 3"
- **Position**: Top
- **Use**: Step-by-step guides

### 4. Social Media Links
- **Icon**: facebook, twitter, instagram
- **Text**: "Follow us on Facebook"
- **Position**: Right
- **Use**: Social media sections

### 5. Feature Highlights
- **Icon**: check, star, heart
- **Text**: "Premium Feature"
- **Position**: Left
- **Use**: Feature lists, pricing tables

## Integration Instructions

### For Web Projects

1. **Include Font Awesome:**
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
   ```

2. **Add Google Fonts (if using custom fonts):**
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
   ```

3. **Paste Generated Code:**
   - Copy code from Label Wizard
   - Paste into your HTML/CSS/JS files
   - Adjust as needed for your design

### For React Projects

1. **Install Font Awesome:**
   ```bash
   npm install @fortawesome/fontawesome-svg-core
   npm install @fortawesome/free-solid-svg-icons
   npm install @fortawesome/react-fontawesome
   ```

2. **Paste Generated Component:**
   - Copy React code from Label Wizard
   - Create new component file
   - Import and use in your app

### For Vue Projects

1. **Install Font Awesome:**
   ```bash
   npm install @fortawesome/fontawesome-svg-core
   npm install @fortawesome/free-solid-svg-icons
   npm install @fortawesome/vue-fontawesome
   ```

2. **Configure Font Awesome:**
   ```javascript
   import { library } from '@fortawesome/fontawesome-svg-core'
   import { fas } from '@fortawesome/free-solid-svg-icons'
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

   library.add(fas)
   app.component('font-awesome-icon', FontAwesomeIcon)
   ```

3. **Paste Generated Component:**
   - Copy Vue code from Label Wizard
   - Create new component file
   - Import and use in your app

## Best Practices

### Design
- **Contrast**: Ensure text and icon have sufficient contrast with background
- **Size**: Keep icon and text sizes proportional (icon typically 2-3x text size)
- **Spacing**: Use adequate spacing for readability (12-20px recommended)
- **Alignment**: Center-align for symmetry, left/right-align for directional flow

### Accessibility
- **Always include alt text** for images
- **Use ARIA labels** for interactive elements
- **Ensure color contrast** meets WCAG AA standards (4.5:1 for text)
- **Test with screen readers** to verify accessibility

### Performance
- **Use SVG for web** when possible (smaller file size, scalable)
- **Use PNG for raster contexts** (presentations, social media)
- **Optimize exports** by removing unnecessary styling
- **Load fonts efficiently** using font-display: swap

## Troubleshooting

### Icon Not Displaying
- **Check Font Awesome is loaded**: Verify CDN link or npm package
- **Check icon name**: Ensure icon exists in Font Awesome library
- **Check style**: Verify using correct style (solid, regular, brands)

### Text Not Showing
- **Check font loading**: Verify Google Fonts link if using custom fonts
- **Check color**: Ensure text color contrasts with background
- **Check size**: Verify font size is not too small

### Export Issues
- **SVG not downloading**: Check browser permissions for downloads
- **PNG quality**: Increase canvas size in code for higher resolution
- **Code not copying**: Check clipboard permissions in browser

## Tips & Tricks

1. **Quick Iteration**: Use the preview to rapidly test different combinations
2. **Color Harmony**: Use color picker to match your brand colors
3. **Consistent Spacing**: Use the same spacing value across all labeled icons for consistency
4. **Save Favorites**: Keep a document of your favorite combinations for reuse
5. **Batch Export**: Create multiple variations and export all at once

## Support

For issues, feature requests, or contributions:
- **GitHub**: [Font Awesome Repository](https://github.com/FortAwesome/Font-Awesome)
- **Documentation**: [Font Awesome Docs](https://fontawesome.com/docs)
- **Community**: [Font Awesome Discussions](https://github.com/FortAwesome/Font-Awesome/discussions)

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**License**: Follows Font Awesome licensing (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT)
