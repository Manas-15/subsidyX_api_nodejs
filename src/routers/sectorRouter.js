const express = require("express");
const IndustrySector = require("../models/sectorModel");

const router = new express.Router();

//Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Sector:
 *       type: object
 *       properties:
 *         industry_id:
 *            type: string
 *         name:
 *           type: string
 *
 *     SectorResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/Sector'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

//Create Sector
/**
 * @swagger
 * /sector:
 *   post:
 *     tags:
 *       - Sectors
 *     summary: Create a sector
 *     description: This API creates a sector with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sector'
 *     responses:
 *       201:
 *         description: Sector created successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 name: Sectorname
 *               status: Success
 *               message: "Sectorname created successfully"
 */

router.post("/sector", async (req, res) => {
  try {
    const data = new IndustrySector({
      industry_id: req.body.industry_id,
      name: req.body.name,
    });

    const createdSector = await data.save();
    res.status(201).send({
      data: createdSector,
      status: "Success",
      message: `${createdSector.name} created successfully`,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get Sector
/**
 * @swagger
 * /sector:
 *   get:
 *     tags:
 *       - Sectors
 *     summary: Get all sector
 *     description: This API get all sectors.
 *
 *     responses:
 *           200:
 *                description: Sector get successfully
 */

router.get("/sector", async (req, res) => {
  try {
    const allSectors = await IndustrySector.find();
    res.status(200).send(allSectors);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get Sector by category id
/**
 * @swagger
 *  /sector/{category_id}:
 *    get:
 *     tags:
 *         - Sectors
 *     summary: Get all sector by category id
 *     description: This API get all sectors by category id.
 *
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the Industry category.
 *     responses:
 *       200:
 *         description: All sector retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectorResponse'
 *       404:
 *         description: Sector not found.
 */

router.get("/sector/:category_id", async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const data = await IndustrySector.find({ industry_id: category_id });
    res.status(200).send({
      data: data,
      status: "Success",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Sector Detail
/**
 * @swagger
 * /sector/{id}:
 *   get:
 *     tags:
 *       - Sectors
 *     summary: Get sector detail
 *     description: This API retrieves details of a sector based on the provided id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the sector.
 *     responses:
 *       200:
 *         description: Sector details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       404:
 *         description: Sector not found.
 */

router.get("/sector/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const individualCategory = await IndustrySector.findOne({ _id: id });
    res.status(200).send(individualCategory);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update Sector
/**
 * @swagger
 * /sector/{sector_id}:
 *   patch:
 *     tags:
 *       - Sectors
 *     summary: Update sector
 *     description: This API updates the sector.
 *
 *     parameters:
 *       - in: path
 *         name: sector_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the sector.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sector'
 *     responses:
 *       200:
 *         description: Sector updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectorResponse'
 *       404:
 *         description: Sector not found.
 */

router.patch("/sector/:sector_id", async (req, res) => {
  try {
    const sector_id = req.params.sector_id;
    const findSector = await IndustrySector.findById({ _id: sector_id });
    if (findSector) {
      const updatedSector = await IndustrySector.findByIdAndUpdate(
        sector_id,
        { industry_id: req.body.industry_id, name: req.body.name },
        { new: true }
      );
      res.status(201).send({
        data: updatedSector,
        status: "Success",
        message: `${updatedSector.name} updated successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Sector with ID ${sector_id} not found`,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete Sector
/**
 * @swagger
 * /sector/{id}:
 *   delete:
 *     tags:
 *       - Sectors
 *     summary: Delete sector
 *     description: This api delete sector based on the provided id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the sector.
 *     responses:
 *       200:
 *         description: Sector deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SectorResponse'
 *       404:
 *         description: Sector not found.
 */

router.delete("/sector/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restSector = await IndustrySector.findByIdAndDelete({ _id: id });
    res.status(200).send(`${restSector.name} deleted successfully`);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
