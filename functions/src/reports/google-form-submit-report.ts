import GLOBAL_ENV from "../shared/global.env";
import moment from "moment";

const fields = {
  nextPlanField: "entry.280634973",
  doneField: "entry.493617459",
  hourEndField: "entry.402186908_hour",
  hourStartField: "entry.324759131_hour",
  minuteStartField: "entry.324759131_minute",
  minuteEndField: "entry.402186908_minute",
  calendarYearField: "entry.254448003_year",
  calendarMonthField: "entry.254448003_month",
  calendarDayField: "entry.254448003_day",
};

const googleFormSubmitReport = ({
  inProgressTasks = "",
  doneTasks = ""}) => {
  const previousDay = moment().subtract(1, "days");

  const googleFormPayload = {
    [fields.calendarDayField]: previousDay.format("DD"),
    [fields.calendarMonthField]: previousDay.format("MM"),
    [fields.calendarYearField]: previousDay.format("YYYY"),
    [fields.hourStartField]: "09",
    [fields.hourEndField]: "18",
    [fields.minuteStartField]: "00",
    [fields.minuteEndField]: "00",
    [fields.nextPlanField]: inProgressTasks,
    [fields.doneField]: doneTasks ||
    "Reviewing all to do tasks and reopen tasks",
  };


  const url = `https://docs.google.com/forms/d/e/${GLOBAL_ENV.REPORT_FORM_ID}/viewform`;

  // const googleForm = new GoogleForm(url);
  // console.log("url submit", url);
  console.log("googleFormPayload =>", JSON.stringify(googleFormPayload, null, 2));
  console.log("url =>", url);
}
;

export default googleFormSubmitReport;
