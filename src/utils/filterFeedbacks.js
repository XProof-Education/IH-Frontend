const filterFeedBacks = (feedBacks) => {
  const confidentFeedBacks = feedBacks.filter(elem => elem.confidence > 90);
  if (confidentFeedBacks.length >= 1) {
      return [confidentFeedBacks[0]];
  } else {
      return feedBacks;
  }
}

export default filterFeedBacks;