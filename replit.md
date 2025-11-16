# Sehani Organics - Pure Sidr Honey Website

## Overview
This is a static e-commerce website for Sehani Organics, a Pakistani company selling pure Sidr honey. The website features:
- Single-page application with client-side navigation
- Product catalog for honey in three sizes (250g, 500g, 1kg)
- Shopping cart functionality
- Contact form
- Responsive design

## Project Architecture
- **Type**: Static HTML/CSS/JavaScript website
- **Server**: Python 3.11 HTTP server
- **Port**: 5000 (frontend)
- **Host**: 0.0.0.0 (to support Replit's proxy)

## File Structure
```
/
├── index.html          # Main HTML file with embedded CSS and JS
├── server.py           # Python HTTP server with cache control
├── images/             # Product and promotional images
│   ├── about.png
│   ├── honey-1kg.png
│   ├── honey-250g.png
│   ├── honey-500g.png
│   └── img1.jpeg
└── replit.md          # This file
```

## Features
1. **Product Catalog**: Three honey products (250g, 500g, 1kg) at 3200 PKR per kg
2. **Shopping Cart**: Add to cart, view cart, remove items
3. **Checkout**: Client-side form for order submission (currently logs to console)
4. **Contact Form**: Customer inquiry form
5. **Responsive Design**: Mobile-friendly navigation and layout

## Technical Details
- Pure HTML/CSS/JavaScript (no build process required)
- Font Awesome 6.4.0 for icons
- Cache-Control headers configured for development
- Client-side routing with page visibility toggling

## Recent Changes
- **2024-11-16**: Initial Replit setup
  - Organized images into `/images` folder
  - Created Python HTTP server with cache control headers
  - Configured workflow for port 5000 with webview output
  - Added .gitignore for Python development

## Running the Project
The project runs automatically via the configured workflow. To run manually:
```bash
python3 server.py
```

## User Preferences
None documented yet.
