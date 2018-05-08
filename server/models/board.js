//=========== BOARD MONGOOSE MODEL ==========//
const mongoose = require('mongoose'),
    Schema = mongoose.Schema, //for relationships

    BoardSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength:3, maxlength:255},
        board: [],
        users: [],
        winner: {},
        over: {type: Boolean, default: true}
    }, {timestamps: true})

mongoose.model('Board', BoardSchema)