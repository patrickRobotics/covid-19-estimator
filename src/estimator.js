const normalizeDays = (periodType, timeToElapse) => {
  let days;
  if (periodType === 'days') {
    days = timeToElapse;
  } else if (periodType === 'weeks') {
    days = timeToElapse * 7;
  } else {
    days = timeToElapse * 30;
  }
  return days;
};

const computeFactor = (periodType, timeToElapse) => {
  const days = normalizeDays(periodType, timeToElapse);
  return Math.floor(days / 10);
};

const computeImpact = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const factor = computeFactor(data.periodType, data.timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  const impact = {
    currentlyInfected,
    infectionsByRequestedTime
  };

  return impact;
};

const computeSevereImpact = (data) => {
  const currentlyInfected = data.reportedCases * 50;
  const factor = computeFactor(data.periodType, data.timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  const severeImpact = {
    currentlyInfected,
    infectionsByRequestedTime
  };

  return severeImpact;
};

const covid19ImpactEstimator = (data) => {
  const impactData = computeImpact(data);
  const severeImpactData = computeSevereImpact(data);
  return {
    data,
    impact: {
      currentlyInfected: impactData.currentlyInfected,
      infectionsByRequestedTime: impactData.infectionsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severeImpactData.currentlyInfected,
      infectionsByRequestedTime: severeImpactData.infectionsByRequestedTime
    }
  };
};

export default covid19ImpactEstimator;
