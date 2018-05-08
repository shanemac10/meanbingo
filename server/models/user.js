//=========== USER MONGOOSE MODEL ==========//
const mongoose = require('mongoose'),
    Schema = mongoose.Schema, //for relationships

    UserSchema = new mongoose.Schema({
        username: {type: String, required: true, minlength:2, maxlength:255},
        status: {type: String, required: false, default:"NOT_READY" } 
        // upon creation, status will set to NOT_READY, as the user is going to
        // be sent to dashboard after creation. When player is ready, status is
        // changed to READY. Upon disconnect, OFF_LINE. And when in game, PLAYING.
    }, {timestamps: true})

mongoose.model('User', UserSchema)