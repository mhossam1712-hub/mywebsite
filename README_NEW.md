# Abdalla Eye Clinic - Ophthalmology Website

A professional, fully-featured ophthalmology clinic website for **Abdalla Eye Clinic** in Alexandria, Egypt. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **next-intl** for multilingual support with complete **light/dark mode** support.

## 🌟 Features

- **🌍 Multilingual Support**: Full English and Arabic support with RTL layout
- **🎨 Dark/Light Mode**: Complete theme toggle with local storage persistence and system preference detection
- **📱 Responsive Design**: Mobile-first approach with beautiful UI for all devices
- **🏥 Multiple Branches**: Display locations in Smouha and Raml Station, Alexandria
- **👨‍⚕️ Doctor Profiles**: Detailed information about ophthalmologists with specialties
- **🗓️ Appointment Booking**: Online appointment scheduling system
- **📝 Contact Forms**: Easy-to-use contact and inquiry forms with validation
- **❓ FAQs**: Expandable questions with smooth animations
- **⭐ Testimonials**: Patient reviews and success stories
- **✨ Smooth Animations**: Professional transitions and effects
- **♿ Accessibility**: WCAG compliant with semantic HTML

## 🚀 Quick Start

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**: 
   - English: [http://localhost:3000/en](http://localhost:3000/en)
   - Arabic: [http://localhost:3000/ar](http://localhost:3000/ar)

## 🎨 Dark Mode Implementation

### How It Works

The dark mode is built using Tailwind CSS's `class` strategy with a custom React context:

- **ThemeProvider**: Context provider in `src/context/ThemeContext.tsx` wraps the entire app
- **ThemeToggle**: Component in `src/components/common/ThemeToggle.tsx` for theme switching
- **Persistence**: Theme preference automatically saved in localStorage
- **System Preference**: Detects OS preference on first visit (prefers-color-scheme)
- **Smooth Transitions**: All color changes animate smoothly with `duration-200`

### Using Dark Mode Classes

All components use Tailwind's `dark:` prefix for dark mode styles:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
  Content adapts to theme automatically
</div>
```

### Toggle Button Location

The theme toggle is located in the header (top-right), accessible on all pages.

## 🌐 Language Support

### Accessing Different Languages

- **English**: `/en/*`
- **Arabic**: `/ar/*`

### RTL Support

Arabic automatically applies RTL (Right-to-Left) layout with proper mirror animations.

## 🏢 Clinic Information

### Update Clinic Details

Edit `src/constants/index.ts`:

```typescript
export const CLINIC_INFO = {
  name: 'Abdalla Eye Clinic',
  description: 'Leading ophthalmology clinic in Alexandria, Egypt',
  phone: '+20 3 XXXX XXXX',
  email: 'contact@abdallaeye.com',
  address: 'Smouha & Raml Station',
  city: 'Alexandria',
  postalCode: '21514',
  country: 'Egypt',
};

export const CLINIC_BRANCHES = [
  {
    name: 'Smouha Branch',
    address: 'Smouha, Alexandria',
    phone: '+20 3 XXXX XXXX',
    hours: '9:00 AM - 9:00 PM',
  },
  {
    name: 'Raml Station Branch',
    address: 'Raml Station, Alexandria',
    phone: '+20 3 YYYY YYYY',
    hours: '9:00 AM - 9:00 PM',
  },
];
```

### Customize Services

Update `SERVICES` array in `src/constants/index.ts`:

```typescript
{
  id: 'service-x',
  name: 'Service Name',
  description: 'Service description',
  icon: '👁️',
  category: 'diagnostic' | 'surgical' | 'preventive' | 'treatment',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  price: 250,
}
```

### Add/Update Doctors

Modify `DOCTORS` array in `src/constants/index.ts`:

```typescript
{
  id: 'dr-x',
  name: 'Dr. Full Name',
  specialty: 'Specialty',
  qualification: 'MD, Fellowship',
  experience: 15,
  image: '/assets/images/doctor-x.jpg',
  bio: 'Doctor biography',
  languages: ['English', 'Arabic'],
}
```

## 📁 Project Structure

```
eye-clinic-v24/
├── public/
│   └── assets/
│       ├── images/        # Doctor and clinic photos
│       └── icons/         # SVG icons
├── src/
│   ├── app/[lang]/        # Language-routed pages
│   │   ├── page.tsx       # Home page
│   │   ├── services/      # Services listing
│   │   ├── doctors/       # Doctors directory
│   │   ├── appointments/  # Booking system
│   │   ├── about/         # About clinic
│   │   ├── Contact/       # Contact form
│   │   └── FAQs/          # FAQ section
│   ├── components/
│   │   ├── common/        # Button, Card, Input, ThemeToggle
│   │   ├── layout/        # Header, Footer, Navigation
│   │   └── sections/      # HeroSection, ServicesSection, etc.
│   ├── context/
│   │   └── ThemeContext.tsx  # Dark mode context
│   ├── constants/
│   │   └── index.ts       # All clinic data
│   ├── hooks/
│   │   └── useFormValidation.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── request.ts
│   │   └── messages/
│   │       ├── en.json    # English translations
│   │       └── ar.json    # Arabic translations
│   ├── services/
│   │   └── api.ts         # API client
│   ├── styles/
│   │   └── globals.css    # Dark mode styles
│   ├── types/
│   │   └── index.ts       # TypeScript types
│   └── utils/
│       ├── index.ts       # Formatting, validation
│       └── formatting.ts  # Additional utilities
├── tailwind.config.ts     # Dark mode + colors
├── next.config.js         # i18n config
├── middleware.ts          # Language routing
└── tsconfig.json
```

## 🎨 Customizing Colors

Edit `tailwind.config.ts` theme.extend.colors:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    900: '#082f49',
  },
  // ... more colors
}
```

## 📝 Translation Management

Add new translations to both files:

**src/i18n/messages/en.json**:
```json
{
  "new_section": {
    "title": "English Title",
    "description": "English description"
  }
}
```

**src/i18n/messages/ar.json**:
```json
{
  "new_section": {
    "title": "العنوان بالعربية",
    "description": "الوصف بالعربية"
  }
}
```

Use in components:
```tsx
const t = useTranslations();
<h1>{t('new_section.title')}</h1>
```

## 🌙 Dark Mode Details

### Class-Based System
- HTML element gets `class="dark"` when dark mode is active
- Tailwind CSS applies dark mode styles via `dark:` prefix
- Smooth transitions: `duration-200`

### Storage
- Theme preference stored in `localStorage` under key `'theme'`
- Automatic recovery on page reload
- System preference detection on first visit

### Examples

Light mode (default):
```tsx
<div className="bg-white text-gray-900">Light</div>
```

Dark mode added:
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
  Works in both modes
</div>
```

## 📱 Responsive Breakpoints

Built with mobile-first approach:
- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: > 1024px (lg)

## 🔧 Available Scripts

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Create production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🌐 Pages & Routes

| Page | Route |
|------|-------|
| Home | `/[lang]/` |
| Services | `/[lang]/services` |
| Doctors | `/[lang]/doctors` |
| Book Appointment | `/[lang]/appointments` |
| Contact | `/[lang]/Contact` |
| About | `/[lang]/about` |
| FAQs | `/[lang]/FAQs` |

## 🔐 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

NEXT_PUBLIC_CLINIC_NAME=Abdalla Eye Clinic
NEXT_PUBLIC_CLINIC_PHONE=+20 3 XXXX XXXX
NEXT_PUBLIC_CLINIC_EMAIL=contact@abdallaeye.com
NEXT_PUBLIC_CLINIC_ADDRESS=Smouha & Raml Station, Alexandria

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 📦 Key Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.0",
  "tailwindcss": "^3.4.0",
  "next-intl": "^3.0.0",
  "react-hook-form": "^7.50.0",
  "axios": "^1.6.0",
  "date-fns": "^2.30.0"
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables
4. Click Deploy

### Other Platforms
```bash
npm run build
npm start
```

## ♿ Accessibility Features

- ✅ Semantic HTML5 structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast WCAG AA compliant
- ✅ Screen reader friendly
- ✅ Reduced motion support via `prefers-reduced-motion`

## 📞 Contact Information

**Abdalla Eye Clinic**
- 📍 Smouha & Raml Station, Alexandria, Egypt
- 📞 Phone: +20 3 XXXX XXXX
- 📧 Email: contact@abdallaeye.com
- 🕐 Hours: 9:00 AM - 9:00 PM (Both branches)

## 📄 License

MIT License - Feel free to use for your clinic

---

**Built with ❤️ for Abdalla Eye Clinic**

Last Updated: April 2026
