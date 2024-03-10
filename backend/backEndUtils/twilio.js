const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Body } = require("twilio/lib/twiml/MessagingResponse");
const SurveyValidation = require("../roots/models/SurveyValidationModel");
const accountSid = process.env.TWILLIO_AUTH_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const myNumber = process.env.TWILLIO_MY_NUMBER;

const client = require("twilio")(accountSid, authToken);
const sendSMS = async (username, phoneNumber, id) => {
  const hashedKey = ReturnHashedKey(id);
  const surveyValidation = await SurveyValidation.create({
    crypt: hashedKey,
  });
  const website_url = `http://localhost:5173/${hashedKey}`;
  client.messages
    .create({
      body: ` ${username}! would you spend one minuets of yourTime to help as be better and feal this quick Survey : ${website_url}`,
      from: myNumber,
      to: phoneNumber,
    })
    .then((message) => console.log(message.sid));
};
function sendAReviewSurvey(username, phoneNumber, id) {
  const delayInMilliseconds = 30 * 60 * 1000;
  const timeoutId = setTimeout(
    sendSMS(username, phoneNumber, id),
    delayInMilliseconds
  );
}

const ReturnHashedKey = async (id) => {
  const hashedKey = await bcrypt.hash(id, saltRounds);
  return hashedKey;
};
module.exports = { sendSMS, sendAReviewSurvey };
