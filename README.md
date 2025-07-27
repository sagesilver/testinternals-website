# TestInternals Website

A modern, responsive consultancy website for TestInternals - a Melbourne-based testing services consultancy that blends decades of software test expertise with AI-driven automation.

## 🚀 Features

- **Modern Design**: Clean, professional design with blue gradients and metallic silvers
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **Single Page Application**: Smooth scrolling between sections
- **AI-Focused Content**: Showcases AI-powered testing solutions
- **Contact Form**: Interactive contact form for lead generation

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: Inter (Google Fonts)
- **Icons**: Emoji icons and SVG icons

## 📁 Project Structure

```
testinternals-website/
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── AISolutions.jsx
│   │   ├── TestUtilities.jsx
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradients (#3b82f6 to #1e40af)
- **Navy**: Dark navy backgrounds (#0f172a to #1e293b)
- **Silver**: Metallic accents (#f8fafc to #171717)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## 📱 Sections

1. **Header**: Fixed navigation with logo and mobile menu
2. **Hero**: Gradient background with main headline and CTAs
3. **Services**: 8 service cards with icons and descriptions
4. **AI Solutions**: AI-powered testing features showcase
5. **Test Utilities**: Custom tools and utilities section
6. **About**: Company information with stats and quote
7. **Blog**: Latest insights with sample blog posts
8. **Contact**: Contact form and company information
9. **Footer**: Links, social media, and copyright

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd testinternals-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 Key Features Implemented

### ✅ Design Requirements
- [x] Blue gradients and metallic silvers color palette
- [x] Modern sans-serif typography (Inter font)
- [x] Minimalist design with slick transitions
- [x] Professional, technical, cutting-edge feel

### ✅ Technical Requirements
- [x] React with Vite build tool
- [x] Tailwind CSS for styling
- [x] Framer Motion for animations
- [x] Fully responsive design
- [x] Smooth scrolling navigation
- [x] Mobile-friendly navigation

### ✅ Content Sections
- [x] Header with navigation and CTA button
- [x] Hero section with main headline and subheading
- [x] Services section with 8 service blocks
- [x] AI-Powered Testing section with 4 features
- [x] Test Utilities section with 4 categories
- [x] About section with company info and quote
- [x] Blog section with 3 sample posts
- [x] Contact section with form and contact info
- [x] Footer with links and social media

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  primary: {
    // Blue gradient colors
  },
  navy: {
    // Navy background colors
  },
  silver: {
    // Silver accent colors
  }
}
```

### Content
Update the content in each component file to match your specific needs.

### Logo
Replace `public/logo.png` with your own logo file.

## 📄 License

This project is created for TestInternals. All rights reserved.

## 🤝 Support

For support or questions, contact:
- Email: contact@testinternals.com
- Location: Melbourne, Australia

---

Built with ❤️ using React, Vite, and Tailwind CSS 