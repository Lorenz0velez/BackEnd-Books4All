require("dotenv").config();
const { Router } = require("express");
const chatbot = require("../controllers/chatbot");
const dialogFlowRouter = Router();

module.exports = () => {
  dialogFlowRouter.post("/df_text_query", async (req, res) => {
    let responses = await chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });

  dialogFlowRouter.post("/df_event_query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });
};
