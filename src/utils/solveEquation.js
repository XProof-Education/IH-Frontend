const nerdamer = require("nerdamer/all.min")

const latexToRegular = (expression) => {
    return nerdamer.convertFromLaTeX(expression).toString();
}

const regularToLatex = (expression) => {
    return nerdamer.convertToLaTeX(expression).toString();
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

export default function solveEquation(latexEquation) {
    // Input: Latex expression
    // Output: Array with equation's solutions
    const eq = latexToRegular(latexEquation);
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