const express = require("express");
const Department = require("../models/departmentModel");

const router = new express.Router();

//Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *
 *     DepartmentResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/Department'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

//Create Department
/**
 * @swagger
 * /department:
 *   post:
 *     tags:
 *       - Departments
 *     summary: Create a department
 *     description: This api creates a department with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Department created successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 name: Department
 *               status: Success
 *               message: "Department created successfully"
 */

//Create Department
router.post("/department", async (req, res) => {
  try {
    const data = new Department({
      name: req.body.name,
    });
    const createdDepartment = await data.save();
    res.status(201).send({
      data: createdDepartment,
      status: "Success",
      message: `${createdDepartment.name} created successfully`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get All Department
/**
 * @swagger
 * /department:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get all department
 *     description: This api get all departments.
 *
 *     responses:
 *           200:
 *                description: Department get successfully
 */
router.get("/department", async (req, res) => {
  try {
    const getAllDepartment = await Department.find();
    res.status(200).send(getAllDepartment);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Department Detail
/**
 * @swagger
 *  /department/{id}:
 *    get:
 *     tags:
 *         - Departments
 *     summary: Get department detail by department id
 *     description: This api get all departments by department id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the department.
 *     responses:
 *       200:
 *         description: All departments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DepartmentResponse'
 *       404:
 *         description: Department not found.
 */
router.get("/department/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filteredDepartment = await Department.find({ _id: id });
    res.status(200).send(filteredDepartment);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update Department
/**
 * @swagger
 * /department/{id}:
 *   patch:
 *     tags:
 *       - Departments
 *     summary: Update department
 *     description: This api updates the department.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the department.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DepartmentResponse'
 *       404:
 *         description: Department not found.
 */
router.patch("/department/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findDepartment = await Department.findById({ _id: id });
    if (findDepartment) {
      const updatedDepartment = await Department.findByIdAndUpdate(
        id,
        {
          state_id: req.body.state_id,
          name: req.body.name,
        },
        { new: true }
      );
      res.status(201).send({
        data: updatedDepartment,
        status: "Success",
        message: `${updatedDepartment.name} updated successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Department with id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete Department
/**
 * @swagger
 * /department/{id}:
 *   delete:
 *     tags:
 *       - Departments
 *     summary: Delete department
 *     description: This api delete department based on the provided id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the department.
 *     responses:
 *       200:
 *         description: Department deleted successfully.
 *
 */
router.delete("/department/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDepartment = await Department.findByIdAndDelete({ _id: id });
    if (deletedDepartment) {
      res.status(200).send({
        status: "Success",
        message: `${deletedDepartment.name} deleted successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Department id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
