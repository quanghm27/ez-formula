// Write test cases for the parser
// Path: tests\parser.test.ts
import parser from "../parser";
import { TokenType } from "../types";
import tokenizer from "../tokenizer";

const simpleFormula = 'add(1,2)';
const nestedFormula = 'add(1,add(2,3))';

describe('parser', () => {
    it('should parse a simple formula', () => {
        const tokens = tokenizer(simpleFormula);
        const ast = parser(tokens);
        expect(ast).toEqual({
            type: 'formula',
            value: 'add',
            params: [
                { type: 'number', value: '1', params: [] },
                { type: 'number', value: '2', params: [] }
            ]
        })
    })
    it('should parse a formula with a nested formula', () => {
        const tokens = tokenizer(nestedFormula);
        const ast = parser(tokens);
        expect(ast).toEqual({
            type: 'formula',
            value: 'add',
            params: [
                { type: 'number', value: '1', params: [] },
                { type: 'formula', value: 'add', params: [
                    { type: 'number', value: '2', params: [] },
                    { type: 'number', value: '3', params: [] }
                ]}
            ]
        })
    })
})
