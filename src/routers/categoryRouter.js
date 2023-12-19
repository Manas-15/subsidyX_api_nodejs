const express = require("express");
const IndustryCategory = require("../models/categoryModel");

const router = new express.Router();

//Create category
router.post("/category", async (req, res) => {
  try {
    const data = new IndustryCategory({
      name: req.body.name,
    });

    const createdCategory = await data.save();
    res.status(201).send({
      data: createdCategory,
      status: "Success",
      message: `${createdCategory.name} created successfully`,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
//Get category
router.get("/category", async (req, res) => {
  try {
    const allCategory = await IndustryCategory.find();
    res.status(200).send(allCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get category detail
router.get("/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const individualCategory = await IndustryCategory.findOne({ _id: id });
    res.status(200).send(individualCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Update category
router.patch("/category/:category_id", async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const name = req.body.name;
    const findCat = await IndustryCategory.findById({ _id: category_id });
    if (findCat) {
      const updatedCategory = await IndustryCategory.findByIdAndUpdate(
        category_id,
        { name: name },
        { new: true }
      );
      res.status(201).send({
        data: updatedCategory,
        status: "Success",
        message: `${updatedCategory.name} updated successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Category with ID ${category_id} not found`,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
//Delete category
router.delete("/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restCategory = await IndustryCategory.findByIdAndDelete({ _id: id });
    res.status(200).send(`${restCategory.name} deleted successfully`);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
