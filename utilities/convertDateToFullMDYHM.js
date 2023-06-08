const convertDateToFullMDYHM = (date) => {
  // date = date.split(" ").join("T").slice(0, -7)
  // console.log(date);
  if (!date || date === -1) return "Not Yet Measured";
  var fullDate = new Date(date * 1000); // TO-DO: Need to parse date
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var month = monthNames[fullDate.getMonth()];
  var dayOfMonth =
    fullDate.getDate() < 10 ? `0${fullDate.getDate()}` : fullDate.getDate();
  var year = fullDate.getFullYear();
  var hour =
    fullDate.getHours() < 12 ? fullDate.getHours() : fullDate.getHours() - 12;
  if (hour == 0) {
    hour = 12;
  }
  var minute =
    fullDate.getMinutes() < 10
      ? `0${fullDate.getMinutes()}`
      : fullDate.getMinutes();
  var AMPM = fullDate.getHours() > 12 ? "pm" : "am";
  return `${month} ${dayOfMonth}, ${year} ${hour}:${minute} ${AMPM}`;
};

export default convertDateToFullMDYHM;
