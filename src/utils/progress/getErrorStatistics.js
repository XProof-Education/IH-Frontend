import errorToFeedback from "./errorToFeedback";
import lToFeedback from "./lToFeedback";

const computeL = (errorNumber) => {
  let l;
  if (errorNumber <= 5 || errorNumber === 19) {
    l = 1;
  } else if (errorNumber <= 7) {
    l = 2;
  } else if (errorNumber <= 11) {
    l = 3;
  } else if (errorNumber <= 16) {
    l = 4;
  } else {
    l = 5;
  }
  return l;
}

const getErrorStatistics = (operations) => {
  const statistics = {
    total: operations.length,
    correct: 0,
    incorrect: 0,
    errors: {},
    L:{}
  };

  operations.forEach(element => {
    if (element.isCorrect) {
      statistics.correct += 1;
    } else {
      statistics.incorrect += 1;
      const error = element.errorNums[0].error;
      const l = computeL(error);
      
      if (!statistics.errors[error]) {
        statistics.errors[error] = {
          operations: [],
          feedback: errorToFeedback(error)
        };
      }
      if (!statistics.L[l]) {
        statistics.L[l] = {
          operations: [],
          feedback: lToFeedback(l)
        }
      }
      statistics.errors[error].operations.push(element);
      statistics.L[l].operations.push(element);
    }
  });

  for (const error in statistics.errors) {
    statistics.errors[error].count = statistics.errors[error].operations.length;
  }
  for (const l in statistics.L) {
    statistics.L[l].count = statistics.L[l].operations.length;
  }

  return statistics;
}

export {
  getErrorStatistics,
  computeL
}