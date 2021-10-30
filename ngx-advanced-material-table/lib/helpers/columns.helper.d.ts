import { IColumnDefinition } from '../interfaces/column-definition.interface';
export declare class ColumnHelper {
    static getContent<T>(field: string, element: T): string;
    static getToolTip<T>(column: IColumnDefinition, element: T): string;
    static isImmutableColumn(column: IColumnDefinition): boolean;
    static canColumnBeHidden(column: IColumnDefinition): boolean;
    static canColumnBeMoved(column: IColumnDefinition): boolean;
    static canColumnBeFiltered(column: IColumnDefinition): boolean;
    static isFilteringEnabledOnColumn(column: IColumnDefinition): boolean;
    static hasFiltersOrSortingEnabled(column: IColumnDefinition): boolean;
    static isCellClickable(column: IColumnDefinition): boolean;
}
//# sourceMappingURL=columns.helper.d.ts.map