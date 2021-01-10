const mult = require("multer")

var storage = mult.diskStorage({
    destination: function (req, file, cb) {
        /* { uploads } folder where store files on the server */ 
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
/* { file } the multipart-formdata name to update */
exports.upload = mult({ storage: storage }).single('file');
exports.multer = mult
