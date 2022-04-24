const { Storage } = require('@google-cloud/storage')
const admin = require("firebase-admin")
const firebase = require("firebase/app")
require("firebase/auth");
const path = require('path');

const serviceAccount = require("../../davinon-rides-firebase-adminsdk.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "davinonrides.appspot.com",
});

const config = {
    apiKey: "AIzaSyB9ovqOW4giP8fdohQzBc9A225OYBh-Snw",
    authDomain: "davinonrides.firebaseapp.com",
    databaseURL: "https://davinonrides-default-rtdb.firebaseio.com",
    projectId: "davinonrides",
    storageBucket: "davinonrides.appspot.com",
    messagingSenderId: "796907075869",
    appId: "1:796907075869:web:1c5e22b2fad92f245f89f4",
    measurementId: "G-E2QX4PM2ZX"
}

firebase.initializeApp(config);

const auth = firebase.auth()
const db = admin.firestore()
const firestore = admin.firestore;

const storage = new Storage({
    projectId: config.projectId,
    keyFilename: path.join(__dirname,'../../davinon-rides-firebase-adminsdk.json'),
})

module.exports = {
    db, admin, auth, firestore, config, storage
}