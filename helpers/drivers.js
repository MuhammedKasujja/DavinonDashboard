const { auth, db } = require('./utils/config')
const { COLLECTION_DRIVERS, COLLECTION_VEHICLES, COLLECTION_TRIPS } = require("./utils/CollectionTypes")

exports.createDriver = (req, res) => {
    const date = new Date().toISOString()
    const data = req.body;
    console.info(data)
    data.vehicle.createdOn = date
    data.vehicle.updatedOn = date

    if (data.driver) {
        data.driver.createdOn = date
        return auth.createUserWithEmailAndPassword(
            data.driver.email, 'kasmud.2',
        ).then(function (userRecord) {
            // admin.auth().generateEmailVerificationLink('al.kasmud.2@gmail.com').then(data=>{
            //     console.log({"UserVerification":data});
            // })

            // Generate code to finish signup and change password later [at first login on Mobile App] 
            // See the UserRecord reference doc for the contents of userRecord.
            const ref = db.collection(COLLECTION_DRIVERS).doc(userRecord.user.uid);
            data.driver.id = ref.id;
            ref.set(data.driver).then((_) => {
                data.vehicle.driverId = data.driver.id
                var vehicleRef = db.collection(COLLECTION_VEHICLES).doc();
                data.vehicle.id = vehicleRef.id;
                vehicleRef.set(data.vehicle).then(() => {
                    console.log({ AddingNewVehicle: 'this is awesome' })
                    ref.set({ vehicle: data.vehicle }, { merge: true });
                }).catch(e => {
                    console.error({ 'VehicleError': `Could not save data ${e}` })
                })
                console.info({ 'Success': `Driver successfull registered` })
                return res.status(201).json({ message: "Driver successfull registered", driverId: ref.id, success: true })
            }).catch(e => {
                console.error('Error creating new driver:', error);
                return res.status(501).json({ message: 'Could not create driver', success: false })
            })
            // auth.linkAccount(userRecord,'al.kasmud.2@gmail.com');
            // console.log('User:', userRecord.toJSON())
            // userRecord.
        }).catch(err => {
            console.error(err)
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ message: 'Email is already in use', success: false })
            }
            return res.status(500).json({ message: err.code, success: false })
        })
    } else {
        data.vehicle.driverId = null
        var vehicleRef = db.collection(COLLECTION_VEHICLES).doc();
        data.vehicle.id = vehicleRef.id;
        return vehicleRef.set(data.vehicle)
    }

}

exports.fetchDriverDetails = async (req, res, next) => {
    try {
        const snapshot = await db.collection(COLLECTION_DRIVERS).doc(req.params.driverId).get();
        if (snapshot.exists) {
            const trucksSnaps = await db.collection(COLLECTION_VEHICLES).where('driverId', '==', snapshot.id).get()
            const cars = []
            const trips = []
            if (!trucksSnaps.empty) {
                trucksSnaps.forEach((doc) => {
                    cars.push(doc.data())
                })
            }
            const tripsSnaps = await db.collection(COLLECTION_TRIPS).where('driver.id', '==', snapshot.id).get()
            if (!tripsSnaps.empty) {
                tripsSnaps.forEach((doc) => {
                    trips.push(doc.data())
                })
            }
            return res.status(200).json({ driver: snapshot.data(), success: true, cars, trips })
        }
        return res.status(500).json({ message: 'No driver found', success: false })
    } catch (error) {
        return res.status(503).json({ message: 'Could not get Driver details', success: false })
    }
}