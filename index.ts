import tokenizer from "./tokenizer/tokenizer";
import parser from "./parser/parser";
import evaluator from "./evaluator/evaluator";

function main() {
    const inputString = `add(2,4,5, multiply(1,2,3), divide(4,5,3))`;
    const tokens = tokenizer(inputString);
    const ast = parser(tokens);

    console.log(ast);
    console.log(evaluator(ast));
}

main()

