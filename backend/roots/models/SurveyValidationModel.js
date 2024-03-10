const mongoose = require("mongoose");

const surveyValidationSchema = new mongoose.Schema({

 crypt:{type:String}

});
// hey
const SurveyValidation = mongoose.model("SurveyValidation", surveyValidationSchema);

module.exports = SurveyValidation;
