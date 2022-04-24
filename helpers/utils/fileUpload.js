const { storage, admin } = require('../utils/config')
const multer = require('multer');
const uuid = require('uuid-v4')

// Create a bucket associated to Firebase storage bucket
const bucket = storage.bucket('gs://davinonrides.appspot.com');

// Initiating a memory storage engine to store files as Buffer objects
exports.uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
}).single('file')

exports.uploaderFirebase = async (req, res, next, folder, ) => {
    console.log('Uploading file..................')
    // console.log({'RequestParams': req})
    var publicUrl;
    try {
        if (!req.file) {
            res.status(400).send('Error, could not upload file');
            return;
        }
        // Create new blob in the bucket referencing the file
        const blob = bucket.file(`${folder}/${req.file.originalname}`);
        // Create writable stream and specifying file mimetype 
        const blobWriter = blob.createWriteStream({
            gzip: true,
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid()
                }
            },
        });

        blobWriter.on('error', (err) => next(err));

        blobWriter.on('finish', () => {
            // Assembling public URL for accessing the file via HTTP
            console.log('uploaded successfully....')
            const filename = encodeURI(blob.name).replace('/', '%2F')
            publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${filename}?alt=media`;

            // Return the file name and its public URL
            res
                .status(200)
                .send({ fileName: req.file.originalname, fileLocation: publicUrl });
            // return publicUrl;
        });

        // When there is no more data to be consumed from the stream
        blobWriter.end(req.file.buffer);
        // return publicUrl;
    } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return publicUrl;
    }
}

exports.testCloudStorage = async (req, res, next) => {
    console.log('Testing storage....')
    storage.getBuckets().then((buckets) => {
        // buckets.
        console.log({ Buckets: buckets })
        res.status(400).send(`${b}`);
        return
    }).catch((error) => {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
    })
}

exports.testAdminSdk = (req, res, next) => {
    const bucket = admin.storage().bucket('users');
    res.status(200).json({ bucket })
}

