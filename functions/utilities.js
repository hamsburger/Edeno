export function toCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '');
}


export function getCurrentTime(){
  let d = new Date(Date.now())
  let year = `${d.getFullYear()}`.padStart(4, '0');
  let month = `${d.getMonth() + 1}`.padStart(2, '0');
  let day = `${d.getDate()}`.padStart(2, '0');
  let hour = `${d.getHours()}`.padStart(2, '0');
  let minutes = `${d.getMinutes()}`.padStart(2, '0');
  let seconds = `${d.getSeconds()}`.padStart(2, '0');

  // let sign = (timezone_offset_in_minutes > 0) ? "-" : "+";
  // let timezone_offset_in_minutes = d.getTimezoneOffset();
  // let timezone_offset_in_hours = `${+(timezone_offset_in_minutes / 60)}`.padStart(4, '0');

  // 2019-02-23 09:06:04.123123
  let datestring = year  + "-" + month + "-"  + day + " " +
  hour + ":" + minutes + ":" + seconds + "." + d.getMilliseconds() + "000";
  return datestring
}

export function buildDataset(dataPoints, lower, upper) {
  dataset = [{
    data: dataPoints,
    color: (opacity = 1) => `rgba(89, 127, 81, ${opacity})`, // optional
    strokeWidth: 2, // optional
  }];
  if (lower){
    dataset.push(
      {
        data: Array(dataPoints.length).fill(lower),
        color: (opacity = 1) => `rgba(173, 205, 176, ${opacity})`, // optional
        strokeWidth: 2, // optional
      }
    );
  }

  if (upper){
    dataset.push(
      {
        data: Array(dataPoints.length).fill(upper),
        color: (opacity = 1) => `rgba(173, 205, 176, ${opacity})`, // optional
        strokeWidth: 2, // optional
      }
    )
  }
  return dataset    
}