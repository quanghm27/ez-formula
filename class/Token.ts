import {TokenType} from "../types";

export class Token {
    constructor(public type: TokenType, public value: string) {}
}
export class TokenIterator {
    private index: number;

    constructor(private tokens: Token[]) {
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index < this.tokens.length;
    }

    next(): Token {
        if (this.hasNext()) {
            const token = this.tokens[this.index];
            this.index++;
            return token;
        }
        throw new Error('No more tokens in the iterator.');
    }

    peek(): Token {
        if (this.hasNext()) {
            return this.tokens[this.index];
        }
        throw new Error('No more tokens in the iterator.');
    }
}
