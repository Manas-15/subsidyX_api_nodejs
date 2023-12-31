const express = require("express");
const IndustryCategory = require("../models/categoryModel");

const router = new express.Router();

// Swagger schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/Category'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

// Create category
/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a category
 *     description: This API creates a category with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 name: CategoryName
 *               status: Success
 *               message: "CategoryName created successfully"
 */
router.post("/category", async (req, res) => {
  try {
    const data = new IndustryCategory({
      id: req.body.id,
      name: req.body.name,
    });

    const createdCategory = await data.save();
    res.status(201).send({
      data: createdCategory,
      status: "Success",
      message: `${createdCategory.name} created successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

//Get category
/**
 * @swagger
 * /category:
 *  get:
 *      tags:
 *       - Categories
 *      summary: Get a category
 *      description: This is description
 *
 *      responses:
 *           200:
 *                description: To test description
 */

router.get("/category", async (req, res) => {
  try {
    const allCategory = await IndustryCategory.find({}, { _id: 0 }).select(
      "-__v"
    );
    res.status(200).send(allCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get category detail
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Category detail
 *     description: This API retrieves details of a category based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category.
 *     responses:
 *       200:
 *         description: Category details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Category not found.
 */
router.get("/category/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const individualCategory = await IndustryCategory.findOne(
      { id: id },
      { _id: 0 }
    );
    res.status(200).send(individualCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Update category
/**
 * @swagger
 * /category/{category_id}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Update category
 *     description: This API updates a category based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Category not found.
 */
router.patch("/category/:category_id", async (req, res) => {
  try {
    const category_id = req.params.category_id;
    console.log(category_id);
    const findCat = await IndustryCategory.findOne(
      { id: category_id },
      { _id: 0 }
    );
    console.log(findCat);
    if (findCat) {
      const updatedCategory = await IndustryCategory.findOneAndUpdate(
        { id: category_id },
        { id: req.body.id, name: req.body.name },
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
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete category
 *     description: This API delete category based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category.
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Category not found.
 */
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
