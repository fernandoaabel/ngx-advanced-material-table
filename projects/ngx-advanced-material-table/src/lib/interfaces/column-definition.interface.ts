import { DialogActionType } from './dialog-action.interface';

export enum SortDirectionEnum {
    None = '',
    Ascending = 'asc',
    Descending = 'desc',
}

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
    CatalogueSelect,
    Image,
}

export interface IColumnDefinitionBase {
    Field: string;
    Title: string;
    Display: boolean;
    SortDirection?: 'asc' | 'desc';
}

export interface IColumnDefinition extends IColumnDefinitionBase {
    I18nId: string;
    ColumnType: ColumnType;
    MatIconName?: string;
    IdField?: string;
    DayOffset?: number;
    FilterValues?: ColumnValueType[];
    NumberInputOptions?: {
        MinInputNumber?: number;
        MaxInputNumber?: number;
        MinInputNumberField?: string;
        MaxInputNumberField?: string;
    };

    /**
     * Selected Field Value
     */
    SelectedField?: IAdvanceRowDynamicDropDown;

    /**
     * Add another Field's value as a Suffix for the current field
     */
    Suffix?: {
        Field: string;
    };
    HyperLink?: boolean;
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
export interface IFilterOSMColumnsData {
    selectedColumn: IColumnDefinition;
    distinctData: IDistinctColumns[];
}

export interface IAdvancedRowMenu {
    Id: string;
    Icon: string;
    Action: number;
    Text: string;
    I18nId: string;
}

export interface IAdvancedRowDropDown {
    Id: string;
    Text: string;
    Value: any;
    RowField: string;
    I18nId: string;
}

export interface IAdvanceRowDynamicDropDown {
    TextField: string;
    SelectField: string;
    ValueField: string;
}
