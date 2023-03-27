const calculateTimePast = (date) => {
  var today = new Date();
  var lastMeasuredDate = new Date(date * 1000);

  // Note: this won't translate well when it goes to the next month
  // but I'm going to ignore it for the sake of time lol
  var diffInDays = today.getDate() - lastMeasuredDate.getDate();

  // same day
  if (
    today.getDate() == lastMeasuredDate.getDate() &&
    today.getMonth() == lastMeasuredDate.getMonth() &&
    today.getFullYear() == lastMeasuredDate.getFullYear()
  ) {
    return ["today", ""];
  }

  // yesterday or more days ago
  if (parseInt(diffInDays) == 1) {
    return ["1", "day ago"];
  } else return [parseInt(diffInDays), "days ago"];
};

export default calculateTimePast;
