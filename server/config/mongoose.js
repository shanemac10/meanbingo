//=========== MONGOOSE CONFIG ==========//
const path  = require("path"),
    fs = require('fs'),
    models_path = path.join(__dirname,'../models'),
    mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bingo');
mongoose.Promise = global.Promise;

fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        require(models_path + '/' + file);
   }
})