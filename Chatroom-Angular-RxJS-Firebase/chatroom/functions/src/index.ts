// The Firebase Admin SDK to access the Firebase Realtime Database.
// Command: firebase deploy --only functions
const admin = require('firebase-admin');
admin.initializeApp();

import * as smileys from './smileys';

export const textToSmiley = smileys.onMessageCreate;
