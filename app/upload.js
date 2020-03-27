const express = require("express");
const db = require("./db.config.js");
const tools = require("./tools.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname + './../public/images/'),
    filename: function (req, file, cb) {
        cb(null, tools.makeid(15) +
            path.extname(file.originalname));
    }

});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
    }
}

var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2000000 //max 2mb
    }
}).single('file');

var uploads = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2000000 //max 2mb
    }
}).array('file');

router.post("/", (req, res, next) => {

    upload(req, res, err => {
        const file = req.file;

        db.query("INSERT INTO upload SET ?", [{
            file: file.filename
        }], (err, data) => {
            if (!err) {
                res.status(200).json({
                    value: "1",
                    message: "Berhasil"
                });
            } else {
                res.status(404).json({
                    value: "0",
                    message: "Tidak di tersimpan"
                });
            }
        })
    })
});


router.post("/array/", (req, res, next) => {
    uploads(req, res, err => {
        const files = req.files;
        files.forEach(element => {
            db.query("INSERT INTO upload SET ?", [{
                file: element.filename
            }])
        });
        res.status(200).json({
            value: "1",
            message: "Berhasil"
        });
    })

});

router.delete("/", (req, res, next) => {
    try {
        fs.unlinkSync('./public/images/' + req.body.file);
        console.log('successfully deleted /tmp/hello');
        return res.status(200).send('Successfully! Image has been Deleted');
    } catch (err) {
        // handle the error
        return res.status(400).send(err);
    }

})


module.exports = router;