# Auto MOT Centre Website

Modern, responsive website for Auto MOT Centre - a family-owned independent garage in Manor Park, London.

## 🚀 Features

- **Modern Design**: Premium UI with smooth animations and micro-interactions
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Online Booking**: MOT and appointment booking with email notifications
- **Service Pages**: Detailed information about all services offered
- **Contact Forms**: Multiple contact options with form validation
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd AMC
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your SMTP credentials for email notifications.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Email Configuration

The website uses Nodemailer to send booking confirmations and notifications. You need to configure SMTP settings in `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@automotcentre.com
SMTP_TO=info@automotcentre.com
```

### Gmail Setup:

1. Enable 2-factor authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password as `SMTP_PASS`

## 📁 Project Structure

```
AMC/
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── booking/        # Booking API endpoint
│   ├── contact-us/         # Contact page
│   ├── gallery/            # Gallery page
│   ├── make-an-appointment/ # Appointment booking
│   ├── mot-booking/        # MOT booking
│   ├── services/           # Services page
│   ├── shop/               # Shop page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── About.tsx           # About section
│   ├── Footer.tsx          # Footer component
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── QuickActions.tsx    # Quick action cards
│   ├── Team.tsx            # Team section
│   ├── Testimonials.tsx    # Testimonials carousel
│   └── WhyChooseUs.tsx     # Features section
├── public/
│   └── images/             # Images and assets
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Dependencies
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: { ... },
  accent: { ... },
}
```

### Content

- Update business information in components
- Replace placeholder images in `/public/images/`
- Modify service offerings in `/app/services/page.tsx`

### Forms

All forms submit to `/api/booking` endpoint. Customize email templates in `/app/api/booking/route.ts`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables on Vercel

Add these in your Vercel project settings:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SMTP_TO`

## 📱 Pages

- **Home** (`/`) - Main landing page with all sections
- **Services** (`/services`) - Detailed service offerings
- **MOT Booking** (`/mot-booking`) - Online MOT booking form
- **Make an Appointment** (`/make-an-appointment`) - General appointment booking
- **Contact Us** (`/contact-us`) - Contact form and information
- **About** (`/about`) - Company information and team
- **Gallery** (`/gallery`) - Photos of facility and work
- **Shop** (`/shop`) - Coming soon page

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 License

© 2024 Auto MOT Centre. All rights reserved.

---

**Made with ❤️ by [Islah Web Service](https://www.islahwebservice.com/)**
