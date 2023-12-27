const express = require("express");
const Question = require("../models/questionModel");

const router = new express.Router();

//Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           name:
 *              type: string
 *           display_label:
 *             type: string
 *           tooltip_text:
 *             type: string
 *           options:
 *             type: array
 *             items:
 *               type: string
 *           field_type_id:
 *             type: number
 *           question_type_id:
 *             type: number
 *           industry_category_id:
 *             type: string
 *           industry_sector_id:
 *             type: string
 *
 *     QuestionResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/Question'
 *         status:
 *           type: string
 *           description: The status of the response (e.g., "Success", "Error").
 *         message:
 *           type: string
 *           description: A message providing additional information about the response.
 */

//Create Question
/**
 * @swagger
 * /question:
 *   post:
 *     tags:
 *       - Questions
 *     summary: Create a question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question created successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 name: Question
 *               status: Success
 *               message: "Question created successfully"
 */

//Create Question
router.post("/question", async (req, res) => {
  try {
    console.log("req.body");
    let questionDataArray = [];
    for (i = 0; i < req.body.length; i++) {
      questionData = {
        name: req.body[i].name,
        display_label: req.body[i].display_label,
        tooltip_text: req.body[i].tooltip_text,
        options: req.body[i].options || [""],
        field_type_id: req.body[i].field_type_id,
        question_type_id: req.body[i].question_type_id,
        industry_category_id: req.body[i].industry_category_id,
        industry_sector_id: req.body[i].industry_sector_id,
      };
      questionDataArray.push(questionData);
    }

    const createdQuestion = await Question.create(questionDataArray);

    res.status(201).send({
      data: createdQuestion,
      status: "Success",
      message: `Question created successfully`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

//Get All Question
/**
 * @swagger
 * /question:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get all question
 *     description: This api get all questions.
 *
 *     responses:
 *           200:
 *                description: Question get successfully
 */
router.get("/question", async (req, res) => {
  try {
    const getAllQuestion = await Question.find({});
    res.status(200).send(getAllQuestion);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get All Question based on categry and sector
/**
 * @swagger
 * /question/{category_id}/{sector_id}:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get all question based on category and sector
 *
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the industry category.
 *       - in: path
 *         name: sector_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the industry sector
 *     responses:
 *           200:
 *                description: Question get successfully
 */
router.get("/question/:category_id/:sector_id?", async (req, res) => {
  try {
    const { category_id, sector_id } = req.params;
    console.log("category", category_id, sector_id);

    // const query = {
    //   $or: [
    //     { industry_category_id: category_id },
    //     { industry_sector_id: sector_id },
    //   ],
    // };

    const query = {
      industry_category_id: category_id,
      industry_sector_id: sector_id,
    };
    const getAllQuestion = await Question.find(query);
    res.status(200).send(getAllQuestion);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Question Detail
/**
 * @swagger
 *  /question/{id}:
 *    get:
 *     tags:
 *         - Questions
 *     summary: Get question detail by question id
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the question.
 *     responses:
 *       200:
 *         description: All questions retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionResponse'
 *       404:
 *         description: Question not found.
 */
router.get("/question/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filteredQuestion = await Question.findOne({ _id: id });
    res.status(200).send(filteredQuestion);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update Question
/**
 * @swagger
 * /question/{id}:
 *   patch:
 *     tags:
 *       - Questions
 *     summary: Update question
 *     description: This api updates the question.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Question updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionResponse'
 *       404:
 *         description: Question not found.
 */
router.patch("/question/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findQuestion = await Question.findById({ _id: id });

    let updateData = {};
    const questionData = req.body[0];

    updateData = {
      name: questionData.name,
      display_label: questionData.display_label,
      tooltip_text: questionData.tooltip_text,
      options: questionData.options || [""],
      field_type_id: questionData.field_type_id,
      question_type_id: questionData.question_type_id,
      industry_category_id: questionData.industry_category_id,
      industry_sector_id: questionData.industry_sector_id,
    };

    if (findQuestion) {
      const updatedQuestion = await Question.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.status(201).send({
        data: updatedQuestion,
        status: "Success",
        message: `${updatedQuestion.name} updated successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Question with id ${id} not found`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Delete Question
/**
 * @swagger
 * /question/{id}:
 *   delete:
 *     tags:
 *       - Questions
 *     summary: Delete question
 *     description: This api delete question based on the provided id.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the question.
 *     responses:
 *       200:
 *         description: Question deleted successfully.
 *
 */
router.delete("/question/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedQuestion = await Question.findByIdAndDelete({ _id: id });
    if (deletedQuestion) {
      res.status(200).send({
        status: "Success",
        message: `Question deleted successfully`,
      });
    } else {
      res.status(400).send({
        status: "Error",
        message: `Question id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
