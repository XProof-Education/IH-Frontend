const nerdamer = require("nerdamer/all.min")

const latexToEquation = (expression) => {
    return nerdamer.convertFromLaTeX(expression).toString();
}

const equationToLatex = (expression) => {
    return nerdamer.convertToLaTeX(expression).toString();
}

const latexToStep = (equation) => {
    // Input: Latex equation
    // Output: Equation in step format. IMPORTANT --> Adds + sign to elems that have no sign (i.e. 3x=9 => +3x=+9)
    const [leftSide, rightSide] = equation.split('=');

    // Function to split a side into an array of terms
    const splitTerms = (side) => {
        const nonPositiveChars = ['-', '(', '\\', '+'];
        let termsRaw = [];
        let currentTerm = '';
        let depth = 0;
        let inFraction = false;

        for (const char of side) {
            if (char === '(') {
                depth++;
            } else if (char === ')') {
                depth--;
            } else if (char === '\\' && side.slice(side.indexOf(char)).startsWith('\\frac{')) {
                inFraction = true;
            } else if (inFraction && char === '}') {
                inFraction = false;
            }

            currentTerm += char;

            if ((char === '+' || char === '-') && depth === 0 && !inFraction && currentTerm.length > 1) {
                termsRaw.push(currentTerm.slice(0, -1));
                currentTerm = char;
            }
        }
        if (!nonPositiveChars.includes(currentTerm[0])) {
            currentTerm = '+' + currentTerm;
        }

        termsRaw.push(currentTerm);
        // Add + sign to elems that did not have it 
        const terms = termsRaw.map(elem => nonPositiveChars.includes(elem[0]) ? elem : '+' + elem);

        return terms.filter(term => term !== '');
    };

    // Split left and right sides into arrays of terms
    const leftTerms = splitTerms(leftSide);
    const rightTerms = splitTerms(rightSide);

    return [leftTerms, rightTerms];
}

const stepToElemsUnique = (step) => {
    return step.map(side => new Set(side));
}

const findAllOccurrences = (arr, val) => {
    return arr.filter((elem) => elem === val).length;
}

const stepToOccurrences = (step) => {
    const stepUniques = stepToElemsUnique(step);
    return stepUniques.map((side, sideIdx) => {
        let sideOccurrences = {};
        for (let elem of side) {
            sideOccurrences[elem] = findAllOccurrences(step[sideIdx], elem);
        }
        return sideOccurrences;
    });
}

const colorChangedElems = (step1, step2, color = 'red') => {
    let step1Occurrences = stepToOccurrences(step1);
    let step2Occurrences = stepToOccurrences(step2);

    const coloredStep1 = step1.map((side, sideIndex) => {
        return side.map((term, termIndex) => {
            if (!step2[sideIndex].includes(term)) {
                return `\\textcolor{${color}}{${term}}`;
            } else if (step1Occurrences[sideIndex][term] !== step2Occurrences[sideIndex][term] && (step1Occurrences[sideIndex][term] === 0 || step2Occurrences[sideIndex][term] === 0 )) {
                return `\\textcolor{${color}}{${term}}`;
            }
            step1Occurrences[term] -= 1;
            step2Occurrences[term] -= 1;
            return term;
        });
    });

    step1Occurrences = stepToOccurrences(step1);
    step2Occurrences = stepToOccurrences(step2);
  
    const coloredStep2 = step2.map((side, sideIndex) => {
      return side.map((term, termIndex) => {
        if (!step1[sideIndex].includes(term)) {
          return `\\textcolor{${color}}{${term}}`;
        } else if (step1Occurrences[sideIndex][term] !== step2Occurrences[sideIndex][term] && (step1Occurrences[sideIndex][term] === 0 || step2Occurrences[sideIndex][term] === 0 )) {
            return `\\textcolor{${color}}{${term}}`;
        }
        step1Occurrences[sideIndex][term]--;
        step2Occurrences[sideIndex][term]--;
        return term;
      });
    });
  
    return [coloredStep1, coloredStep2];
  }

const extractVariables = (expression) => {
    // Match all single-letter alphabetical characters that are not preceded or followed by another letter
    const variableRegex = /(?<![a-zA-Z])[a-zA-Z](?![a-zA-Z])/g; 
    const variableMatches = expression.match(variableRegex);
    if (variableMatches) {
        // Convert matches to a set to remove duplicates, then convert back to an array
        const variableSymbols = [...new Set(variableMatches)]; 
        // Return array of variable symbols
        return variableSymbols; 
    }
    return null;
}

const solveEquation = (latexEquation) => {
    // Input: Latex expression
    // Output: Array with equation's solutions
    const eq = latexToEquation(latexEquation);
    console.log('Equation: ',eq)
    const variables = extractVariables(eq);
    if (variables.length > 1) {
        return undefined;
    }
    const solutions = nerdamer.solve(eq, variables[0]).toString();
    if (solutions) {
        return solutions;
    }
    return null;
}

// For testing
// console.log(latexToStep('2x - 3y + 4 = 5x + 6y - 7'));
// console.log(latexToStep('\\frac{-10}{11}-\\frac{-1}{11}=-\\frac{x-7 \\cdot (5+5 x)}{11}+\\frac{2}{11}-\\frac{-4}{11}'));
// console.log(latexToStep('-9 x-3 x+9+10=-\\frac{-10(-7 x-7+3+8 x)-7 x}{21}-\\frac{-8 \\cdot (3-6 x)+7 \\cdot (x-7)-8 x}{2}+\\frac{5 x-1}{2}-\\frac{-x-3 x}{2}-\\frac{-8 x-10}{10}'));
// console.log(latexToStep('3(x^{\\frac{2}{3}}-5)=7-3 x+5 \\cdot (4 x-1)'));

// const out = stepToOccurrences([ [ '+2x', '\\textcolor{red}{-21}', '+2x' ], [ '+5' ] ]);
// console.log(out)

const eq1= '6 x-9+\\frac{-1 x+1}{5}-2 x+7 x+9 x+\\frac{x-2 x+2}{6}=1+4';
const eq2 = '\\frac{6 x-9-1 x+1-2 x+7 x+9 x+x-2 x+2}{11}=1+4';
const step1 = latexToStep(eq1);
const step2 = latexToStep(eq2);
console.log(colorChangedElems(step1,step2))