const express = require('express');
const router = express.Router();
const repo = require("../helpers/repository");
var { upload, multer } = require('../helpers/fileUploader')
// var { streamNewPayments } = require('../helpers/events')
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
  COLLECTION_SETTINGS } = require("../helpers/utils/CollectionTypes");

// const modelTonnages = require("../helpers/utils/Tonnages").tonnages
// const modelCarTypes = require("../helpers/utils/CarTypes").carTypes
// const modelFleets = require("../helpers/utils/Fleets").fleets
// const modelTruckBodies = require("../helpers/utils/TruckBodies").truckBodies


router.get('/', function (req, res, next) {
  res.json({ "Connected": "Yes yes yes" })
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

router.post('/trucks/add', function (req, res, next) {

  // upload(req, res, function (err) {
  //   if (err instanceof multer.MulterError) {
  //     return res.status(500).json(err)
  //   } else if (err) {
  //     return res.status(500).json(err)
  //   }
  //   console.log({ 'ReqBody': req.body })
  //   return res.status(200).send(req.file)

  // })
  // if (!req.files || Object.keys(req.files).length === 0)
  //   console.log({ 'NoFiles': 'Files not found' })
  // else
  //   console.log({ 'Body': req.file.filename })
  // const file = req.file
  // console.log({ 'File': file.name })
  // repo.fileUpload()
  repo.postData(COLLECTION_VEHICLES, req.body, res)
    .then(msg => res.status(200).json(msg))
    .catch(err => res.status(500).json(err));
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


router.post('/drivers/add', function (req, res, next) {
  // console.log("Yes yes connected")
  // var data = {
  //   name: 'Nakayiza Shamim',
  //   email: "shamim@gmail.com",
  //   contact: '0705613444',
  //   available: true,
  //   trucks: []
  // }
  repo.addDriver(req.body, res)
    .then(msg => res.json(msg))
    .catch(err => res.json(err));

});
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
  console.log({ 'RequestParams': date })

  repo.streamTrips(res,date)
});

router.get('/drivers/active', function (req, res, next) {
  repo.streamActiveDrivers(res)
});

router.get('/payments/stream/:date', function (req, res, next) {
  const { date } = req.params
  repo.streamNewPayments(res, date)
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
// router.post('/trucks/addData', function (req, res, next) {
//   fleets.forEach(t => {
//     repo.postData(COLLECTION_FLEETS, t, res)
//       .then(msg => console.log(msg))
//       .catch(err => console.log(err));
//   });

// });
module.exports = router;
