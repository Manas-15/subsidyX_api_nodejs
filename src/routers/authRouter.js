const express = require("express");
const Register = require("../models/authModel");

//Create a new router
const router = new express.Router();

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
