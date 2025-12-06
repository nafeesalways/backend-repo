
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();


const SERVICE_ACCOUNT_FILE_NAME = 'serviceAccountKey.json';

const serviceAccountPath = path.join(process.cwd(), SERVICE_ACCOUNT_FILE_NAME);

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`❌ Error: Could not find ${SERVICE_ACCOUNT_FILE_NAME} at ${serviceAccountPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

console.log("✅ Firebase Admin Initialized");
export const adminDb = admin.firestore();
