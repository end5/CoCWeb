import { SyntaxType } from "./SyntaxType";

export class SyntaxNode {
    public children: SyntaxNode[] = [];
    public constructor(public readonly type: SyntaxType, left?: SyntaxNode, right?: SyntaxNode) {
        if (left !== undefined)
            this.left = left;
        if (right !== undefined)
            this.right = right;
    }
    public get left(): SyntaxNode {
        return this.children[0];
    }
    public set left(node: SyntaxNode) {
        this.children[0] = node;
    }
    public get right(): SyntaxNode {
        return this.children[1];
    }
    public set right(node: SyntaxNode) {
        this.children[1] = node;
    }
    public toString(indent: number = 0): string {
        const text = this.type + this.children.reduce((prev, next) => prev + '\n' + '  '.repeat(indent + 1) + (next ? next.toString(indent + 1) : 'undefined'), '');
        return text;
    }
}

export class ValueNode extends SyntaxNode {
    public constructor(public readonly type: SyntaxType, public readonly value: string, public readonly silentFail?: boolean) { super(type); }
    public toString(indent: number = 0): string {
        return '"' + (this.value === '\n' ? '\\n' : this.value) + '" : ' + super.toString(indent);
    }
}

export class ErrorNode extends SyntaxNode {
    public constructor(public readonly reason: string) { super(SyntaxType.Error); }
}
