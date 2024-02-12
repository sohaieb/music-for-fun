const multer = require('multer');
const {join} = require('path');
const {check} = require("express-validator");
const {MulterError} = require("multer");

/**
 * Check file type
 *
 * @param file
 * @param mimeType
 * @returns {boolean}
 */
function checkFileType(file, mimeType) {
    const regExp = new RegExp(`^${mimeType}\/.+$`);
    return regExp.test(file.mimetype);
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'attachedFile') {
            if (checkFileType(file, 'audio')) {
                return cb(null, join(process.cwd(), 'uploads/audios'));
            } else if (checkFileType(file, 'video')) {
                return cb(null, join(process.cwd(), 'uploads/videos'));
            }
            return cb(new MulterError(1, 'attachedFile'), false);
        }
        if (file.fieldname === 'musicCoverPicture') {
            if (checkFileType(file, 'image')) {
                return cb(null, join(process.cwd(), 'uploads/images'));
            }
            return cb(new MulterError(2, 'musicCoverPicture'), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `file_${Date.now()}.${file.originalname.split('.')[1]}`);
    },
    limits: {
        fieldSize: 1024 * 1024 * 10,
        fieldNameSize: 1024 * 1024
    }
});

// Create the multer instance
const uploader = multer({storage: storage});

module.exports = uploader;