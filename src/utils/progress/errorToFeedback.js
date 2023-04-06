const errorToFeedback = (errorNumber) => {
  const errorFeedbacks = {
    0: "You inverted the numerator and the denominator of the solution.",
    1: "You don't have to change the sign when you divide/multiply to the other side.",
    2: "You changed the sign and inverted the numerator and the denominator of the solution.",
    3: "You have to move this term to the other side by dividing it, not by multiplying it.",
    4: "You changed the sign when multiplying to the other side. You need to divide without changing the sign.",
    5: "You need to move this term to the other side by dividing it, not by adding/subtracting it.",
    6: "You have to change the sign of these terms when moving them to the other side by adding or subtracting.",
    7: "You miscalculated the addition of these terms. Revise you haven't forgotten or added something by mistake. Revise you changed the sign to an element if you moved it to the other side of the equation. If you did multiple calculations from step to step, consider doing just one for me to be able to better assist you.",
    8: "You eliminated the parentheses of the distributive without distributing the coefficient. You have to multiply by each element inside the parentheses.",
    9: "You only multiplied some of the terms inside the distributive.",
    10: "The coefficient has a sign, you need to multiply the coefficient with its sign by all elements inside the parentheses.",
    11: "You miscalculated some of the multiplications you performed in the distributive.",
    12: "You need to compute the common denominator, not simply add the numerators and the denominators together.",
    13: "This is not the correct common denominator. The procedure in the numerator is mostly correct.",
    14: "You calculated the correct common denominator, but you didn't change the numerators accordingly. You need to multiply them by the appropriate factor.",
    15: "You simplified the common denominator, but you need it to be on both sides in order to be able to do this, not just one.",
    16: "You can't multiply a denominator to the other side of the equation if it is not dividing all the terms in the original side.",
    17: "You need to be careful when simplifying the common denominator. In this case, there is a negative sign in front of the fraction that you need to distribute in the numerator when simplifying the common denominator.",
    18: "You miscalculated the numerator in this step. Remember to multiply the whole numerator by the appropriate factor and check you haven't made some calculation mistake when computing the multiplications.",
    19: "There is a mistake in the faction reduction. The first fraction is not equivalent to the second fraction."
  }
  return errorFeedbacks[errorNumber];
}

export default errorToFeedback;