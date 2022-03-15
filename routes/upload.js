const express = require('express');
const router = express.Router();
const multer = require('multer');
const Folders  = require('../models/files');
const { storage,cloudinary } = require('../CloudConfig');

const upload = multer({ 
    storage,
    filename: Date(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: 300000 }
 });

router.get('/upload',(req, res)=>{
    res.render('files/upload.ejs')
})

router.post('/upload',upload.single('image'),async (req, res)=>{
    console.log(req.file);

    const newfile =  new Folders({name:req.file.filename, image :req.file.path})
    await newfile.save();
    res.send(newfile)
})

module.exports = router;