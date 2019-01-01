import { Token } from './Token';

export class TokenStream {
    private tokens: Token[];
    public pos: number;
    public constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.pos = 0;
    }

    public get current(): Token {
        return this.tokens[this.pos];
    }

    public at(index: number): Token {
        return this.tokens[index];
    }

    public eos(): boolean {
        return this.pos >= this.tokens.length;
    }

    public consume(type: string): string {
        if (!this.eos() && this.tokens[this.pos].type === type)
            return this.tokens[this.pos++].text;
        return "";
    }
}
