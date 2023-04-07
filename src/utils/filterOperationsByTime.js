const filterOperations = (operations, filterType) => {
  const now = new Date();
  const dayInMillis = 12 * 60 * 60 * 1000;
  const weekInMillis = 7 * dayInMillis;
  const monthInMillis = 30 * dayInMillis;

  return operations.filter((doc) => {
    const docDate = new Date(doc.createdAt);
    switch (filterType) {
      case 'today':
        return now - docDate < dayInMillis;
      case 'yesterday':
        return now - docDate >= dayInMillis && now - docDate < 2 * dayInMillis;
      case 'lastWeek':
        return now - docDate < weekInMillis;
      case 'lastMonth':
        return now - docDate < monthInMillis;
      default:
        return true;
    }
  });
};

export default filterOperations;