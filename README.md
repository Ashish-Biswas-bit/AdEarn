# AdEarn - Ad Earning Platform

A comprehensive Next.js frontend for an ad-earning platform where users can earn money by watching ads, completing tasks, referring friends, and unlocking premium features.

## Features

### Core Functionality
- **Watch Ads**: Users can watch video, banner, and interstitial ads to earn money ($0.10 - $0.50 per ad)
- **Complete Tasks**: Social media engagement tasks (Facebook likes, YouTube subscriptions, Instagram follows, app downloads)
- **Referral System**: 20% lifetime commission from referrals with $5 signup bonus for referred users
- **Premium Membership**: 3x earnings multiplier, instant withdrawals, unlimited daily ads, exclusive offers
- **Withdrawals**: Multiple payment methods (PayPal, Bank Transfer, Cryptocurrency) with minimum $10 ($5 for premium)

### Pages
- `/` - Landing page with feature showcase
- `/login` - User authentication
- `/register` - New user registration with referral code support
- `/dashboard` - User earnings overview and quick actions
- `/ads` - Ad watching interface with countdown timer
- `/tasks` - Social media tasks and app downloads
- `/referrals` - Referral link sharing and referral tracking
- `/premium` - Premium subscription plans and features
- `/withdraw` - Withdrawal request and transaction history

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **State Management**: React Context (AuthContext)
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/page.tsx     # Login page
│   ├── register/page.tsx  # Registration page
│   ├── dashboard/page.tsx # User dashboard
│   ├── ads/page.tsx       # Watch ads page
│   ├── tasks/page.tsx     # Complete tasks page
│   ├── referrals/page.tsx # Referral system
│   ├── premium/page.tsx   # Premium subscription
│   └── withdraw/page.tsx  # Withdrawal page
├── components/            # Reusable components
│   └── Navbar.tsx        # Navigation bar
├── context/              # React Context
│   └── AuthContext.tsx   # Authentication state
└── app/
    ├── layout.tsx        # Root layout
    └── globals.css       # Global styles
```

## Backend Integration Notes

### AdMob Integration
The frontend includes placeholder components for AdMob integration. To make it fully functional:

1. Set up Google AdMob account
2. Create ad units (Banner, Interstitial, Rewarded Video)
3. Implement server-side API endpoints:
   - `/api/ads/fetch` - Get available ads
   - `/api/ads/verify` - Verify ad completion
   - `/api/ads/reward` - Credit user account

### Authentication API
Replace the mock authentication in `AuthContext.tsx` with actual API calls:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

### Payment Integration
For withdrawals and premium subscriptions, integrate with:
- PayPal API
- Stripe/Other payment processors
- Crypto payment gateways

## Configuration

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADMOB_APP_ID=your_admob_app_id
```

### Tailwind Custom Colors
The project uses custom colors defined in `tailwind.config.js`:
- Primary blue palette
- Gold palette for premium features

## License

MIT License

## Support

For backend integration or customization support, contact your development team.
