export interface ITableConfiguration {
    Id: string;
    LocalStorageKey?: string;
    AllowFilter?: boolean;
    AllowActions?: boolean;
    AllowSelect?: boolean;
    MultipleSelect?: boolean;
    AllowPagination?: boolean;
    AllowSorting?: boolean;
}
