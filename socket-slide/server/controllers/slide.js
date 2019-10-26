const Slide = require("../models/Slide")

class SlideController {
    static findAll(req, res) {
        Slide.find().exec()
        .then(slides => {
            res.status(200).json(slides)
        })
        .catch(console.log)
    }
    static findOne (id) {
        return Slide.findOne({ id }).exec()
        .then(slide => {
            return slide
        })
        .catch(console.log)
    }
}

module.exports = SlideController