const express = require("express");
const Register = require("../models/authModel");

//Create a new router
const router = new express.Router();

// Swagger schema
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       properties:
 *          firstname:
 *            type: string
 *          lastname:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 * 
 *     LoginUser:
 *       type: object
 *       properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/CreateUser'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a user.
 *     description: This API creates a user with the provided name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 * 
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login a user.
 *     description: This api loggedin a user with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 */

//create signup
router.post("/signup", async (req, res) => {
  try {
    const registerUser = new Register({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    const registered = await registerUser.save();
    res.status(201).send(registered);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });
    if (userEmail.password === password) {
      res.status(201).send("User logged in successfully");
    } else {
      res.status(300).send("invalid login details");
    }
  } catch (err) {
    res.status(400).status("invalid login details");
  }
});

module.exports = router;
