export declare class Value {
    static getDistinctItems(items: string[]): string[];
    static splitStringBySeperator(text: string, seperator?: string): string[];
    static extractValueSplitBySeparator(value: string, separator: string, index: number): string;
    static isNumber(value: any): boolean;
    static isNumberWithPattern(value: any, pattern: RegExp): boolean;
    static clearArray(value: any): any;
    static isArray(value: any): any;
    static isString(value: any): boolean;
    static isArrayWithItems(value: any): any;
    static isNullOrUndefined(value: any): any;
    static isNotNullOrUndefined(value: any): boolean;
    static isNotNullOrWhiteSpace(value: string): boolean;
    static isNullOrWhiteSpace(value: string): boolean;
    static isStringContains(source: string, toBeMatched: string, caseSensitive?: boolean): boolean;
    static isArrayContains(sourceList: string[], toBeMatched: string, caseSensitive?: boolean): boolean;
}
