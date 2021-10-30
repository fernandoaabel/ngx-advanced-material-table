import { OnInit, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { LocalStorageService } from './services/local-storage.service';
import { ITableConfiguration } from './interfaces/table-configuration.interface';
import { IColumnDefinition, ColumnType, IAdvancedRowMenu } from './interfaces/column-definition.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { ColumnHelper } from './helpers/columns.helper';
import * as i0 from "@angular/core";
export declare class AdvancedMaterialTableComponent<T = any> implements OnInit, AfterViewInit {
    private dialog;
    private localStorageService;
    private cdref;
    tableConfiguration: ITableConfiguration;
    actionConfiguration?: IAdvancedRowMenu[];
    set tableColumns(value: IColumnDefinition[]);
    get tableColumns(): IColumnDefinition[];
    private dataset;
    set data(value: T[]);
    get data(): T[];
    set selectedData(initialSelection: T[]);
    get selectedData(): T[];
    actionSelected: EventEmitter<[T, number]>;
    iconClicked: EventEmitter<[T, IColumnDefinition]>;
    rowSelected: EventEmitter<[boolean, T[]]>;
    numberChange: EventEmitter<[T, IColumnDefinition, number]>;
    catalogueClicked: EventEmitter<any>;
    searchCatalogueClicked: EventEmitter<any>;
    clearCatalogueClicked: EventEmitter<any>;
    hyperLinkClicked: EventEmitter<any>;
    paginator: MatPaginator;
    sort: MatSort;
    dataSource: MatTableDataSource<T>;
    displayedColumns: string[];
    noRowsDisplayed: boolean;
    hasHiddenColumns: boolean;
    columnType: typeof ColumnType;
    selection: SelectionModel<T>;
    private tableColumnList;
    private mainFilter;
    constructor(dialog: MatDialog, localStorageService: LocalStorageService, cdref: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getContent: (column: IColumnDefinition, element: T) => string;
    getToolTip: (row: T, column: IColumnDefinition) => string;
    private initializeTable;
    private renderColumns;
    onRowChecked(row: T): void;
    onDoubleClick(row: T): void;
    masterToggle(): void;
    isAllSelected(): boolean;
    getFilterPredicate(): (row: T, filters: string) => boolean;
    onColumnChange(index: number, event: any): void;
    clearAllFilters(): void;
    /**
     * Return from the Action Buttons
     * @param action Value From the Action Buttons
     */
    onActionSelected(action: [T, number]): void;
    getMinValueForNumberInput(element: T, column: IColumnDefinition): number | undefined;
    getMaxValueForNumberInput(element: T, column: IColumnDefinition): number | undefined;
    iconClick(element: T, column: IColumnDefinition): void;
    numberInputChange(element: T, column: IColumnDefinition, event: any): void;
    onCatalogueClicked(element: T, column: IColumnDefinition): void;
    onCatalogueSearchClicked(element: T, column: IColumnDefinition): void;
    onCatalogueClearClicked(element: T, column: IColumnDefinition): void;
    onHyperLinkClicked(element: T, column: IColumnDefinition): void;
    private multipleRowSelection;
    private singleRowSelection;
    private getDistinctValues;
    headerDragStarted(index: number): void;
    headerDropListDropped(event: CdkDragDrop<IColumnDefinition>): void;
    applyMainFilter(event: any): void;
    private applyFilters;
    private sortColumn;
    private clearSort;
    private sortColumns;
    openFilterDialog(selectedColumn: IColumnDefinition): void;
    private filterByColumn;
    private sortByTable;
    sendToPrinter(): void;
    exportToExcel(): void;
    private getDataToExportPrint;
    private getSelectedDataWithDisplayedColumnsOnly;
    private getDisplayedColumnNames;
    private loadFromStorage;
    private saveColumnConfig;
    private moveItemInArray;
    private localizePaginator;
    getRowClassName(): string;
    getColumnClassName(column: IColumnDefinition): string;
    isImmutableColumn: typeof ColumnHelper.isImmutableColumn;
    canColumnBeHidden: typeof ColumnHelper.canColumnBeHidden;
    canColumnBeMoved: typeof ColumnHelper.canColumnBeMoved;
    canColumnBeFiltered: typeof ColumnHelper.canColumnBeFiltered;
    isFilteringEnabledOnColumn: typeof ColumnHelper.isFilteringEnabledOnColumn;
    hasFiltersOrSortingEnabled: typeof ColumnHelper.hasFiltersOrSortingEnabled;
    isCellClickable: typeof ColumnHelper.isCellClickable;
    static ɵfac: i0.ɵɵFactoryDeclaration<AdvancedMaterialTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AdvancedMaterialTableComponent<any>, "ngx-advanced-material-table", never, { "tableConfiguration": "tableConfiguration"; "actionConfiguration": "actionConfiguration"; "tableColumns": "tableColumns"; "data": "data"; "selectedData": "selectedData"; }, { "actionSelected": "actionSelected"; "iconClicked": "iconClicked"; "rowSelected": "rowSelected"; "numberChange": "numberChange"; "catalogueClicked": "catalogueClicked"; "searchCatalogueClicked": "searchCatalogueClicked"; "clearCatalogueClicked": "clearCatalogueClicked"; "hyperLinkClicked": "hyperLinkClicked"; }, never, never>;
}
