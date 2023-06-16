import {ASTNodeType} from "../types";

export class ASTNode {
    type: ASTNodeType;
    value: string;
    params: ASTNode[];
    constructor(type: ASTNodeType, value: string, params: ASTNode[]) {
        this.type = type;
        this.value = value;
        this.params = params;
    }

    toString(): string {
        return `${this.value}(${this.params.map(arg => arg.toString()).join(', ')})`;
    }
}
