import { Component, OnInit } from '@angular/core';
import { TableRow } from './property-table/property-table.component';

@Component({
    selector: 'app-getting-started',
    templateUrl: './getting-started.component.html',
    styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent implements OnInit {
    inputTable: TableRow[] = [
        {
            Name: 'data: T[]',
            Description: 'Data as an <code>Array</code> to be displayed on the table.',
            Input: 'data',
        },
        {
            Name: 'tableConfiguration: ITableConfiguration',
            Description:
                'Table configuration. Allows you to configure table options, for example filtering, sorting, actions displayed, pagination and selection.',
            Input: 'tableConfiguration',
        },
        {
            Name: 'tableColumns: IColumnDefinition[]',
            Description: 'Columns configuration list. Allows you to configure options for each column (visible or not) in your table.',
            Input: 'tableColumns',
        },
        {
            Name: 'selectedData: T[]',
            Description: 'Subset of <code>data</code> property, which defines the initial selected rows on table.',
            Input: 'selectedData',
        },
    ];

    outputTable: TableRow[] = [
        {
            Name: 'actionSelected: EventEmitter<[T, number]>',
            Description:
                'Emits a action selected event whenever the an action is selected state of an option changes. <br> <code>Event[0]</code> as row data and <code>Event[1]</code> as action index.',
            Output: 'actionSelected',
        },
        {
            Name: 'iconClicked: EventEmitter<[T, IColumnDefinition]>',
            Description:
                'Emits an event whenever a Icon-type column is clicked. <br> <code>Event[0]</code> as row data and <code>Event[1]</code> as column definition.',
            Output: 'iconClicked',
        },
        {
            Name: 'rowSelected: EventEmitter<[boolean, T[]]>',
            Description:
                'Emits an event whenever a new selected row state changes. <br> <code>Event[0]</code> as boolean (<code>true</code> if double click, <code>false</code> if single click) and <code>Event[1]</code> as rows selected (T[]).',
            Output: 'rowSelected',
        },
        // {
        //     Name: 'numberChange: EventEmitter<[T, IColumnDefinition, number]>',
        //     Description:
        //         'Emits an event whenever a NumberInput-type column state changes. <br><code>Event[0]</code> as row data, <code>Event[1]</code> as column definition, and <code>Event[3]</code> as new number inputted.',
        //     Output: 'numberChange',
        // },
        {
            Name: 'hyperLinkClicked: EventEmitter<[T, IColumnDefinition]>',
            Description:
                'Emits an event whenever a Link-type column is clicked. <br> <code>Event[0]</code> as row data and <code>Event[1]</code> as column definition.',
            Output: 'hyperLinkClicked',
        },
    ];

    inputTableConfiguration: TableRow[] = [
        {
            Name: 'Id: string',
            Description: `Property <code>id</code> added to HTMLelement <code>table</code>.`,
        },
        {
            Name: 'LocalStorageKey?: string',
            Description: `Unique key used to save table and column configuration to browser's LocalStorage. Used to restore user's preferences for the table. For example, columns visibility, column order`,
        },
        {
            Name: 'AllowActions?: boolean',
            Description: 'Whether table displays its actions, like exporting, printing, etc.',
        },
        {
            Name: 'AllowFilter?: boolean',
            Description: 'Whether table allows filtering.',
        },
        {
            Name: 'AllowPagination?: boolean',
            Description: 'Whether table enables client-side pagination.',
        },
        {
            Name: 'AllowSelect?: boolean',
            Description: 'Whether table displays the check-box to select rows.',
        },
        {
            Name: 'AllowSorting?: boolean',
            Description: 'Whether table enables sorting by column.',
        },
        {
            Name: 'MultipleSelect?: boolean',
            Description: 'Whether table enables multiple row select or single.',
        },
    ];

    inputColumns: TableRow[] = [
        {
            Name: 'Field: string',
            Description: 'Defines the property name for the column. It should exists in <code>@Input() data</code> of type T.',
        },
        {
            Name: 'Title: string',
            Description: 'Defines the displayed title for the column.',
        },
        {
            Name: 'Display: boolean',
            Description: 'Defines whether column is visible or not on the table.',
        },
        {
            Name: `SortDirection?: 'asc' | 'desc'`,
            Description:
                'Define initial sorting direction for the column. Only the first sorted column will be used for sorting the table.',
        },
        {
            Name: 'ColumnType: ColumnType',
            Description: `Defined by the enum <code>ColumnType</code>. Types available: <strong>String</strong></strong>, <strong>DateTime</strong>, <strong>Date</strong>, <strong>Time</strong>, <strong>Actions</strong>, <strong>DropDown</strong>, <strong>Icon</strong>, <strong>NumberInput</strong>, <strong>DropDownDynamic</strong>, <strong>Image</strong>, <strong>Link</strong>`,
        },
        {
            Name: 'MatIconName?: string',
            Description: `If ColumnType as Icon, defines the Material Icon name. Check Google's <a href="https://fonts.google.com/icons">Material Icon</a> List.`,
        },
        {
            Name: 'FilterValues?: ColumnValueType[]',
            Description: 'Defines the existing values for the column to be filtered on.',
        },
        {
            Name: `Suffix?: {
        Field: string;
    }`,
            Description: `Defines another Field name, which contains a value (string) to append to this column's value.`,
        },
    ];

    configurationCode: string = `<ngx-advanced-material-table
    [data]="data"
    [tableConfiguration]="TABLE_CONFIG"
    [tableColumns]="COLUMNS_CONFIG_LIST"
    [selectedData]="selectedData">
</ngx-advanced-material-table>
`;

    outputCode: string = `<ngx-advanced-material-table
    [data]="data"
    [tableConfiguration]="TABLE_CONFIG"
    [tableColumns]="COLUMNS_CONFIG_LIST"
    [selectedData]="selectedData"
    (rowSelected)="rowSelected($event)"
></ngx-advanced-material-table>
`;

    rowSelectedFunctionCode: string = `rowSelected(event: [boolean, Person[]]): void {
    this.selectedData = event[1];
}
`;

    tableConfigurationCode: string = `export const TABLE_CONFIG: ITableConfiguration = {
    Id: 'people-table',
    LocalStorageKey: 'people-table-cachekey',
    AllowSelect: true,
    AllowPagination: true,
    AllowActions: true,
    AllowFilter: true,
    MultipleSelect: true,
};
`;

    columnsConfigurationCode: string = `export const COLUMNS_CONFIG_LIST: IColumnDefinition[] = [
    { Field: 'firstname', Title: 'First Name', Display: true, ColumnType: ColumnType.String, SortDirection: 'asc' },
    { Field: 'lastname', Title: 'Last Name', Display: true, ColumnType: ColumnType.String },
    { Field: 'email', Title: 'Email', Display: true, ColumnType: ColumnType.String },
    { Field: 'phone', Title: 'Phone', Display: true, ColumnType: ColumnType.String },
    { Field: 'birthday', Title: 'Birthday', Display: true, ColumnType: ColumnType.String },
    { Field: 'gender', Title: 'Gender', Display: true, ColumnType: ColumnType.String },
    { Field: 'address.country', Title: 'Country', Display: true, ColumnType: ColumnType.String },
    { Field: 'website', Title: 'Website', Display: true, ColumnType: ColumnType.Link },
    { Field: 'image', Title: 'Image', Display: true, ColumnType: ColumnType.Image },
];`;

    constructor() {}

    ngOnInit(): void {}
}
