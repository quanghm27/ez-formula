import * as Formula from "../built-in";
import {ASTNode} from "../class/ASTNode";

const array = Object.keys(Formula)

/**
 * Evaluates an AST of formulas
 *
 * @param ast
 * @returns {number} The result of the formula
 * @example
 * evaluate(parse('add(1, 2)'))
 * // => 3
 * evaluate(parse('add(1, multiply(2, 3))'))
 * // => 7
 */
function evaluate (ast: ASTNode): number {
    if (ast.type === 'number') {
        return Number(ast.value);
    }
    if (ast.type === 'formula') {
        switch (ast.value) {
            case 'add':
                return Formula.ADD(...ast.params.map(arg => evaluate(arg)));
            case 'subtract':
                return Formula.SUBTRACT(...ast.params.map(arg => evaluate(arg)));
            case 'multiply':
                return Formula.MULTIPLY(...ast.params.map(arg => evaluate(arg)));
            case 'divide':
                return Formula.DIVISION(...ast.params.map(arg => evaluate(arg)));
            default:
                throw new Error(`Unknown formula ${ast.value}`);
        }
    }
}
export default evaluate;
