/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPEN_AI_API: process.env.OPEN_AI_API,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STRORAGE_BUCKET: process.env.STRORAGE_BUCKET,
    MESSAGE_SENDER_MESSAGE_ID: process.env.MESSAGE_SENDER_MESSAGE_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  },

  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/add-template',
        destination: '/addTemplate',
      },
      {
        source: '/deleted-outputs',
        destination: '/deletedOutputs',
      },
      {
        source: '/favourite-outputs',
        destination: '/favouriteOutputs',
      },
      {
        source: '/general-settings',
        destination: '/generalSettings',
      },
      {
        source: '/plan-details',
        destination: '/planDetails',
      },
      {
        source: '/profile-settings',
        destination: '/profileSettings',
      },
      {
        source: '/update-templates',
        destination: '/updateTemplates',
      },
      {
        source: '/deactivate',
        destination: '/userDeactivate',
      },
      {
        source: '/user-details/:slug',
        destination: '/userDetails/:slug',
      },
      {
        source: '/user-management',
        destination: '/userManagement',
      },
      {
        source: '/forget-password',
        destination: '/auth/forgetPassword',
      },
      {
        source: '/signup',
        destination: '/auth/signUp',
      },
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/reset-password',
        destination: '/auth/resetPassword',
      },
    ];
  },
};

module.exports = nextConfig;
