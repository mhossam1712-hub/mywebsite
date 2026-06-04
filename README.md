# Abdalla Eye Clinic - Ophthalmology Website

A professional, fully-featured ophthalmology clinic website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **next-intl** for multi-language support (English & Arabic).

## 🚀 Features

- **Multilingual Support**: Full English and Arabic support with RTL layout
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Service Showcase**: Comprehensive display of eye care services
- **Doctor Profiles**: Detailed information about ophthalmologists
- **Appointment Booking**: Online appointment scheduling system
- **Contact Form**: Easy-to-use contact and inquiry forms
- **FAQs Section**: Frequently asked questions with expandable answers
- **Testimonials**: Patient reviews and success stories
- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS

## 📁 Project Structure

```
eye-clinic-v24/
├── public/                 # Static assets
│   ├── assets/
│   │   ├── images/        # Hero, clinic, doctor photos
│   │   └── icons/         # Custom SVG icons
│   └── favicon.ico
├── src/
│   ├── app/               # Next.js app directory
│   │   └── [lang]/        # Language routing
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── appointments/
│   │       ├── services/
│   │       ├── doctors/
│   │       ├── about/
│   │       ├── Contact/
│   │       └── FAQs/
│   ├── components/
│   │   ├── common/        # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── layout/        # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── RootLayout.tsx
│   │   └── sections/      # Page sections
│   │       ├── HeroSection.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── DoctorsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── FAQsSection.tsx
│   ├── constants/         # Static data
│   │   └── index.ts
│   ├── hooks/             # Custom React hooks
│   ├── i18n/              # Internationalization
│   │   ├── config.ts
│   │   ├── request.ts
│   │   └── messages/
│   │       ├── en.json
│   │       └── ar.json
│   ├── services/          # API services
│   │   └── api.ts
│   ├── styles/            # Global styles
│   │   └── globals.css
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── utils/             # Utility functions
│       ├── index.ts
│       └── formatting.ts
├── middleware.ts          # Next.js middleware for i18n
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── postcss.config.js      # PostCSS configuration
├── package.json
├── .env.example
├── .env.local
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 24 or higher
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🌐 Multilingual Support

The site supports English and Arabic with automatic direction detection (LTR/RTL):

- Navigate to `/en/` for English
- Navigate to `/ar/` for Arabic

Add more languages by:
1. Creating a new JSON file in `src/i18n/messages/`
2. Adding the locale to `src/i18n/config.ts`
3. Updating middleware configuration

## 🎨 Customization

### Colors & Styling
Edit `tailwind.config.ts` to customize:
- Primary colors
- Typography
- Spacing
- Animations

### Content
Update content in:
- `src/constants/index.ts` - Services, doctors, FAQs, clinic info
- `src/i18n/messages/*.json` - Text and translations

### Components
Reusable components in `src/components/`:
- Create new components in `common/`
- Build page sections in `sections/`
- Update layout in `layout/`

## 🔧 API Integration

API endpoints are configured in `src/services/api.ts`:

```typescript
const appointmentService = {
  bookAppointment: (data) => apiClient.post('/appointments', data),
  getAppointments: () => apiClient.get('/appointments'),
  // ...
};
```

Update the `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to point to your backend API.

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- Semantic HTML5
- ARIA labels
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## 🔒 Security

- CORS protection
- Environment variables for sensitive data
- Input validation on forms
- XSS protection with Next.js

## 📦 Dependencies

### Core
- **next**: ^14.0.0
- **react**: ^18.2.0
- **react-dom**: ^18.2.0

### Styling
- **tailwindcss**: ^3.4.0
- **@tailwindcss/forms**: ^0.5.7
- **@tailwindcss/typography**: ^0.5.13

### Internationalization
- **next-intl**: ^3.0.0

### Forms & Validation
- **react-hook-form**: ^7.50.0

### Utilities
- **axios**: ^1.6.0
- **date-fns**: ^2.30.0
- **zustand**: ^4.4.0
- **clsx**: ^2.0.0

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with one click

### Other Platforms

1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Deploy the output according to your platform's guidelines

## 📞 Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Contact: contact@visionclinic.com

## 📄 License

This project is licensed under the MIT License.

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [next-intl Documentation](https://next-intl-docs.vercel.app)

---

Built for Abdalla Eye Clinic
