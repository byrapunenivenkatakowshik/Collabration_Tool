const admin = require('firebase-admin');

// Check if Firebase environment variables are configured
const isFirebaseConfigured = () => {
  const hasConfig = !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_CLIENT_EMAIL
  );
  
  return hasConfig;
};

// Validate Firebase configuration or throw error
if (!isFirebaseConfigured()) {
  console.error('❌ Firebase configuration missing!');
  console.error('   Please set the following environment variables:');
  console.error('   - FIREBASE_PROJECT_ID');
  console.error('   - FIREBASE_PRIVATE_KEY');
  console.error('   - FIREBASE_CLIENT_EMAIL');
  console.error('');
  console.error('   You can get these from Firebase Console > Project Settings > Service Accounts');
  throw new Error('Firebase configuration is required to run this application');
}

console.log('🔥 Firebase configured - initializing...');

// Create service account configuration
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
  token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
};

// Initialize Firebase Admin only if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`
    });
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
    throw new Error(`Firebase initialization failed: ${error.message}`);
  }
} else {
  console.log('✅ Firebase Admin already initialized');
}

// Initialize Firestore and Auth
const db = admin.firestore();
const auth = admin.auth();

// Test Firestore connection
db.listCollections()
  .then(() => {
    console.log('✅ Firestore connection verified');
  })
  .catch(err => {
    console.error('❌ Firestore connection failed:', err.message);
    throw new Error(`Firestore connection failed: ${err.message}`);
  });

// Error-proof database operations wrapper
const safeDbOperation = async (operation, errorMessage = 'Database operation failed') => {
  try {
    return await operation();
  } catch (error) {
    console.error(`❌ ${errorMessage}:`, error.message);
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

// Health check function
const checkDatabaseHealth = async () => {
  try {
    await db.collection('health').doc('check').get();
    return { 
      status: 'healthy', 
      type: 'firebase', 
      projectId: process.env.FIREBASE_PROJECT_ID,
      timestamp: new Date().toISOString() 
    };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      type: 'firebase',
      error: error.message, 
      timestamp: new Date().toISOString() 
    };
  }
};

module.exports = {
  admin,
  db,
  auth,
  isFirebaseConfigured,
  safeDbOperation,
  checkDatabaseHealth
};