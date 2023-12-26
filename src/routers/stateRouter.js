const express = require("express");
const State = require("../models/stateModel");

const router = new express.Router();

//Swagger schema
/**
 *@swagger
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *
 *     StateResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/State'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

//Create State
/**
 * @swagger
 * /state:
 *   post:
 *     tags:
 *       - States
 *     summary: Create a state
 *     description: This api creates a state with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       201:
 *         description: State created successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 name: Statename
 *               status: Success
 *               message: "Statename created successfully"
 */
router.post("/state", async (req, res) => {
  try {
    const data = new State({
      name: req.body.name,
    });

    const createdState = await data.save();
    res.status(201).send({
      data: createdState,
      status: "Success",
      message: `${createdState.name} created successfully `,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Get State
/**
 * @swagger
 * /state:
 *   get:
 *     tags:
 *       - States
 *     summary: Get all state
 *     description: This api get all states.
 *
 *     responses:
 *           200:
 *                description: Sector get successfully
 */
//Get State
router.get("/state", async (req, res) => {
  try {
    const allState = await State.find();
    res.status(200).send(allState);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get State Detail
/**
 * @swagger
 *  /state/{id}:
 *    get:
 *     tags:
 *         - States
 *     summary: Get state detail by state id
 *     description: This api get all states by state id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the state.
 *     responses:
 *       200:
 *         description: All states retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StateResponse'
 *       404:
 *         description: State not found.
 */
router.get("/state/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const stateDetail = await State.find({ _id: id });
    res.status(200).send(stateDetail);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update State
/**
 * @swagger
 * /state/{id}:
 *   patch:
 *     tags:
 *       - States
 *     summary: Update state
 *     description: This API updates the state.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the state.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       200:
 *         description: State updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StateResponse'
 *       404:
 *         description: State not found.
 */
router.patch("/state/:id", async (req, res) => {
  try {
    const state_id = req.params.id;

    const findState = await State.findById({ _id: state_id });
    if (findState) {
      const updatedState = await State.findByIdAndUpdate(
        state_id,
        { name: req.body.name },
        { new: true }
      );
      res.status(201).send({
        data: updatedState,
        status: "Success",
        message: `${updatedState.name} updated successfully`,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//Delete State
/**
 * @swagger
 * /state/{id}:
 *   delete:
 *     tags:
 *       - States
 *     summary: Delete state
 *     description: This api delete state based on the provided id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the state.
 *     responses:
 *       200:
 *         description: State deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StateResponse'
 *       404:
 *         description: State not found.
 */
router.delete("/state/:id", async (req, res) => {
  try {
    const state_id = req.params.id;
    const restState = await State.findByIdAndDelete({ _id: state_id });
    res.status(200).send({
      status: "Success",
      message: `${restState.name} deleted successfully`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
