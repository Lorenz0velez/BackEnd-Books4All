const { Router } = require("express");
const chatbot = require("../controllers/chatbot");
const dialogFlowRouter = Router();
const dotenv = require("dotenv");
dotenv.config();

dialogFlowRouter.post("/df_text_query", async (req, res) => {
  try {
    let responses = await chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).send(`Error: ${err.message}`);
  }
});

dialogFlowRouter.post("/df_event_query", async (req, res) => {
  try {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(400).send(`Error: ${err.message}`);
  }
});

module.exports = dialogFlowRouter;
