/**
 * IdentityFlow - Database Service
 * Initializes the Firebase Admin SDK to connect to Cloud Firestore.
 */

const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin SDK using Environment Variables
try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Replace escaped newline characters for private key parsing
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
    });
    console.log('✅ Firebase Admin SDK initialized successfully.');
} catch (error) {
    console.error('❌ Firebase initialization error:', error.stack);
}

// Export the Firestore database instance for use in server.js
const db = admin.firestore();
module.exports = db;
