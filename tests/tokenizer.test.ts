// write test cases for the tokenizer
// Path: tests\tokenizer.test.ts
import tokenizer from "../tokenizer"
import { TokenType } from "../types";

const simpleFormula = 'add(1,2)';
const nestedFormula = 'add(1,add(2,3))';
const formulaWithWhiteSpace = 'add( 1 , 2 )';
const formulaWithInsuredFields = 'add(1,add(2, insuredFields.AGE))';
const formulaWithPolicyFields = 'add(1,add(2, policyFields.))';

// Write util function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

describe('tokenize', () => {
    it('should tokenize a simple formula', () => {
        const tokens = tokenizer(simpleFormula);
        expect(tokens).toEqual([
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '1' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.parameter, value: '2' },
            { type: TokenType.closingParenthesis, value: ')'}
        ]);
    });
    it('should tokenize a formula with a nested formula', () => {
        const tokens = tokenizer(nestedFormula);
        expect(tokens).toEqual([
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '1' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '2' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.parameter, value: '3' },
            { type: TokenType.closingParenthesis, value: ')'},
            { type: TokenType.closingParenthesis, value: ')'},
        ]);
    })
    it('should tokenize a formula with spaces', () => {
        const tokens = tokenizer(formulaWithWhiteSpace);
        expect(tokens).toEqual([
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '1' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.parameter, value: '2' },
            { type: TokenType.closingParenthesis, value: ')'}
        ]);
    })
    it('should tokenize a formula with insured fields', () => {
        const tokens = tokenizer(formulaWithInsuredFields);
        expect(tokens).toEqual([
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '1' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '2' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.reference, value: 'insuredFields.AGE' },
            { type: TokenType.closingParenthesis, value: ')'},
            { type: TokenType.closingParenthesis, value: ')'},
        ]);
    })
    it('should tokenize a formula with policy fields', () => {
        const tokens = tokenizer(formulaWithPolicyFields);
        expect(tokens).toEqual([
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '1' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.formulaName, value: 'add' },
            { type: TokenType.openingParenthesis, value: '('},
            { type: TokenType.parameter, value: '2' },
            { type: TokenType.comma, value: ',' },
            { type: TokenType.reference, value: 'policyFields.someField' },
            { type: TokenType.closingParenthesis, value: ')'},
            { type: TokenType.closingParenthesis, value: ')'},
        ]);
    })
});
