import { TokenType } from 'Content/Parser/TokenTypes';

export const HighlightSymbol: { [x: string]: string } = {
    [TokenType.Number]: 'number',
    [TokenType.Identity]: 'variable',
    [TokenType.Escape]: 'operator',
    [TokenType.BracketOpen]: 'bracket',
    [TokenType.BracketClose]: 'bracket',
    [TokenType.ParenthesisOpen]: 'bracket',
    [TokenType.ParenthesisClose]: 'bracket',
    [TokenType.Equal]: 'operator',
    [TokenType.SingleEqual]: 'operator',
    [TokenType.NotEqual]: 'operator',
    [TokenType.LessThanOrEqual]: 'operator',
    [TokenType.LessThan]: 'operator',
    [TokenType.GreaterThanOrEqual]: 'operator',
    [TokenType.GreaterThan]: 'operator',
    [TokenType.Whitespace]: 'whitespace',
    [TokenType.If]: 'keyword',
    [TokenType.String]: 'string',
    [TokenType.Bar]: 'operator',
    [TokenType.Error]: 'error',
};
