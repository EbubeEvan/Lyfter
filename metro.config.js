const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// Use Sentry's Expo Metro configuration
// eslint-disable-next-line no-undef
const config = getSentryExpoConfig(__dirname);

module.exports = config;
