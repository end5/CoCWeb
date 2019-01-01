import { TokenType } from './TokenTypes';

export const TokenSymbol: { [x: string]: any } = {
    [TokenType.Escape]: '\\',
    [TokenType.BracketOpen]: '[',
    [TokenType.BracketClose]: ']',
    [TokenType.ParenthesisOpen]: '(',
    [TokenType.ParenthesisClose]: ')',
    [TokenType.Equal]: '==',
    [TokenType.SingleEqual]: '=',
    [TokenType.NotEqual]: '!=',
    [TokenType.LessThanOrEqual]: '<=',
    [TokenType.LessThan]: '<',
    [TokenType.GreaterThanOrEqual]: '>=',
    [TokenType.GreaterThan]: '>',
    [TokenType.If]: 'if',
    [TokenType.Bar]: '|',
    [TokenType.String]: 'string',
};
