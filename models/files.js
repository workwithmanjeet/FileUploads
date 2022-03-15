const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema({
    name: String,
    image: String,
    
 
});

module.exports = mongoose.model('Files',filesSchema);