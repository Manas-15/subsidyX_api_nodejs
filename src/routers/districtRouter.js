const express = require("express");
const District = require("../models/districtModel");

const router = new express.Router();

//Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     District:
 *       type: object
 *       properties:
 *         state_id:
 *            type: string
 *         name:
 *           type: string
 *
 *     DistrictResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/District'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

//Create District
/**
 * @swagger
 * /district:
 *   post:
 *     tags:
 *       - Districts
 *     summary: Create a district
 *     description: This API creates a district with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/District'
 *     responses:
 *       201:
 *         description: District created successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 name: Districtname
 *               status: Success
 *               message: "Districtname created successfully"
 */

//Create District
router.post("/district", async (req, res) => {
  try {
    const data = new District({
      state_id: req.body.state_id,
      name: req.body.name,
    });
    const createdDistrict = await data.save();
    res.status(201).send({
      data: createdDistrict,
      status: "Success",
      message: `${createdDistrict.name} created successfully`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get All District
/**
 * @swagger
 * /district:
 *   get:
 *     tags:
 *       - Districts
 *     summary: Get all district
 *     description: This api get all districts.
 *
 *     responses:
 *           200:
 *                description: District get successfully
 */
router.get("/district", async (req, res) => {
  try {
    const getAllDistrict = await District.find();
    res.status(200).send(getAllDistrict);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get District Detail
/**
 * @swagger
 *  /district/{id}:
 *    get:
 *     tags:
 *         - Districts
 *     summary: Get district detail by district id
 *     description: This api get all districts by district id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the district.
 *     responses:
 *       200:
 *         description: All districts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DistrictResponse'
 *       404:
 *         description: District not found.
 */
router.get("/district/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filteredDistrict = await District.find({ _id: id });
    res.status(200).send(filteredDistrict);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update District
/**
 * @swagger
 * /district/{id}:
 *   patch:
 *     tags:
 *       - Districts
 *     summary: Update district
 *     description: This API updates the district.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the district.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/District'
 *     responses:
 *       200:
 *         description: District updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DistrictResponse'
 *       404:
 *         description: District not found.
 */
router.patch("/district/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findDistrict = await District.findById({ _id: id });
    if (findDistrict) {
      const updatedDistrict = await District.findByIdAndUpdate(
        id,
        {
          state_id: req.body.state_id,
          name: req.body.name,
        },
        { new: true }
      );
      res.status(201).send({
        data: updatedDistrict,
        status: "Success",
        message: `${updatedDistrict.name} updated successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Distcrict with id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete District
/**
 * @swagger
 * /district/{id}:
 *   delete:
 *     tags:
 *       - Districts
 *     summary: Delete district
 *     description: This api delete district based on the provided id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the district.
 *     responses:
 *       200:
 *         description: District deleted successfully.
 *
 */
router.delete("/district/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDistrict = await District.findByIdAndDelete({ _id: id });
    if (deletedDistrict) {
      res.status(200).send({
        status: "Success",
        message: `${deletedDistrict.name} deleted successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `District id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
