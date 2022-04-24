const express = require('express');
const router = express.Router();
const repo = require("../helpers/repository");
const { upload, multer } = require('../helpers/fileUploader')
// var { streamNewPayments } = require('../helpers/events')

const { fleets } = require('../helpers/utils/Fleets')
const { tonnages } = require('../helpers/utils/Tonnages')
const { carTypes } = require('../helpers/utils/CarTypes')
const { truckBodies } = require('../helpers/utils/TruckBodies')
const { createUser, login, fetchUsers } = require('../helpers/user')
const { streamPayments, paymentsNots, markCurrentUserPaymentNotificationsAsRead } = require('../helpers/payments');
const { createDriver, fetchDriverDetails } = require('../helpers/drivers')
const { uploader, uploaderFirebase, testCloudStorage, testAdminSdk } = require('../helpers/utils/uploader')

const { COLLECTION_BRANDS,
  COLLECTION_TONNAGES,
  COLLECTION_TRUCK_BODY,
  COLLECTION_STATIONS,
  COLLECTION_VEHICLE_TYPES,
  COLLECTION_VEHICLES,
  COLLECTION_TRIPS,
  COLLECTION_PASSENGERS,
  COLLECTION_USERS,
  COLLECTION_TRIP_REVIEWS,
  COLLECTION_PAYMENTS,
  COLLECTION_SETTINGS,
  COLLECTION_FLEETS } = require("../helpers/utils/CollectionTypes");
const { FBAuth } = require('../helpers/utils/auth_middleware');
const { markTripNotificationsAsRead, streamTripNotifications } = require('../helpers/trips');


router.post('/signup', createUser)
router.post('/login', login)
router.get('/fetchUsers', fetchUsers)
router.get('/payments/notifications/:uid/:lastLoginDate', streamPayments)
router.get('/trips/notifications/:uid/:lastLoginDate', streamTripNotifications)

// Read notifications
router.post('/payments/notifications/read', FBAuth, markCurrentUserPaymentNotificationsAsRead)
router.post('/trips/notifications/read', FBAuth, markTripNotificationsAsRead)
///
router.get('/payments/nots', paymentsNots)

router.get('/drivers/infor/:driverId', fetchDriverDetails)

router.get('/', FBAuth, (req, res, next) => {
  res.status(200).json({ "Connected": "Yes yes yes" })

});

router.get('/trips', (req, res) => {
  Promise.all([repo.fetchData(COLLECTION_TRIPS)]).then(function (results) {
    console.log("Length: " + results[0].length)
    res.json({ trips: results[0] });
  })
});

router.get('/drivers', function (_req, res, next) {

  var firebaseData = {};
  // repo.fetchData(COLLECTION_DRIVERS)

  Promise.all([repo.joinsCollectionsHandler()]).then(function (results) {
    // firebaseData.members = results[0];
    //console.log(firebaseData);
    console.log("Drivers:" + results[0].length)
    res.json({ drivers: results[0] });
  });

});

router.get('/passengers', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_PASSENGERS),]).then(function (results) {
    console.log("passengers:" + results[0].length)
    res.json({ passengers: results[0] });
  });
});

router.get('/settings', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_SETTINGS),]).then(function (results) {
    console.log("config:" + results[0].length)
    res.json(results[0][0]);
  });
});

router.post('/settings/edit/', function (req, res, next) {
  // console.log(req.body)
  repo.postData(COLLECTION_SETTINGS, req.body, res)
    .then(msg => res.json(msg))
    .catch(err => res.json(err));
});

router.get('/drivers/stations', function (req, res, next) {
  var firebaseData = {};
  Promise.all([repo.fetchData(COLLECTION_STATIONS),]).then(function (results) {
    firebaseData.members = results[0];
    //console.log(firebaseData); 
    console.log("Stations:" + results[0].length)
    res.json({ stations: results[0] });
  });

});

router.get('/trucks', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_VEHICLES)]).then(function (results) {
    console.log("Length: " + results[0].length)
    res.json({ trucks: results[0] });
  })
});

