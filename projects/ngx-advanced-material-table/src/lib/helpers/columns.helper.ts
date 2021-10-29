import { ColumnType, IColumnDefinition } from '../interfaces/column-definition.interface';

export class ColumnHelper {
    static getContent<T>(field: string, element: T): string {
        if (field.indexOf('.') === -1) {
            return element[field];
        }

        // Activate the way to get text from  Class.Element.XX.XX.XX
        const fieldNames = field.split('.');

        let returnValue = element[fieldNames[0]];
        for (let index = 1; index < fieldNames.length; index++) {
            returnValue = returnValue[fieldNames[index]];
        }

        return returnValue ?? '';
    }

    static getToolTip<T>(column: IColumnDefinition, element: T) {
        if (!element || !column || !element[column.Field]) {
            return '';
        }

        let val: string;
        switch (column.ColumnType) {
            case ColumnType.Date:
            case ColumnType.DateTime:
            case ColumnType.Time:
            case ColumnType.Icon:
            case ColumnType.DropDown:
            case ColumnType.String:
            case ColumnType.Link:
            case ColumnType.Image:
                val = element[column.Field];
                break;

            default:
                val = '';
                break;
        }
        return val;
    }

    static isImmutableColumn(column: IColumnDefinition): boolean {
        // Columns types that cannot be hidden, moved or filtered
        return column.ColumnType === ColumnType.Actions || column.ColumnType === ColumnType.Icon;
    }

    static canColumnBeHidden(column: IColumnDefinition): boolean {
        return !this.isImmutableColumn(column);
    }

    static canColumnBeMoved(column: IColumnDefinition): boolean {
        return !this.isImmutableColumn(column);
    }

    static canColumnBeFiltered(column: IColumnDefinition): boolean {
        return !this.isImmutableColumn(column);
    }

    static isFilteringEnabledOnColumn(column: IColumnDefinition): boolean {
        if (!this.canColumnBeFiltered(column)) {
            return false;
        }

        if (!column.Title) {
            return false;
        }

        return true;
    }

    static hasFiltersOrSortingEnabled(column: IColumnDefinition): boolean {
        if (!column) {
            return false;
        }

        if (column.SortDirection) {
            return true;
        }

        if (column.FilterValues && column.FilterValues.length > 0) {
            return true;
        }

        return false;
    }

    static isCellClickable(column: IColumnDefinition): boolean {
        switch (column.ColumnType) {
            case ColumnType.Actions:
            case ColumnType.Icon:
            case ColumnType.DropDown:
            case ColumnType.NumberInput:
            case ColumnType.DropDownDynamic:
                return false;
            default:
                return true;
        }
    }
}
