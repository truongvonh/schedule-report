import * as functions from "firebase-functions";

const scheduleReport = functions
    .pubsub
    .schedule("every 1 minutes").onRun((context) => {
      functions.logger.info("Hello logs! cron jobs", {structuredData: true});
      functions.logger.debug(context, {structuredData: true});
      return null;
    });

export {
  scheduleReport,
};
