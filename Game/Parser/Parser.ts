import { SyntaxNode, ValueNode, ErrorNode } from "./SyntaxNode";
import { Token, ErrorToken } from "./Token";
import { TokenStream } from "./TokenStream";
import { ParserTracker } from "./ParserTracker";
import { TokenType } from "./TokenTypes";
import { SyntaxType } from "./SyntaxType";
import { parserLog } from "./Logger";

const SyntaxErr = new SyntaxNode(SyntaxType.Error);

const OperatorMap: { [x: string]: any } = {
    [TokenType.Equal]: { priority: 0, syntaxType: SyntaxType.Equal },
    [TokenType.SingleEqual]: { priority: 0, syntaxType: SyntaxType.Equal },
    [TokenType.NotEqual]: { priority: 0, syntaxType: SyntaxType.NotEqual },
    [TokenType.LessThanOrEqual]: { priority: 0, syntaxType: SyntaxType.LessThanOrEqual },
    [TokenType.LessThan]: { priority: 0, syntaxType: SyntaxType.LessThan },
    [TokenType.GreaterThanOrEqual]: { priority: 0, syntaxType: SyntaxType.GreaterThanOrEqual },
    [TokenType.GreaterThan]: { priority: 0, syntaxType: SyntaxType.GreaterThan },
};
const Operators = Object.keys(OperatorMap);

export class Parser {
    private stream!: TokenStream;
    private tracker!: ParserTracker<SyntaxNode>;

    public parse(tokenList: Token[]): SyntaxNode {
        if (tokenList === undefined || tokenList.length <= 0) return new ValueNode(SyntaxType.String, '');

        this.stream = new TokenStream(tokenList);
        this.tracker = new ParserTracker(this.stream, SyntaxErr);

        if (this.stream.current.type === TokenType.Error) {
            const errToken = this.stream.current as ErrorToken;
            return new ErrorNode(errToken.reason + ' \'' + errToken.text + '\' ' + '@ Pos ' + errToken.start);
        }

        let result = this.tracker.call(this, this.text);
        if (result === SyntaxErr) {
            result = this.tracker.getResult();
            parserLog.error(this.tracker.toString());
        }
        parserLog.debug('----- Parser -----\n' + this.tracker.getStackTrace() + '\n------------------\n');
        parserLog.debug('-----  AST   -----\n' + result + '\n------------------\n');

        return result;
    }

    private text(): SyntaxNode {
        let nextNode: SyntaxNode | undefined;
        const combineNode = new SyntaxNode(SyntaxType.Combine);

        while (!this.stream.eos()) {
            if (nextNode) {
                combineNode.children.push(nextNode);
                nextNode = undefined;
            }

            nextNode = this.tracker.call(this, this.string);
            if (nextNode !== SyntaxErr) continue;

            nextNode = this.tracker.call(this, this.codeBlock);
            if (nextNode !== SyntaxErr) continue;

            return SyntaxErr;
        }

        if (nextNode && nextNode !== SyntaxErr)
            combineNode.children.push(nextNode);

        if (nextNode && combineNode.children.length === 0) return nextNode;
        else if (combineNode.children.length === 0) return SyntaxErr;
        else if (combineNode.children.length === 1) return combineNode.left;
        else return combineNode;
    }

    private codeBlock(): SyntaxNode {
        let nextNode: SyntaxNode | undefined;

        if (!this.tracker.expect(TokenType.BracketOpen)) return SyntaxErr;
        this.stream.pos++;

        nextNode = this.tracker.call(this, this.shallow);
        if (nextNode === SyntaxErr) return SyntaxErr;

        if (!this.tracker.expect(TokenType.BracketClose)) return SyntaxErr;
        this.stream.pos++;

        return nextNode;
    }

