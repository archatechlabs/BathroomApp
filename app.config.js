/* eslint-env node */
/**
 * @type {import('@expo/config').ExpoConfig}
 */
module.exports = {
  expo: {
    name: 'Clean_Bathroom',
    slug: 'Clean_Bathroom',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.cleanbathroom.restroomnow',
      buildNumber: '2',
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'Restroom Now uses your location to show nearby restrooms on the map.',
      },
    },
    android: {
      versionCode: 2,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'android.permission.POST_NOTIFICATIONS',
      ],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        },
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-web-browser',
      [
        'expo-notifications',
        {
          icon: './assets/icon.png',
          color: '#1E3A5F',
          sounds: [],
        },
      ],
    ],
    extra: {
      restroomApiUrl: process.env.EXPO_PUBLIC_RESTROOM_API_URL || '',
      privacyPolicyUrl:
        process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL || 'https://www.example.com/privacy',
    },
  },
};
