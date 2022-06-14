// const dialogflow = require("@google-cloud/dialogflow");
// const uuid = require("uuid");

// async function runSample(projectId = "dabadu-bot-wtnu") {
//   const sessionId = uuid.v4();

//   const sessionClient = new dialogflow.SessionsClient({
//     keyFilename:
//       "C:/Users/Neosoft/Desktop/pulkit-bot/dabadu-bot-wtnu-7c7756bc6906.json",
//   });
//   const sessionPath = sessionClient.projectAgentSessionPath(
//     projectId,
//     sessionId
//   );

//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: "Hello",
//         languageCode: "en-US",
//       },
//     },
//   };

//   const responses = await sessionClient.detectIntent(request);
//   console.log("Detected intent");
//   const result = responses[0].queryResult;
//   console.log(`  Query: ${result.queryText}`);
//   console.log(`  Response: ${result.fulfillmentText}`);
//   if (result.intent) {
//     console.log(`  Intent: ${result.intent.displayName}`);
//   } else {
//     console.log("  No intent matched.");
//   }
// }
// runSample();

const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const express = require("express");
const app = express();
const dfff = require("dialogflow-fulfillment");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const chatBotRouter = require("./routes/chatbotRoutes");
app.get("/", (req, res) => {
  console.log("hello");
  res.send("hii working");
});

app.post("/", express.json(), (req, res) => {
  const agent = new dfff.WebhookClient({
    request: req,
    response: res,
  });
  function demo(agent) {
    agent.add("Sending response from webhook server");
  }
  function customPayloadDemo(agent) {
    var payloadData = {
      richContent: [
        [
          {
            type: "accordion",
            title: "accordian title",
            subtitle: "Accorduan subtitle",
            image: {
              src: {
                rawUrl: "https://example.com/images/logo.png",
              },
            },
            text: "Accordiaon text",
          },
        ],
      ],
    };
    agent.add(
      new dfff.Payload(agent.UNSPECIFIED, payloadData, {
        sendAsMessage: true,
        rawPayload: true,
      })
    );
  }

  var intentMap = new Map();
  //   intentMap.set("webhookDemo", demo);
  intentMap.set("customPayloadDemo", customPayloadDemo);
  agent.handleRequest(intentMap);
});
app.use("/chatBot", chatBotRouter);

app.listen(process.env.PORT || 4000, () =>
  console.log("server is running on 4000")
);
