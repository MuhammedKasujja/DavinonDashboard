const { COLLECTION_USERS } = require('./utils/CollectionTypes');
const { db, auth, admin } = require('./utils/config')

exports.createUser = (req, res) => {
    // console.error(req.body)
    let userId;
    let _token;
    const { email, password, username } = req.body
    auth.createUserWithEmailAndPassword(email, password).then(userDetails => {
        userId = userDetails.user.uid
        return userDetails.user.getIdToken()
    }).then(token => {
        _token = token;
        const doc = db.collection(COLLECTION_USERS).doc(userId)
        return doc.set({
            email,
            username,
            role: 'member',
            userId,
            photoUrl: 'http://www.example.com/12345678/photo.png',
            createdOn: new Date().toISOString(),
            enabled: true
        }).then(() => {
            return res.status(201).json({ token: _token })
        })
    }).catch(err => {
        console.error(err)
        if (err.code === 'auth/email-already-in-use') {
            return res.status(400).json({ error: 'Email is already in use' })
        }
        if (err.code === "auth/network-request-failed") {
            return res.status(400).json({ error: 'No network' })
        }
        return res.status(500).json({ error: err.code })
    });
}


exports.login = (req, res) => {
    const { email, password } = req.body
    let uid, lastSignInTime;
    auth.signInWithEmailAndPassword(email, password).then(data => {
        lastSignInTime = data.user.metadata.lastSignInTime
        uid = data.user.uid
        return data.user.getIdToken();
    }).then(token => {
        return res.status(201).json({ token, lastSignInTime, uid })
    }).catch(err => {
        console.error(err)
        if (err.code === 'auth/wrong-password') {
            return res.status(403).json({ message: 'Wrong credentials, please try again' })
        }
        else if (err.code === 'auth/network-request-failed') {
            return res.status(404).json({ message: 'No internet connection' })
        }
        else if (err.code === 'auth/user-not-found') {
            return res.status(404).json({ message: 'User does not exists' })
        } else
            return res.status(500).json({ error: err.code })
    });
}


exports.fetchUsers = (req, res) => {
    db.collection(COLLECTION_USERS).get().then((data) => {
        let users = []
        if (data.docs.length > 0) {

            data.docs.forEach(doc => {
                const data = doc.data()
                // console.info({ data })
                admin.auth().getUser(data.userId).then((user) => {
                    data.lastSignInTime = user.metadata.lastSignInTime
                    users.push(data)
                    console.info({ data })
                });
            })
            /// how to push users in array before printing this
            console.log({ 'fetching data': 'I dont know' })
            return res.status(200).json({ users })
        }
        else
            return res.status(403).json({ message: 'No data found', users })
    })
}