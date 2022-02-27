import * as functions from "firebase-functions";
import {scheduleReport} from "./reports";
import {handleReport} from "./reports/handle-report";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

  response.send("Hello from Firebase! hello world");
});

export {
  helloWorld,
  scheduleReport,
  handleReport,
};

