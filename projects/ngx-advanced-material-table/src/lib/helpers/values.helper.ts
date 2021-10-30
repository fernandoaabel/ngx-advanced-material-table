export class Value {
    static getDistinctItems(items: string[]): string[] {
        const newArray: string[] = [];
        items.forEach((item) => {
            if (newArray.indexOf(item) === -1) {
                newArray.push(item);
            }
        });
        return newArray;
    }

    static splitStringBySeperator(text: string, seperator = ','): string[] {
        if (Value.isNullOrWhiteSpace(text)) {
            return [];
        }
        let strs = text.split(seperator);
        strs = strs.map((str) => str.trim());
        return strs.filter((str) => Value.isNotNullOrWhiteSpace(str));
    }

    static extractValueSplitBySeparator(value: string, separator: string, index: number): string {
        return value.indexOf(separator) > -1 ? value.split('_')[index] : '';
    }

    static isNumber(value: any): boolean {
        if (Value.isNotNullOrUndefined(value) && /^\d+(\.\d+)?$/.test(value.toString())) {
            return true;
        }
        return false;
    }

    static isNumberWithPattern(value: any, pattern: RegExp): boolean {
        if (Value.isNotNullOrUndefined(value) && pattern.test(value.toString())) {
            return true;
        }
        return false;
    }

    static clearArray(value: any): any {
        if (Value.isArray(value)) {
            value.splice(0, value.length);
        }
    }

    static isArray(value: any): any {
        if (Value.isNotNullOrUndefined(value) && value instanceof Array) {
            return true;
        }
        return false;
    }

    static isString(value: any): boolean {
        if (typeof value === 'string') {
            return true;
        }
        return false;
    }

    static isArrayWithItems(value: any): any {
        if (Value.isArray(value) && value.length > 0) {
            return true;
        }
        return false;
    }

    static isNullOrUndefined(value: any): any {
        return !Value.isNotNullOrUndefined(value);
    }

    static isNotNullOrUndefined(value: any): boolean {
        if (value !== undefined && value !== null) {
            return true;
        }
        return false;
    }

    static isNotNullOrWhiteSpace(value: string): boolean {
        if (Value.isNotNullOrUndefined(value) && value.trim() !== '') {
            return true;
        }
        return false;
    }

    static isNullOrWhiteSpace(value: string): boolean {
        return !Value.isNotNullOrWhiteSpace(value);
    }

    static isStringContains(source: string, toBeMatched: string, caseSensitive = true): boolean {
        if (!source || !toBeMatched) {
            return false;
        }
        if (caseSensitive) {
            if (source.indexOf(toBeMatched) !== -1) {
                return true;
            }
            return false;
        } else {
            if (source.toLocaleLowerCase().indexOf(toBeMatched.toLocaleLowerCase()) !== -1) {
                return true;
            }
            return false;
        }
    }

    static isArrayContains(sourceList: string[], toBeMatched: string, caseSensitive = true): boolean {
        if (!sourceList || !toBeMatched) {
            return false;
        }

        for (const source of sourceList) {
            if (caseSensitive) {
                if (source.indexOf(toBeMatched) !== -1) {
                    return true;
                }
            } else {
                if (source.toLocaleLowerCase().indexOf(toBeMatched.toLocaleLowerCase()) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
}
