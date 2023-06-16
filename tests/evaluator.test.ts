// Write test for the evaluator
// Path: tests\evaluator.test.ts
import evaluator from "../evaluator";
import parser from "../parser";
import tokenizer from "../tokenizer";

const simpleFormula = 'add(1,2)';                     // equals 3
const nestedFormula = 'add(1,multiply(2,3))'; // equals 7

describe('evaluator', () => {
    it('should evaluate a simple formula', () => {
        const tokens = tokenizer(simpleFormula);
        const ast = parser(tokens);
        const result = evaluator(ast);
        expect(result).toEqual(3);
    })
    it('should evaluate a formula with a nested formula', () => {
        const tokens = tokenizer(nestedFormula);
        const ast = parser(tokens);
        const result = evaluator(ast);
        expect(result).toEqual(7);
    })
})
