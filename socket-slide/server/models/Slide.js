const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SlideSchema = new Schema({
    id: Number,
    title: String,
    content: String
})

const Slide = mongoose.model('Slide', SlideSchema)

module.exports = Slide