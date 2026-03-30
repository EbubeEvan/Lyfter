# Lyfter 🚗

A full-featured rideshare mobile application built with React Native and Expo. Lyfter allows users to book rides, track drivers on a live map, pay securely via Stripe, and view their full ride history — all with a clean, modern UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication** — Email/password sign-up & sign-in, Google OAuth, and secure token storage powered by Clerk
- **Ride Booking** — Search for a pickup location and destination using Google Places autocomplete, then view available drivers on a live map
- **Driver Selection** — Browse nearby drivers with ratings, estimated time of arrival, and fare prices calculated in real time
- **Interactive Map** — Live map view showing your location, driver positions, destination pin, and a rendered route with directions
- **Payments** — Stripe-powered payment flow with full card-entry UI and confirmation
- **Ride History** — View all past rides with pickup/drop-off addresses, fare, driver info, and timestamps
- **User Profile** — View account details synced from Clerk (name, email, profile photo)
- **Cross-platform** — Runs on iOS, Android, and Web via Expo

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native 0.74 + Expo ~51 |
| Routing | Expo Router (file-based) |
| Language | TypeScript |
| Authentication | Clerk (`@clerk/clerk-expo`) |
| State Management | Zustand |
| Maps | react-native-maps + Google Maps Directions API |
| Location Search | react-native-google-places-autocomplete + Geoapify |
| Payments | Stripe (`@stripe/stripe-react-native`) |
| Styling | NativeWind (Tailwind CSS for React Native) |
| UI Extras | `@gorhom/bottom-sheet`, react-native-reanimated, react-native-gesture-handler |
| Error Monitoring | Sentry |
| Database Client | `@neondatabase/serverless` |
| Build & Deployment | EAS Build + Expo Updates |
| Testing | Jest + jest-expo |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) — included via `npx expo` (no global install required)
- [EAS CLI](https://docs.expo.dev/eas/) (for production builds) — `npm install -g eas-cli`
- [Expo Go](https://expo.dev/go) app on your iOS or Android device (for local testing)
- An Android emulator or iOS simulator (optional)

You will also need accounts and API keys for the following services:

- [Clerk](https://clerk.com/) — Authentication
- [Google Cloud](https://console.cloud.google.com/) — Maps JavaScript API, Places API, and Directions API
- [Stripe](https://stripe.com/) — Payment processing
- [Geoapify](https://www.geoapify.com/) — Geocoding (optional)
- [Sentry](https://sentry.io/) — Error monitoring (optional)

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EbubeEvan/Lyfter.git
   cd Lyfter
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables)).

---

## Environment Variables

Create a `.env` file in the project root and populate it with the following keys:

```env
# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key

# Google APIs (Maps, Places, Directions)
EXPO_PUBLIC_GOOGLE_API_KEY=your_google_api_key

# Geoapify (optional — additional geocoding)
EXPO_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_api_key

# Stripe Payment Processing
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Backend API
EXPO_PUBLIC_API_URL=https://your-api-server.vercel.app/

# Sentry Error Monitoring (optional)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

> **Note:** All variables prefixed with `EXPO_PUBLIC_` are bundled into the client app. Never place secret keys (e.g., Stripe secret key, database credentials) in `EXPO_PUBLIC_` variables.

---

## Running the App

**Start the Expo development server:**

```bash
npm start
```

This opens the Expo developer menu. From there you can:

| Command | Platform |
|---|---|
| `npm run android` | Open on Android emulator or device |
| `npm run ios` | Open on iOS simulator or device |
| `npm run web` | Open in a web browser |

Alternatively, scan the QR code with the **Expo Go** app on your physical device.

---

## Building for Production

Lyfter uses [EAS Build](https://docs.expo.dev/build/introduction/) for production builds.

**Log in to your Expo account:**

```bash
eas login
```

**Build for Android (APK):**

```bash
eas build --platform android --profile production
```

**Build for iOS (IPA):**

```bash
eas build --platform ios --profile production
```

**Submit to app stores:**

```bash
eas submit --platform android   # Google Play Store
eas submit --platform ios       # Apple App Store
```

**Publish an OTA update:**

```bash
eas update
```

Build profiles are defined in [`eas.json`](./eas.json).

---

## Running Tests

```bash
npm test
```

The test suite uses **Jest** and **jest-expo**. Tests run in watch mode by default.

---

## Project Structure

```
Lyfter/
├── app/                        # Expo Router screens (file-based routing)
│   ├── (auth)/                 # Unauthenticated screens
│   │   ├── welcome.tsx         # Onboarding carousel
│   │   ├── sign-in.tsx         # Sign-in screen
│   │   ├── sign-up.tsx         # Registration screen
│   │   └── _layout.tsx
│   ├── (root)/                 # Authenticated screens
│   │   ├── (tabs)/             # Bottom tab navigation
│   │   │   ├── home.tsx        # Dashboard with recent rides
│   │   │   ├── rides.tsx       # Full ride history
│   │   │   ├── chat.tsx        # Chat (placeholder)
│   │   │   ├── profile.tsx     # User profile
│   │   │   └── _layout.tsx
│   │   ├── find-ride.tsx       # Set pickup & destination
│   │   ├── confirm-ride.tsx    # Choose a driver
│   │   ├── book-ride.tsx       # Payment & confirmation
│   │   └── _layout.tsx
│   ├── index.tsx               # Entry point & auth redirect
│   └── _layout.tsx             # Root layout (Clerk provider, fonts)
├── components/                 # Reusable UI components
│   ├── CustomButton.tsx
│   ├── InputField.tsx
│   ├── GoogleTextInput.tsx
│   ├── Map.tsx
│   ├── DriverCard.tsx
│   ├── Payment.tsx
│   ├── RideCard.tsx
│   ├── RideLayout.tsx
│   └── OAuth.tsx
├── lib/                        # Utility & service modules
│   ├── fetch.ts                # API client + useFetch hook
│   ├── auth.ts                 # Clerk auth helpers & token cache
│   ├── map.ts                  # Map utilities (markers, regions, ETA)
│   └── utils.ts                # Formatting & sorting helpers
├── store/                      # Zustand global state
│   └── index.ts                # Location & selected driver stores
├── constants/                  # Static data
│   └── index.ts                # Icons, images, onboarding slides
├── types/                      # TypeScript types & interfaces
│   ├── type.d.ts
│   └── image.d.ts
├── assets/                     # Fonts, images, icons
├── app.config.js               # Expo app configuration
├── eas.json                    # EAS Build profiles
├── tailwind.config.js          # NativeWind / Tailwind configuration
├── babel.config.js             # Babel configuration
└── tsconfig.json               # TypeScript configuration
```

---

## API Reference

Lyfter communicates with a backend API (deployed separately). The base URL is configured via `EXPO_PUBLIC_API_URL`.

| Endpoint | Method | Description |
|---|---|---|
| `/api/user` | `POST` | Register a new user |
| `/api/driver` | `GET` | List all available drivers |
| `/api/ride/:userId` | `GET` | Fetch ride history for a user |
| `/api/ride/create` | `POST` | Create a new ride booking |
| `/api/(stripe)/create` | `POST` | Create a Stripe payment intent |
| `/api/(stripe)/pay` | `POST` | Confirm a Stripe payment |

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code passes linting before opening a PR:

```bash
npm run lint
```

---

## License

This project is open source. See the [LICENSE](./LICENSE) file for details.
