
const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 50
    }

})

// create a modekl - categories 
const Category = mongoose.model("Category", categorySchema)


function validateCourse(course) {
    const schema = Joi.object({
        "name": Joi.string().min(3).required()
    })

    const result = schema.validate(course);

    return result;
}

exports.Category = Category;
exports.validate = validateCourse;

