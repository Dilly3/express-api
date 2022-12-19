const admin = require("firebase-admin");
const serviceAccount = require("./aniks-proj1-df3f1-firebase-adminsdk-n62hz-83e60a8845.json");

const projectId = "aniks-proj1";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`, // check it under service accounts
  storageBucket: `${projectId}.appspot.com`, //check it in script snippet require to add to your website.
});
const db = admin.firestore();
const Colref = db.collection('blog1')

module.exports = Colref;