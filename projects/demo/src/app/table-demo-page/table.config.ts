import { ColumnType, IColumnDefinition, ITableConfiguration } from 'ngx-advanced-material-table';

export const TABLE_CONFIG: ITableConfiguration = {
    Id: 'people-table',
    LocalStorageKey: 'people-table-cachekey',
    AllowSelect: true,
    AllowPagination: true,
    AllowActions: true,
    AllowFilter: true,
    MultipleSelect: true,
};

export const COLUMNS_CONFIG_LIST: IColumnDefinition[] = [
    { Field: 'firstname', Title: 'First Name', Display: true, ColumnType: ColumnType.String, SortDirection: 'asc' },
    { Field: 'lastname', Title: 'Last Name', Display: true, ColumnType: ColumnType.String },
    { Field: 'email', Title: 'Email', Display: true, ColumnType: ColumnType.String },
    { Field: 'phone', Title: 'Phone', Display: true, ColumnType: ColumnType.String },
    { Field: 'birthday', Title: 'Birthday', Display: true, ColumnType: ColumnType.String },
    { Field: 'gender', Title: 'Gender', Display: true, ColumnType: ColumnType.String },
    { Field: 'address.country', Title: 'Country', Display: true, ColumnType: ColumnType.String },
    { Field: 'website', Title: 'Website', Display: true, ColumnType: ColumnType.Link },
    { Field: 'image', Title: 'Image', Display: true, ColumnType: ColumnType.Image },
];
