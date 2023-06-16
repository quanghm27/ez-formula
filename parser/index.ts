import {TokenType} from "../types";
import {Token, TokenIterator} from "../class/Token";
import {ASTNode} from "../class/ASTNode";

/**
 * Parses a list of tokens into an AST
 * @param tokens
 * @returns {ASTNode} Returns an ASTNode
 * @example
 * parser([
 *    Token { type: 'formulaName', value: 'add' },
 *    Token { type: 'parameter', value: '1' },
 *    Token { type: 'comma', value: ',' },
 *    Token { type: 'parameter', value: '2' }
 * ])
 * // returns
 *    ASTNode {
 *      type: 'formula',
 *      value: 'add',
 *      params: [
 *          ASTNode {
 *              type: 'parameter',
 *              value: '1',
 *              params: []
 *           },
 *          ASTNode {
 *              type: 'parameter',
 *              value: '2',
 *              params: []
 *          }]
 *     }
 *
 */
export default function(tokens: Token[]): ASTNode {
    const tokenIterator = new TokenIterator(tokens);

    /**
     * The parseExpression function parses an expression.
     * An expression can be a formula name or a parameter.
     * @return An astnode object
     * @docauthor Trelent
     */
    function parseExpression(): ASTNode {

        // Get the next token
        const token = tokenIterator.next()

        // Check whether if the token is a formula name or a parameter
        if (token.type === TokenType.formulaName) {
            // Parse arguments of the formula
            const args = parseArguments();
            return new ASTNode('formula', token.value, args);
        } else if (token.type === TokenType.parameter) {
            return new ASTNode('number', token.value, []);
        } else {
            throw new Error(`Unexpected token type ${token.type}`);
        }
    }


    /**
     * The parseArguments function parses a list of arguments.
     * @return An array of ast nodes
     * @docauthor Trelent
     */
    function parseArguments(): ASTNode[] {

        const args = [];
        // start parsing arguments if the next token is an opening parenthesis
        if (tokenIterator.next().type === TokenType.openingParenthesis) {
            // parse arguments until the next token is a closing parenthesis
            while (tokenIterator.hasNext() && tokenIterator.peek().type !== TokenType.closingParenthesis) {
                // skip comma tokens
                if (tokenIterator.peek().type === TokenType.comma) {
                    tokenIterator.next();
                    continue
                }
                const arg = parseExpression();
                args.push(arg);
            }
            // skip closing parenthesis token
            if (tokenIterator.peek().type === TokenType.closingParenthesis) {
                tokenIterator.next();
            } else {
                // throw an error if the next token is not a closing parenthesis
                throw new Error('Expected closing parenthesis.');
            }
        }

        return args;
    }

    return parseExpression();
}
