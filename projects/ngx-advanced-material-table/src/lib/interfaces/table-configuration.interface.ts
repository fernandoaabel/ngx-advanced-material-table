export interface ITableConfiguration {
    Id: string;
    LocalStorageKey?: string;
    AllowActions?: boolean;
    AllowFilter?: boolean;
    AllowPagination?: boolean;
    AllowSelect?: boolean;
    AllowSorting?: boolean;
    MultipleSelect?: boolean;
}
