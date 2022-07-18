const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: { type: String, unique: true, toLowerCase: true, trim: true },

    longUrl: {type: String, required: true, trim: true},

    shortUrl: {type: String, unique: true} 
})

module.exports = mongoose.model("Url", urlSchema)

