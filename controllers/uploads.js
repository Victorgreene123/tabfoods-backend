const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

// Configure multer storage to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
    try {
        upload.single('file')(req, res, function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const fileUrl = req.file.path;
            res.status(200).json({ url: fileUrl });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadFile };