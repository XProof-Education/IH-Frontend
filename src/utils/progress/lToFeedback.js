const lToFeedback = (lNumber) => {
  const lFeedbacks = {
    1: 'Final step in the equation',
    2: 'Sum & subtraction',
    3: 'Distributives',
    4: 'Fractions',
    5: 'Fractions with distributives'
  }
  return lFeedbacks[lNumber]
}

export default lToFeedback;