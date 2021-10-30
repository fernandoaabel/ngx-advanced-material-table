import { ColumnType, ColumnValueType } from './column-definition.interface';
export interface IKeyFilterValues {
    key: string;
    type: ColumnType;
    values: ColumnValueType[];
}
