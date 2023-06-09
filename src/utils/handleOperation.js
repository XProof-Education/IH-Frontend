const Algebrite = require('algebrite');

const convertLatexToText = (latex) => {
    // Input: latex step from mathpix
    // Output: step in algebrite valid format (@solveStep)
    const latexReplacements = [
      { regex: /\\frac{(.+?)}{(.+?)}/g, replacement: '($1)/($2)' },
      { regex: /\\cdot/g, replacement: '*' },
      { regex: /\\sqrt{(.+?)}/g, replacement: 'sqrt($1)' },
      { regex: /(.+?)\^{(.+?)}/g, replacement: '($1)^($2)' },
      { regex: /\\log_{(.+?)}{(.+?)}/g, replacement: 'log($2, $1)' },
      { regex: /\\ln{(.+?)}/g, replacement: 'log($1)' }
    ];
  
    let text = latex;
    for (const { regex, replacement } of latexReplacements) {
      text = text.replace(regex, replacement);
    }
  
    return text;
  }

const stepToLatex = (step) => {
    return step.map((side, sideIndex) => side.join('')).join('=');
}

const latexToStep = (equation) => {
    // Input: Operation step
    // Output: Operation step in step format. IMPORTANT --> Adds + sign to elems that have no sign (i.e. 3x=9 => +3x=+9)
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
    // Input: Regular step
    // Output: Set of elements of the step 
    return step.map(side => new Set(side));
}

const findAllOccurrences = (arr, val) => {
    // Input: Side of step & element to count
    // Output: Number of occurrences in side 
    return arr.filter((elem) => elem === val).length;
}

const stepToOccurrences = (step) => {
    // Input: Regular step
    // Output: Occurrences objects => [{occurrences left side}, {occurrences right side}] 
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
    // Input: Step1 & Step2
    // Output: Step1 coloured & Step2 coloured
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
  
    return [stepToLatex(coloredStep1), stepToLatex(coloredStep2)];
  }

const solveStep = (latexStep) => {
    // Input: latex step from mathpix
    // Output: Step solutions (Array if multiple). Works with imaginary numbers 
    const step = convertLatexToText(latexStep);
    const [leftSide, rightSide] = step.split('=');
    const leftSideParsed = Algebrite.run(leftSide).toString();
    const rightSideParsed = Algebrite.run(rightSide).toString();
  
    const equation = `${leftSideParsed} - (${rightSideParsed})`;

    try {
        const solution = Algebrite.roots(equation).toString();
        return solution;   
    } catch (error) {
        return null
    }
  }

const isEqualSolutions = (solutions1, solutions2) => {
    // Input: Array of solutions of step 1 & array of solutions of step 2
    // Output: Bool (are equal solutions) 
    if (typeof solutions1 != typeof solutions2) {
        return false;
    } else if (typeof solutions1 === 'string' && typeof solutions2 === 'string') {
        return solutions1 === solutions2
    } else {
        return solutions1.length === solutions2.length && solutions1.every((val) => solutions2.includes(val));
    }    
}

const findIncorrectStepsIdx = (operation) => {
    // Input: Operation array
    // Output: First incorrect step1 & step2 indexes 
    let step1Idx;
    let step2Idx;
    let prevSolutions = [];
    let solutions = [];
    for (let stepIdx = 0; stepIdx < operation.length; stepIdx++) {
        if (stepIdx === 0) {
            prevSolutions = solveStep(operation[stepIdx]);
        } else {
            solutions = solveStep(operation[stepIdx]);
            if (!isEqualSolutions(solutions, prevSolutions)) {
                step2Idx = stepIdx;
                step1Idx = stepIdx - 1;
                break;
            } else {
                prevSolutions = solutions;
            }
        }
    }
    if (step1Idx !== undefined && step2Idx !== undefined) {
        return {
            step1Idx,
            step2Idx
        }
    } else {
        return null;
    }
}

const handleOperation = (operation) => {
    // Input: Frontend operation array
    // Output: Assessment object {isCorrect, coloured operation, aiPrompt} 
    const incorrectStepsIdx = findIncorrectStepsIdx(operation);
    if (incorrectStepsIdx) {
        const { step1Idx, step2Idx } = incorrectStepsIdx;
        const operationSteps = operation.map(step => latexToStep(step));
        const colouredSteps = colorChangedElems(operationSteps[step1Idx], operationSteps[step2Idx]);
        const colouredOperation = operation.map((step, stepIdx) => {
            if (stepIdx === step1Idx) {
                return colouredSteps[0];
            } else if (stepIdx === step2Idx) {
                return colouredSteps[1];
            } else {
                return step;
            }
        });
        return {
            isCorrect: false,
            operation: colouredOperation,
            prompt: `step 1: ${operation[step1Idx]} & step 2: ${operation[step2Idx]}\n\n###\n\n` 
        }
    } else {
        return {
            isCorrect: true,
            operation: operation,
            prompt: null
        }
    }
}

export default handleOperation;

// Testing
// const steps = ['3 x+2-5 x=8 x+9', '3 x-5 x+8 x=9+2', '\\frac{3 x}{5}-\\frac{2+4 x}{3}=1', 'x=\\frac{3}{5}', '\\frac{2 x+3}{2}-\\frac{5 x+1}{2}=\\frac{4}{2}', '3x^2-15x=4(x+4)', 'x^2=-1'];
// steps.forEach(elem => console.log(solveStep(elem)));