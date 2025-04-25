/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static export configuration
    output: 'export',

    // Path configuration (as you requested)
    basePath: '',       // Empty for Firebase Hosting root
    assetPrefix: '',    // Empty for default asset paths

    // Essential for static export routing
    trailingSlash: true, // Ensures proper file extensions

    // Image handling (required for static exports)
    images: {
        unoptimized: true // Firebase can't optimize images
    },

    // Optional: Environment variables for client-side
    env: {
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        // Add other client-side env vars here
    },

    // Optional: Enable if using Firebase client libraries
    // transpilePackages: ['@firebase/auth', '@firebase/firestore'],

    // Optional: Custom webpack config if needed
    // webpack: (config) => { return config }
}

module.exports = nextConfig