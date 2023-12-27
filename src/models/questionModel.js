const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    display_label: {
      type: String,
    },
    tooltip_text: {
      type: String,
    },
    options: {
      type: [String],
    },
    field_type_id: {
      type: Number,
    },
    question_type_id: {
      type: Number,
    },
    industry_category_id: {
      type: String,
    },
    industry_sector_id: {
      type: String,
    },
  },
  { versionKey: false }
);

const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
