export function toCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '');
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