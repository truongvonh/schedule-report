import * as functions from "firebase-functions";
import {Request, Response} from "firebase-functions";
import shuffle from "lodash.shuffle";
import moment from "moment";
import googleFormSubmitReport from "../reports/google-form-submit-report";
import {Issue, IssuesResponse, StatusName} from "../reports/issues.response.interface";
import {PercentByStatusEnum} from "../reports/percentByStatus.enum";
import {IssuesEndpoint} from "../shared/api/issues.endpoint";
import axiosInstance from "../shared/axios.instance";
import {initQuery, findBy, FIRESTORE_COLLECTIONS, addNewDataToCollection} from "../shared/firestore";
import GLOBAL_ENV from "../shared/global.env";
import {
  StatusCodes,
} from "http-status-codes";

interface IssueMapped extends Issue {
  reportDescription: string
}

const ARRAY_FOR_SHUFFLE_PERCENT = ["70%", "75%", "80%", "85%", "90%"];

const computePercentFinished = (status: StatusName): string => {
  if (status !== StatusName.Review) {
    return PercentByStatusEnum[status];
  }

  return shuffle(ARRAY_FOR_SHUFFLE_PERCENT)[0];
};

const handleReport = functions
    .https
    .onRequest(async (request: Request, response: Response): Promise<any> => {
      const issuesResponse: IssuesResponse = await axiosInstance
          .get(IssuesEndpoint.FilterIssuesByJQL, {
            params: {
              jql: GLOBAL_ENV.DEFAULT_JQL_QUERY,
            },
          });

      let doneTasks = "";
      let inProgressTasks = "";

      issuesResponse
          .issues
          .map((item: Issue) => {
            const percentWork = computePercentFinished(item.fields.status.name);
            const taskUrl= `${GLOBAL_ENV.ENDPOINT}/browse/${item.key}`;
            const reportDescription = `${taskUrl} (${percentWork})\n`;

            return ({
              ...item,
              reportDescription,
            }) as IssueMapped;
          })
          .forEach((issue: IssueMapped) => {
            if (issue.fields.status.name === StatusName.Review) {
              doneTasks = doneTasks.concat(issue.reportDescription);
            } else {
              inProgressTasks = inProgressTasks.concat(issue.reportDescription);
            }
          });

      const previousDate = moment().subtract(1, "days").format("YYYY-MM-DD");

      const reportPayload = {
        reportedDate: previousDate,
        isReported: true,
        doneTasks,
        inProgressTasks,
      };

      const queryByReportedToday = initQuery(
          FIRESTORE_COLLECTIONS.REPORT_HISTORY
      )
          .where("reportedDate", "==", previousDate);

      const dataReports = await findBy(queryByReportedToday);

      if (dataReports?.length) {
        return response.status(StatusCodes.OK).json({
          isReported: true,
        });
      }

      await addNewDataToCollection(
          FIRESTORE_COLLECTIONS.REPORT_HISTORY,
          reportPayload
      );

      await googleFormSubmitReport({inProgressTasks, doneTasks});

      return response.status(StatusCodes.OK).json({
        doneTasks,
        inProgressTasks,
        dataReports,
      });
    });

export {
  handleReport,
};
