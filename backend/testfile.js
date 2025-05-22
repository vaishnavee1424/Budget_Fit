require('dotenv').config();
const sendSMS = require('./utils/sendEmail');

sendSMS("+917440912143", "Testing SMS from Expense Tracker!")
  .then(() => console.log("Sent!"))
  .catch((err) => console.error("Error:", err.message));