router.delete('/trucks/delete/:id', function (req, res, next) {
  Promise.all([repo.deleteDataById(COLLECTION_VEHICLES, req.params.id)]).then(function (results) {
    console.log(results[0])
    res.json(results[0]);
  })
});

router.get('/trucks/view/:id', function (req, res, next) {
  Promise.all([repo.fetchDataById(COLLECTION_VEHICLES, req.params.id)]).then(function (results) {
    res.json({ truck: results[0] });
  })
});

router.get('/trucks/tonnages', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_TONNAGES)]).then(function (results) {
    console.log("Length: " + results[0].length)
    res.json({ tonnages: results[0] });
  })
});

router.get('/trucks/vehicle-types', function (req, res, next) {

  Promise.all([repo.fetchData(COLLECTION_VEHICLE_TYPES),]).then(function (results) {
    console.log({ "vehicleTypes": results[0].length })
    res.json({ vehicleTypes: results[0] });
  });

});

router.get('/add_trucks', function (req, res, next) {
  Promise.all([repo.fetchVehicleTypes()]).then(function (results) {
    console.log("VehicleTypes: " + results[0].length)
    results[0].forEach(doc => {
      console.log(doc.name)
    });
    res.json({ vehicles: results[0] });
  })
});

router.post('/trucks/add', uploader, function (req, res, next) {
  uploaderFirebase(req, res, next, 'vehicles', function sendData(imgUrl) {
    if (imgUrl) {
      const data = req.body
      data.photo = {
        isOnline: true,
        url: imgUrl
      }
      repo.postData(COLLECTION_VEHICLES, data, res)
        .then(msg => res.status(200).json(msg))
        .catch(err => res.status(500).json(err));
    } else {
      res.status(500).json({ error: 'Could not upload image to server' })
    }
  })
})

router.post('/trucks/add-old', function (req, res, next) {
  // console.log({"ReqBody":req.body});
  // uploadFile(req, res)

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log({ "MulterError": req.body });
      return res.status(500).json(err)
    } else if (err) {
      console.log({ "UploadError": req.body });
      return res.status(500).json(err)
    }
    // console.log({ 'FilePath': `${req.body}` })
    // console.log({ ResponseData: res })
    return res.status(200).send(req.file.path)
  })

  // if (!req.files || Object.keys(req.files).length === 0)
  //   console.log({ 'NoFiles': 'Files not found' })
  // else
  //   console.log({ 'Body': req.file.filename })
  // const file = req.file
  // console.log({ 'File': file.name })
  // repo.fileUpload()

  // repo.postData(COLLECTION_VEHICLES, req.body, res)
  //   .then(msg => res.status(200).json(msg))
  //   .catch(err => res.status(500).json(err));
});

router.get('/trucks', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_VEHICLES)]).then(function (results) {
    console.log("Trucks: " + results[0].length)
    res.json({ trucks: results[0] });
  })
});

router.get('/trucks/truck-body', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_TRUCK_BODY)]).then(function (results) {
    console.log("TruckBody: " + results[0].length)
    res.json({ truckBodies: results[0] });
  })
});

router.post('/drivers/add', createDriver)

router.get('/car-brands', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_BRANDS)]).then(function (results) {
    console.log("CarBrands: " + results[0].length)
    res.json({ brands: results[0] });
  })
});
router.post('/car-brands/add/', function (req, res, next) {
  // console.log(req.body)
  repo.postData(COLLECTION_BRANDS, req.body, res)
    .then(msg => res.json(msg))
    .catch(err => res.json(err));

});

router.put('/car-brands/edit/:id', function (req, res, next) {
  repo.addBrandModel(req.body, res)
    .then(msg => res.json(msg))
    .catch(err => res.json(err));

});

router.get('/notifications', function (req, res, next) {
  res.json({});
});

router.get('/truckTypes', function (req, res, next) {
  res.json({ 'types': [] })
});

