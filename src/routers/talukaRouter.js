const express = require("express");
const Taluka = require("../models/talukaModel");

const router = new express.Router();

//Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Taluka:
 *       type: object
 *       properties:
 *         state_id:
 *           type: string
 *         district_id:
 *           type: string
 *         name:
 *           type: string
 *
 *     TalukaResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/Taluka'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

//Create Taluka
/**
 * @swagger
 * /taluka:
 *   post:
 *     tags:
 *       - Talukas
 *     summary: Create a taluka
 *     description: This api creates a taluka with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Taluka'
 *     responses:
 *       201:
 *         description: Taluka created successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 name: Taluka
 *               status: Success
 *               message: "Taluka created successfully"
 */

//Create Taluka
router.post("/taluka", async (req, res) => {
  try {
    const data = new Taluka({
      state_id: req.body.state_id,
      district_id: req.body.district_id,
      name: req.body.name,
    });
    const createdTaluka = await data.save();
    res.status(201).send({
      data: createdTaluka,
      status: "Success",
      message: `${createdTaluka.name} created successfully`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get All Taluka
/**
 * @swagger
 * /taluka:
 *   get:
 *     tags:
 *       - Talukas
 *     summary: Get all taluka
 *     description: This api get all talukas.
 *
 *     responses:
 *           200:
 *                description: Taluka get successfully
 */
router.get("/taluka", async (req, res) => {
  try {
    const getAllTaluka = await Taluka.find();
    res.status(200).send(getAllTaluka);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Taluka Detail
/**
 * @swagger
 *  /taluka/{id}:
 *    get:
 *     tags:
 *         - Talukas
 *     summary: Get taluka detail by taluka id
 *     description: This api get all talukas by taluka id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the taluka.
 *     responses:
 *       200:
 *         description: All talukas retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TalukaResponse'
 *       404:
 *         description: Taluka not found.
 */
router.get("/taluka/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filteredTaluka = await Taluka.find({ _id: id });
    res.status(200).send(filteredTaluka);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update Taluka
/**
 * @swagger
 * /taluka/{id}:
 *   patch:
 *     tags:
 *       - Talukas
 *     summary: Update taluka
 *     description: This api updates the taluka.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the taluka.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Taluka'
 *     responses:
 *       200:
 *         description: Taluka updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TalukaResponse'
 *       404:
 *         description: Taluka not found.
 */
router.patch("/taluka/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findTaluka = await Taluka.findById({ _id: id });
    if (findTaluka) {
      const updatedTaluka = await Taluka.findByIdAndUpdate(
        id,
        {
          state_id: req.body.state_id,
          district_id: req.body.district_id,
          name: req.body.name,
        },
        { new: true }
      );
      res.status(201).send({
        data: updatedTaluka,
        status: "Success",
        message: `${updatedTaluka.name} updated successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Taluka with id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete Taluka
/**
 * @swagger
 * /taluka/{id}:
 *   delete:
 *     tags:
 *       - Talukas
 *     summary: Delete taluka
 *     description: This api delete taluka based on the provided id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the taluka.
 *     responses:
 *       200:
 *         description: Taluka deleted successfully.
 *
 */
router.delete("/taluka/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTaluka = await Taluka.findByIdAndDelete({ _id: id });
    if (deletedTaluka) {
      res.status(200).send({
        status: "Success",
        message: `${deletedTaluka.name} deleted successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Taluka id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
