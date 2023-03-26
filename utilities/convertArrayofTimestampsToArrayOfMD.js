const convertArrayofTimestampsToArrayOfMD = (dates) => {
  return (datesFromTimeStamps = dates.map((date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var fullDate = new Date(date.seconds * 1000);
    var month = monthNames[fullDate.getMonth()];
    var day = fullDate.getDate();
    return `${month} ${day}`;
  }));
};

export default convertArrayofTimestampsToArrayOfMD;
