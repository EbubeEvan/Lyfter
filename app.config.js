import "dotenv/config";

export default {
  expo: {
    name: "lyfter",
    slug: "lyfter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon.png",
    scheme: "lyfter",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#08b783",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon-android.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY, // Use the env variable directly
        },
      },
      package: "com.ebubeevan.lyfter",
    },
    web: {
      bundler: "metro",
      output: "server",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://lyfter-api.vercel.app/",
        },
      ],
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          project: "lyfter",
          organization: "evans-org",
        },
      ],
    ],
    extra: {
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
        process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL,
      EXPO_PUBLIC_GEOAPIFY_API_KEY: process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY,
      EXPO_PUBLIC_GOOGLE_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
      EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      eas: {
        projectId: "4daefbae-6505-4f2d-adb1-00bf6b521357",
      },
    },
    owner: "ebubeevan",
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/4daefbae-6505-4f2d-adb1-00bf6b521357",
    },
  },
};
