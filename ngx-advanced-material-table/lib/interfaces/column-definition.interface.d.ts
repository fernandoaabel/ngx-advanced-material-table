import { DialogActionType } from './enums/dialog-action.enum';
export declare type ColumnValueType = string | number | Date;
export declare enum ColumnType {
    String = 0,
    DateTime = 1,
    Date = 2,
    Time = 3,
    Actions = 4,
    DropDown = 5,
    Icon = 6,
    NumberInput = 7,
    DropDownDynamic = 8,
    Image = 9,
    Link = 10
}
/**
 * IColumnDefinitionBase used to
 */
export interface IColumnDefinitionBase {
    Field: string;
    Title: string;
    Display: boolean;
    SortDirection?: 'asc' | 'desc';
}
export interface IColumnDefinition extends IColumnDefinitionBase {
    ColumnType: ColumnType;
    MatIconName?: string;
    IdField?: string;
    FilterValues?: ColumnValueType[];
    NumberInputOptions?: {
        MinInputNumber?: number;
        MaxInputNumber?: number;
        MinInputNumberField?: string;
        MaxInputNumberField?: string;
    };
    /**
     * Add another Field's value as a Suffix for the current field
     */
    Suffix?: {
        Field: string;
    };
}
export interface IAdvancedRowMenu {
    Id: string;
    Icon: string;
    Action: number;
    Text: string;
    I18nId: string;
}
export interface IDistinctColumns {
    name: ColumnValueType;
    displayedName: ColumnValueType;
    checked: boolean;
}
export interface IFilterColumnsResponse {
    action: DialogActionType;
    sortingHasChanged?: boolean;
    selectedColumn?: IColumnDefinition;
}
export interface IFilterColumnsData {
    selectedColumn: IColumnDefinition;
    distinctData: IDistinctColumns[];
}
