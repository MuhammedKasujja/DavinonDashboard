const { auth, db } = require('./utils/config')
const { COLLECTION_DRIVERS, COLLECTION_VEHICLES } = require("./utils/CollectionTypes")

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
                data.vehicle['driverId'] = data.driver.id
                var vehicleRef = db.collection(COLLECTION_VEHICLES).doc();
                data.vehicle.id = vehicleRef.id;
                vehicleRef.set(data.vehicle).then(() => {
                    console.log({ AddingNewVehicle: 'this is awesome' })
                }).catch(e => {
                    console.error({ 'VehicleError': `Could not save data ${e}` })
                })
                console.info({ 'Success': `Driver successfull registered` })
                return res.status(201).json({ message: "Driver successfull registered" })
            }).catch(e => {
                console.error('Error creating new driver:', error);
                return res.status(201).json({ error: 'Could not create driver' })
            })
            // auth.linkAccount(userRecord,'al.kasmud.2@gmail.com');
            // console.log('User:', userRecord.toJSON())
            // userRecord.
        }).catch(err => {
            console.error(err)
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ error: 'Email is already in use' })
            }
            return res.status(500).json({ error: err.code })
        })
    } else {
        data.vehicle.driverId = null
        var vehicleRef = db.collection(COLLECTION_VEHICLES).doc();
        data.vehicle.id = vehicleRef.id;
        return vehicleRef.set(data.vehicle)
    }

}
