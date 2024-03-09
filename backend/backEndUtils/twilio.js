const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const { Body } = require("twilio/lib/twiml/MessagingResponse");
const accountSid = process.env.TWILLIO_AUTH_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const myNumber = process.env.TWILLIO_MY_NUMBER;


const client = require("twilio")(accountSid, authToken);
const sendSMS = async (username,phoneNumber) => {
    const website_url="http://localhost:5173/"
  client.messages
    .create({
      body: ` ${username}! would you spend one minuets of yourTime to help as be better and feal this quick Survey : ${website_url}`,
      from: myNumber,
      to: phoneNumber,
    })
    .then((message) => console.log(message.sid));
};



module.exports = { sendSMS };
