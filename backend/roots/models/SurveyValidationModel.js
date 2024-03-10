const mongoose = require("mongoose");

const surveyValidationSchema = new mongoose.Schema({

 crypt:{type:String}

});

const SurveyValidation = mongoose.model("SurveyValidation", surveyValidationSchema);

module.exports = SurveyValidation;
