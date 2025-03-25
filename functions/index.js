/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const { Filter } = require("firebase-admin/firestore");

const functions = require("firebase-functions"); // Cloud Functions v1
const admin = require("firebase-admin");
const Filter = require("bad-words");

admin.initializeApp();
const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
    .document("messages/{msgId}")
    .onCreate(async (snap, context) => {
      const filter = new Filter();
      const {text, uid} = snap.data();

      if (filter.isProfane(text)) {
        const cleaned = filter.clean(text);
        // Update the message with a warning
        await snap.ref.update({
          text: `🤐 I got BANNED for life for saying... ${cleaned}`,
        });

        // Add user to banned collection
        await db.collection("banned").doc(uid).set({});
      }
    });
