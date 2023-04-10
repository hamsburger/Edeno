const convertDateToMDYHM = (date) => {
  if (date === null || date === -1) return ""
  var fullDate = new Date(date * 1000);
  var month =
    fullDate.getMonth() < 10
      ? `0${fullDate.getMonth() + 1}`
      : fullDate.getMonth() + 1;
  var dayOfMonth =
    fullDate.getDate() < 10 ? `0${fullDate.getDate()}` : fullDate.getDate();
  var year = fullDate.getFullYear();
  var hour =
    fullDate.getHours() <= 12 ? fullDate.getHours() : fullDate.getHours() - 12;
  var minute =
    fullDate.getMinutes() < 10
      ? `0${fullDate.getMinutes()}`
      : fullDate.getMinutes();
  var AMPM = fullDate.getHours() >= 12 ? "pm" : "am";
  return `${month}/${dayOfMonth}/${year} ${hour}:${minute} ${AMPM}`;
};

export default convertDateToMDYHM;
