import { TokenType } from '../types';
import { Token } from "../class/Token";
import * as FormulaSource from "../built-in"

/**
 * Parses a string into a list of tokens
 * @param inputString
 * @param referenceKey
 * @returns {Token[]} List of tokens
 * @example
 * lexer('add(1, 2)')
 * returns [
 *     Token { type: 'formulaName', value: 'add' },
 *     Token { type: 'parameter', value: '1' },
 *     Token { type: 'comma', value: ',' },
 *     Token { type: 'parameter', value: '2' }
 * ]
 */
export default function (inputString: string, referenceKey: string = "fields"): Token[] {
    const tokens: Token[] = [];
    let currentToken = "";
    // Create regex formula names
    const formulaSource = new RegExp(Object.keys(FormulaSource).map(s => s.toLowerCase()).join("|"))
    const reference = new RegExp(`.*${referenceKey}..*`);
    const comma = /,/;
    const openingParen = /\(/;
    const closingParen = /\)/;
    const number = /\d/;
    const whitespace = /\s/;

    for (const char of inputString) {
        if (/[a-zA-Z.]/.test(char)) {
            currentToken += char;
            if (formulaSource.test(currentToken)) {
                tokens.push(new Token(TokenType.formulaName, currentToken));
                currentToken = '';
            } else if (reference.test(currentToken.toLowerCase())) {
                tokens.push(new Token(TokenType.reference, currentToken));
                currentToken = '';
            }
        } else if (number.test(char)) {
            tokens.push(new Token(TokenType.parameter, char));
        } else if (comma.test(char)) {
            tokens.push(new Token(TokenType.comma, char));
        } else if (openingParen.test(char)) {
            tokens.push(new Token(TokenType.openingParenthesis, char));
        } else if (closingParen.test(char)) {
            tokens.push(new Token(TokenType.closingParenthesis, char));
        } else if (whitespace.test(char)) {
            // Ignore whitespace
            continue
        } else {
            throw new Error(`Unexpected token ${char}`);
        }
    }

    return tokens;
}




