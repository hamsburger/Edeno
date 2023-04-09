const diseaseData = {
  1: { isHealthy: true },
  2: {
    isHealthy: false,
    name: "Powdery Mildew",
    description:
      "Powdery mildew is an infectious fungal disease caused by different species from the Erysiphaceae family. It causes characteristic powdery spots on the leaves, stems, fruits, and other parts of the plant.",
    treatment:
      "biological: Wash the spores from a susceptible plant with a stream of water. chemical: If necessary, apply a fungicide. Powdery mildew on deciduous trees usually does little damage, so chemical control is not needed. prevention: Grow the plants in sunny places with good air ventilation.",
  },
};

const NDVIAssessmentData = {
  1: {
    ndvi: 0.77,
    classification: "Very Healthy Plant",
  },
  2: {
    ndvi: 0.41,
    classification: "Moderately Healthy Plant",
  },
  3: {
    ndvi: 0.13,
    classification: "Unhealthy Plant",
  },
  4: {
    ndvi: -0.3,
    classification: "Dead Plant",
  },
};

export { diseaseData, NDVIAssessmentData };
