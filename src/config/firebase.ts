import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount;


if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {

    serviceAccount = typeof process.env.FIREBASE_SERVICE_ACCOUNT === 'string' 
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
      : process.env.FIREBASE_SERVICE_ACCOUNT;
    
    console.log("✅ Loaded Firebase config from Environment Variable");
  } catch (error) {
    console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT env var", error);
  }
} 

else {
  const SERVICE_ACCOUNT_FILE_NAME = 'serviceAccountKey.json';
 
  const serviceAccountPath = path.resolve(process.cwd(), 'src', 'config', SERVICE_ACCOUNT_FILE_NAME);
  

  const rootPath = path.resolve(process.cwd(), SERVICE_ACCOUNT_FILE_NAME);

  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log("✅ Loaded Firebase config from src/config file");
  } else if (fs.existsSync(rootPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(rootPath, 'utf8'));
    console.log("✅ Loaded Firebase config from root file");
  } else {
    console.warn("⚠️ Warning: Could not find serviceAccountKey.json and FIREBASE_SERVICE_ACCOUNT env var is missing.");
  }
}

// ৩. Firebase Initialization
if (!admin.apps.length && serviceAccount) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin Initialized Successfully");
  } catch (error) {
    console.error("❌ Firebase Admin Initialization Error:", error);
  }
}

export const adminDb = admin.firestore();
