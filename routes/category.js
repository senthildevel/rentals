const mongoose = require("mongoose");
const express = require("express");
const router = express.Router()

const { Category, validate } = require('../models/category')


router.get("/", async (req, res) => {

    const categories = await Category.find();

    res.send(categories);

})

router.get("/:id", async (req, res) => {
    let catid = req.params.id;
    const category = await Category.find({ _id: catid })

    if (!category) res.status(404).send("No course found for the given id");

    res.send(category);

})


router.post("/", async (req, res) => {

    const { error } = validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    }


    const category = new Category({
        name: req.body.name,
    })
    const result = await category.save();

    res.send(result)
})

router.put("/:id", async (req, res) => {

    const { error } = validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    }

    let id = req.params.id;

    const category = await Category.findById(id)

    if (!category) res.status(404).send("No category found for the given id");

    category.name = req.body.name;
    const result = await category.save();

    res.send(result);

})

router.delete("/:id", async (req, res) => {

    let id = req.params.id;

    const category = await Category.findByIdAndDelete({ _id: id });

    if (!category) res.status(404).send("No category found for the given id");

    res.send(category);

})


module.exports = router;
