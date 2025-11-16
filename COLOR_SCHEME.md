# Sehani Organics Color Scheme

This document outlines the complete color palette used in the Sehani Organics website.

## Primary Colors

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| Golden Honey | #FFC107 | `--primary` | Main buttons, highlights, call-to-action, section underlines |
| Amber | #FFB300 | `--primary-amber` | Button hover states, accents |
| Dark Honey/Brown | #8D6E63 | `--dark` | Footer background, secondary text, product descriptions |

## Secondary / Accent Colors

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| Warm Cream | #FFF8E1 | `--light` | Main backgrounds, sections, card backgrounds |
| Soft Orange | #FF8F00 | `--accent` | Highlights, icons, badges (pending status) |
| Leaf Green | #558B2F | `--nature-green` | Available for nature elements, organic feel accents |

## Neutral Colors

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| White | #FFFFFF | `--white` | Card backgrounds, header background |
| Light Gray | #E0E0E0 | `--light-gray` | Dividers, borders, subtle backgrounds |
| Dark Gray | #333333 | `--dark-text` | Primary text color, navigation links, headings |

## Implementation

All colors are defined as CSS variables in `frontend/src/index.css`:

```css
:root {
  --primary: #FFC107;
  --primary-amber: #FFB300;
  --dark: #8D6E63;
  --dark-text: #333333;
  --light: #FFF8E1;
  --accent: #FF8F00;
  --nature-green: #558B2F;
  --white: #FFFFFF;
  --light-gray: #E0E0E0;
}
```

## Color Usage Examples

### Buttons
- **Primary button**: Background uses `--primary` (#FFC107)
- **Button hover**: Background changes to `--primary-amber` (#FFB300)
- **Secondary button**: Background uses `--dark` (#8D6E63)

### Text
- **Body text**: Uses `--dark-text` (#333333)
- **Product descriptions**: Uses `--dark` (#8D6E63)
- **Headings**: Uses `--dark-text` (#333333)

### Backgrounds
- **Page background**: Uses `--light` (#FFF8E1)
- **Card backgrounds**: Uses `--white` (#FFFFFF)
- **Footer**: Uses `--dark` (#8D6E63)

### Accents
- **Product prices**: Uses `--primary` (#FFC107)
- **Navigation hover**: Uses `--primary` (#FFC107)
- **Pending order badges**: Uses `--accent` (#FF8F00)
- **Section title underlines**: Uses `--primary` (#FFC107)

## Accessibility Notes

The color scheme has been designed to provide:
- Strong contrast between text and backgrounds for readability
- Warm, inviting tones that reflect the natural honey products
- Consistent visual hierarchy throughout the site
- Professional yet organic aesthetic

## Future Enhancements

The `--nature-green` (#558B2F) variable is available for future use on:
- Organic/natural product badges
- Sustainability messaging
- Nature-themed icons
- Environmental callouts
