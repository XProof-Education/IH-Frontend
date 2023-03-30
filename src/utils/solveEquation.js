const nerdamer = require("nerdamer/all.min")

const latexToEquation = (expression) => {
    return nerdamer.convertFromLaTeX(expression).toString();
}

const equationToLatex = (expression) => {
    return nerdamer.convertToLaTeX(expression).toString();
}

const latexToStep = (equation) => {
    const [leftSide, rightSide] = equation.split('=');

    // Function to split a side into an array of terms
    const splitTerms = (side) => {
        let terms = [];
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
            terms.push(currentTerm.slice(0, -1));
            currentTerm = char;
        }
        }

        terms.push(currentTerm);

        return terms.filter(term => term !== '');
    };

    // Split left and right sides into arrays of terms
    const leftTerms = splitTerms(leftSide);
    const rightTerms = splitTerms(rightSide);

    return [leftTerms, rightTerms];
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