    private shallow(): SyntaxNode {
        let nextNode: SyntaxNode | undefined;

        nextNode = this.tracker.call(this, this.ifStatement);

        if (nextNode === SyntaxErr)
            nextNode = this.tracker.call(this, this.lookup);

        if (nextNode === SyntaxErr) return SyntaxErr;

        return nextNode;
    }

    private ifStatement(): SyntaxNode {
        if (!this.tracker.expect(TokenType.If)) return SyntaxErr;
        this.stream.pos++;

        if (!this.tracker.expect(TokenType.ParenthesisOpen)) return SyntaxErr;
        this.stream.pos++;

        const condNode = this.tracker.call(this, this.conditional);
        if (condNode === SyntaxErr) return SyntaxErr;

        if (!this.tracker.expect(TokenType.ParenthesisClose)) return SyntaxErr;
        this.stream.pos++;

        const leftString = this.tracker.call(this, this.string);
        if (leftString === SyntaxErr) return SyntaxErr;

        const ifNode = new SyntaxNode(SyntaxType.If, condNode, leftString);
        if (this.tracker.expect(TokenType.Bar)) {
            this.stream.pos++;

            const rightString = this.tracker.call(this, this.string);
            if (rightString === SyntaxErr) return SyntaxErr;

            return new SyntaxNode(SyntaxType.Else, ifNode, rightString);
        }
        return ifNode;
    }

    private conditional(): SyntaxNode {
        const leftNode = this.tracker.call(this, this.value);
        if (leftNode === SyntaxErr) return SyntaxErr;

        let opNode: SyntaxNode | undefined;
        for (const type of Operators) {
            if (this.tracker.expect(type as TokenType)) {
                opNode = new SyntaxNode(OperatorMap[type].syntaxType);
                this.stream.pos++;
                break;
            }
        }
        if (opNode === undefined) return SyntaxErr;
        opNode.left = leftNode;

        const rightNode = this.tracker.call(this, this.value);
        if (rightNode === SyntaxErr) return SyntaxErr;
        opNode.right = rightNode;

        return opNode;
    }

    private value(): SyntaxNode {
        let newNode;

        if (this.tracker.expect(TokenType.Number)) {
            newNode = new ValueNode(SyntaxType.Number, this.stream.current.text);
            this.stream.pos++;
            return newNode;
        }
        else if (this.tracker.expect(TokenType.Identity)) {
            newNode = new ValueNode(SyntaxType.ConditionalTagIdentity, this.stream.current.text);
            this.stream.pos++;
            return newNode;
        }

        return SyntaxErr;
    }

    private lookup(): SyntaxNode {
        if (!this.tracker.expect(TokenType.Identity)) return SyntaxErr;
        const identityNode = new ValueNode(SyntaxType.TagIdentity, this.stream.current.text);
        this.stream.pos++;

        const argsNode = new SyntaxNode(SyntaxType.Args);
        let newNode: SyntaxNode;
        do {
            newNode = this.tracker.call(this, this.string);
            if (newNode === SyntaxErr && this.tracker.expect(TokenType.Number)) {
                newNode = new ValueNode(SyntaxType.Number, this.stream.current.text);
                this.stream.pos++;
            }

            if (newNode === SyntaxErr)
                newNode = this.tracker.call(this, this.codeBlock);

            if (newNode === SyntaxErr) break;

            argsNode.children.push(newNode);
        } while (newNode !== undefined);

        return new SyntaxNode(SyntaxType.Caller, identityNode, argsNode);
    }

    private string(): SyntaxNode {
        let value = '';

        if (this.tracker.expect(TokenType.Escape)) {
            this.stream.pos++;

            if (!this.tracker.expect(TokenType.String)) return SyntaxErr;
            value = this.stream.current.text;
            this.stream.pos++;
        }
        else if (this.tracker.expect(TokenType.String)) {
            value = this.stream.current.text;
            this.stream.pos++;
        }
        else return SyntaxErr;

        return new ValueNode(SyntaxType.String, value);
    }
}
