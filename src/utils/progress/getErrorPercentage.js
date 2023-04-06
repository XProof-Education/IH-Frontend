import errorToFeedback from "./errorToFeedback";

const getErrorPercentage = (operations) => {
  const statistics = {
    total: operations.length,
    correct: 0,
    incorrect: 0,
    errors: {}
  };

  operations.forEach(element => {
    if (element.isCorrect) {
      statistics.correct += 1;
    } else {
      statistics.incorrect += 1;
      const error = element.errorNums[0].error;
      
      if (!statistics.errors[error]) {
        statistics.errors[error] = {
          ids: [],
          feedback: errorToFeedback(error)
        };
      }
      statistics.errors[error].ids.push(element._id);
    }
  });

  for (const error in statistics.errors) {
    statistics.errors[error].count = statistics.errors[error].ids.length;
  }

  return statistics;
}

export default getErrorPercentage;