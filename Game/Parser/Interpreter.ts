import { SyntaxNode, ValueNode, ErrorNode } from "./SyntaxNode";
import { parserLog } from "./Logger";
import { SyntaxType } from "./SyntaxType";
import { ParserFuncTags, ParserCondTags } from "./ParserTags";

class InterpreterTracker {
    private stack: string[] = [];
    private indent = 0;

    private convertToStr(value: any, indent: number = 0): string {
        if (value === InterpretFailed) {
            return "Interpret Failed";
        }
        else if (Array.isArray(value)) {
            return value.map((item) => this.convertToStr(item)).join(', ');
        }
        else if (typeof value === 'object' && value.toString === Object.prototype.toString) {
            return Object.keys(value).map((key) => key + ': ' + (typeof value[key] === 'object' ? '\n' + '  '.repeat(indent + 1) : '') + this.convertToStr(value[key], indent + 1)).join('\n');
        }
        else if (typeof value === 'function') {
            return value.name;
        }
        else
            return value;
    }

    public traverse(node: SyntaxNode): any {
        this.indent++;

        const indentStr = '  '.repeat(this.indent);

        this.stack.push(indentStr + '> ' + node.type);

        const value = postorder.call(undefined, this, node);

        this.stack.push(indentStr + '< ' + node.type + ': ' + this.convertToStr(value));

        this.indent--;

        return value;
    }

    public getStackTrace(): string {
        return this.stack.reduce((prev, next, index, arr) => prev + next + (index !== arr.length - 1 ? '\n' : ''), "");
    }
}

const InterpretFailed = { toString: () => "" };

export function Interpret(node: SyntaxNode): string {
    if (node === undefined) return 'Error: Interpreted Nothing';

    const tracker = new InterpreterTracker();

    let resultText = tracker.traverse(node);
    if (resultText === InterpretFailed)
        resultText = '';
    if (typeof resultText === 'function')
        resultText = resultText.name;
    if (resultText === undefined)
        resultText = '';
    if (typeof resultText === 'object')
        resultText = JSON.stringify(resultText);

    parserLog.debug(
        '---- Interpret ---\n' + tracker.getStackTrace() + '\n------------------\n' +
        '----- Result -----\n' + resultText + '\n------------------\n'
    );

    return resultText;
}

function postorder(tracker: InterpreterTracker, node: SyntaxNode) {
    let result;
    const results = [];
    if (!node) return;
    if (node.type !== SyntaxType.Args) {
        for (const child of node.children) {
            result = tracker.traverse(child);
            if (result !== undefined)
                results.push(result);
        }
    }
    return visit(tracker, node, results);
}

function visit(tracker: InterpreterTracker, node: SyntaxNode, values: any[]): any {
    const left = values[0];
    const right = values[1];
    switch (node.type) {
        case SyntaxType.Equal: { return left === right; }
        case SyntaxType.NotEqual: { return left !== right; }
        case SyntaxType.LessThan: { return left < right; }
        case SyntaxType.GreaterThan: { return left > right; }
        case SyntaxType.LessThanOrEqual: { return left <= right; }
        case SyntaxType.GreaterThanOrEqual: { return left >= right; }
        case SyntaxType.Combine: {
            return values.reduce((prev, curr) => {
                return curr === InterpretFailed ? prev : prev + curr;
            }, '');
        }
        case SyntaxType.Number: { return +((node as ValueNode).value); }
        case SyntaxType.String: { return (node as ValueNode).value; }
        case SyntaxType.TagIdentity: {
            return ParserFuncTags.get((node as ValueNode).value);
        }
        case SyntaxType.ConditionalTagIdentity: {
            return ParserCondTags.get((node as ValueNode).value);
        }
        case SyntaxType.ConditionalTagIdentity: { return (node as ValueNode).value; }
        case SyntaxType.Caller: {
            if (left === InterpretFailed) {
                return InterpretFailed;
            }
            else if (typeof left === 'function') {
                if (Array.isArray(right)) {
                    return left.apply(undefined, right.map((value) => typeof value === 'function' ? value() : value));
                }
                else if (typeof right === 'function')
                    return left.call(undefined, right());
                else return left.call(undefined, right);
            }
            else return left;
        }
        case SyntaxType.Args: {
            return node.children.map((child) => function memoryAccess() { return postorder(tracker, child); });
        }
        case SyntaxType.If: { return left && left !== InterpretFailed ? right : InterpretFailed; }
        case SyntaxType.Else: { return left && left !== InterpretFailed ? left : right; }
        case SyntaxType.Error: {
            parserLog.error((node as ErrorNode).reason);
            return '';
        }
        default: { }
    }
}
