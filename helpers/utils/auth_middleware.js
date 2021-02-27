const { COLLECTION_USERS } = require('./CollectionTypes');
const { admin, db } = require('./config')

// Auth middleware for protected requests or routes
exports.FBAuth = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.log('token not found in request')
        return res.status(403).json({ error: 'Unauthorized' })
    }

    admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        req.user = decodedToken;
        console.info({ decodedToken })
        return db.collection(COLLECTION_USERS).where('userId', '==', req.user.uid).limit(1).get()
    }).then(data => {
        req.user.username = data.docs[0].data().username
        // procced and execute the request   
        return next();
    }).catch(err => {
        console.error('Error while verifying token', err)
        if(err.code === 'auth/id-token-expired'){
            res.status(500).json({ error: 'Session Expired, Please Login again' })
        }
        return res.status(403).json({ error: err.code })
    });
}