router.post('/addVehicleType', (req, res, next) => {
  console.log("Yes yes connected")
  var data = {
    name: req.body.name,
    description: req.body.description
  }
  repo.addVehicleType(data)
  // res.status(201).json({
  //   message: "Data saved"
  // })
  //Remain on the page
  res.status(204).json({ 'message': 'successfull' })
  // if(res.statusCode == 201){
  //   req.destroy();
  // }
});

/*********  streams for notifications **************/
router.get('/trips/stream/:date', function (req, res, next) {
  const { date } = req.params
  // console.log({ 'RequestParams': date })

  repo.streamTrips(res, date)
});

router.get('/drivers/active', function (req, res, next) {
  repo.streamActiveDrivers(res)
});

router.get('/payments/stream/:uid', function (req, res, next) {
  const { uid } = req.params
  console.log({ uid })
  repo.streamNewPayments(res, uid)
});

/**************** end streams ****************/

router.post('/drivers/attach-vehicle', function (req, res, next) {
  console.log(req.body)
  repo.attachVehicleToDriver(req.body)
});

router.get('/joins', function (_req, res, _next) {
  Promise.all([repo.joinsCollectionsHandler()]).then(function (results) {
    // console.log("CarBrands: " + results[0].length )
    res.json({ drivers: results[0] });
  })
  // repo.joinsCollectionsHandler(res)
});

router.get('/users/login/:email/:password', function (req, res, _next) {
  console.log({ 'LoginBody': req.body })
  const { email, password } = req.body
  Promise.all([repo.login(email, password),]).then(function (results) {
    console.log("user:" + results[0])
    const res = results[0] === null ? { message: 'User not found', success: false } : results[0]
    res.json(res);
  }).catch(err => {
    console.log("LoginError:" + err)
    res.json({ message: err, success: false });
  });

});

router.get('/users', function (req, res, _next) {
  fetchUsers(req, res)
});

router.post('/users/register', function (req, res, next) {
  // console.log(req.body)
  repo.postData(COLLECTION_USERS, req.body, res)
    .then(msg => res.json(msg))
    .catch(err => res.json(err));

});

router.get('/payments', function (req, res, next) {
  Promise.all([repo.fetchData(COLLECTION_PAYMENTS)]).then(function (results) {
    console.log("payments: " + results[0].length)
    res.json(results[0]);
  })
});

router.get('/payments/grand-total', function (req, res, next) {
  Promise.all([repo.getGrandTotalPayments()]).then(function (results) {
    // console.log("TotalPayments: " + results[0].length)
    res.json(results[0]);
  })
});

router.get('/trips/reviews', function (_req, res, _next) {
  Promise.all([repo.fetchData(COLLECTION_TRIP_REVIEWS)]).then(function (results) {
    console.log("reviews: " + results[0].length)
    res.json(results[0]);
  })
});

/// setting up configurations

router.post('/config/saveSettings', function (req, res, next) {

  fleets.forEach(t => {
    repo.postData(COLLECTION_FLEETS, t, res)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  });

  tonnages.forEach(t => {
    repo.postData(COLLECTION_TONNAGES, t, res)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  });

  carTypes.forEach(t => {
    repo.postData(COLLECTION_VEHICLE_TYPES, t, res)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  });

  truckBodies.forEach(t => {
    repo.postData(COLLECTION_TRUCK_BODY, t, res)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  });

  res.status(200).json({ success: true })

});

router.post('/uploadFirebase', uploader, function (req, res, next) {
  uploaderFirebase(req, res, next, 'clients', function sendData(path) {
    console.log({ path })
    res.status(200)
      .send({ path });
  }).then((filepath) => {
    console.log({ filepath })
  })
})

router.get('/test-storage', uploader, function (req, res, next) {
  testCloudStorage(req, res, next)
})

router.get('/test-admin-storage', uploader, function (req, res, next) {
  testAdminSdk(req, res, next)
})


module.exports = router;
