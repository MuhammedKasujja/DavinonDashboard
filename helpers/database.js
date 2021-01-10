const admin =  require("firebase-admin");
const serviceAccount = require("../davinon-rides-firebase-adminsdk.json")

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
exports.db = admin.firestore()
