const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const { Body } = require("twilio/lib/twiml/MessagingResponse");
const accountSid = process.env.TWILLIO_AUTH_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
console.log("🚀 ~ authToken:", authToken);

// client.messages
//   .create({
//     from: "+13343199573",
//     to: "0546663286",
//   })
//   .then((message) => console.log(message.sid))
//   .done();

const client = require("twilio")(accountSid, authToken);
const sendSMS = async (username,phoneNumber) => {
    console.log("🚀 ~ sendSMS ~ phoneNumber:", phoneNumber)
    const website_url="http://localhost:5173/"
  client.messages
    .create({
      body: ` ${username}! would you spend one minuets of yourTime to help as be better and feal this quick Survey : ${website_url}`,
      from: "+13343199573",
      to: phoneNumber,
    })
    .then((message) => console.log(message.sid));
};

// const accountSid = 'AC98099cc24cf48886b49209c199cf0fd8';
// const authToken = '[AuthToken]';

sendSMS("ream","+972546663286");

module.exports = { sendSMS };
