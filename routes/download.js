const express = require('express');
const router = express.Router();
const https = require('https');
const fs = require('fs');

const Folders  = require('../models/files');
router.get('/download',async (req, res)=>{
    const list= await Folders.find({})
    console.log(list)
    res.render('files/download.ejs',{list})
})


const download = function(url,name){
    console.log(name)
    const file = fs.createWriteStream("file.jpg");
    const request = https.get(url, function(response) {
    response.pipe(file);
});

}


router.get('/download/:id',async (req, res)=>{
    const {id}= req.params
    const item = await Folders.findById(id);
    download(item.image,item.name)

   res.send("okk")


})



module.exports = router;