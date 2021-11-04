import { DialogActionType } from './enums/dialog-action.enum';

export type ColumnValueType = string | number | Date;

export enum ColumnType {
    String,
    DateTime,
    Date,
    Time,
    Actions,
    DropDown,
    Icon,
    NumberInput,
    DropDownDynamic,
    Image,
    Link,
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
