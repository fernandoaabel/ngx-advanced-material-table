import * as _ from 'lodash';
// FIXME(Fernando Abel): XLSX module not being found
// import * as xlsx from 'xlsx';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Sort, ArrowViewStateTransition, MatSortHeader, MatSort } from '@angular/material/sort';
import { LocalStorageService } from './services/local-storage.service';
import { take } from 'rxjs/operators';
import { ITableConfiguration } from './interfaces/table-configuration.interface';
import {
    IColumnDefinition,
    ColumnType,
    IAdvancedRowMenu,
    IFilterColumnsData,
    IFilterColumnsResponse,
    IDistinctColumns,
} from './interfaces/column-definition.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { IKeyFilterValues } from './interfaces/key-filter-values.interface';
import { TableBuilderHelper } from './helpers/table-builder.helper';
import { Value } from './helpers/values.helper';
import { FilterColumnsComponent } from './components/filter-columns/filter-columns.component';
import { ColumnHelper } from './helpers/columns.helper';

@Component({
    selector: 'ngx-advanced-material-table',
    templateUrl: './ngx-advanced-material-table.component.html',
    styleUrls: ['./ngx-advanced-material-table.component.scss'],
})
export class AdvancedMaterialTableComponent<T = any> implements OnInit, AfterViewInit {
    @Input()
    tableConfiguration!: ITableConfiguration;

    @Input()
    actionConfiguration?: IAdvancedRowMenu[];

    @Input()
    set tableColumns(value: IColumnDefinition[]) {
        this.tableColumnList = _.cloneDeep(value);
    }
    get tableColumns(): IColumnDefinition[] {
        return this.tableColumnList;
    }

    private dataset!: T[];
    @Input() set data(value: T[]) {
        this.dataset = value;
        this.initializeTable();
    }
    get data(): T[] {
        return this.dataset;
    }

    @Input() set selectedData(initialSelection: T[]) {
        this.selection = new SelectionModel<any>(true, initialSelection);
    }

    get selectedData() {
        return this.selection.selected;
    }

    @Output() actionSelected: EventEmitter<[T, number]> = new EventEmitter();
    @Output() iconClicked: EventEmitter<[T, IColumnDefinition]> = new EventEmitter();
    @Output() rowSelected: EventEmitter<[boolean, T[]]> = new EventEmitter<[boolean, T[]]>();
    @Output() numberChange: EventEmitter<[T, IColumnDefinition, number]> = new EventEmitter();
    @Output() catalogueClicked = new EventEmitter();
    @Output() searchCatalogueClicked = new EventEmitter();
    @Output() clearCatalogueClicked = new EventEmitter();
    @Output() hyperLinkClicked = new EventEmitter();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    dataSource!: MatTableDataSource<T>;
    displayedColumns: string[] = [];

    noRowsDisplayed: boolean = false;
    hasHiddenColumns: boolean = false;
    columnType = ColumnType;
    selection = new SelectionModel<T>(true, []);

    private tableColumnList: IColumnDefinition[] = [];
    private mainFilter = '';

    constructor(private dialog: MatDialog, private localStorageService: LocalStorageService, private cdref: ChangeDetectorRef) {}

    ngOnInit() {
        this.loadFromStorage();
        this.renderColumns();
        this.localizePaginator();
    }

    ngAfterViewInit(): void {
        this.sortColumns();
        this.sort.sortChange.subscribe((col: Sort) => {
            if (!col.active) {
                return;
            }

            this.tableColumnList.forEach((column) => {
                if (column.Field !== col.active) {
                    column.SortDirection = undefined;
                } else {
                    column.SortDirection = col.direction as 'asc' | 'desc' | undefined;
                }
            });
        });

        this.initializeTable();
    }

    getContent = (column: IColumnDefinition, element: T) => ColumnHelper.getContent(column.Field, element);
    getToolTip = (row: T, column: IColumnDefinition) => ColumnHelper.getToolTip<T>(column, row);

    private initializeTable(): void {
        if (this.data) {
            this.noRowsDisplayed = this.data.length === 0;
        }

        this.dataSource = new MatTableDataSource<T>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
            const content = ColumnHelper.getContent(property, item);

            if (!content) {
                return '';
            }

            return content.toString().toLowerCase();
        };
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = this.getFilterPredicate();
        this.applyFilters();
    }

    private renderColumns(): void {
        this.displayedColumns = this.tableColumns.filter((column) => column.Display === true).map((column) => column.Field);
        if (this.tableConfiguration.AllowSelect) {
            // Add the 'select' column at the start
            this.displayedColumns.unshift('select');
        }
    }

    onRowChecked(row: T): void {
        if (this.tableConfiguration.MultipleSelect) {
            this.multipleRowSelection(row);
        } else {
            this.singleRowSelection(row);
        }

        this.rowSelected.emit([false, this.selection.selected]);
    }

    onDoubleClick(row: T): void {
        this.rowSelected.emit([true, [row]]);
    }

    masterToggle(): void {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));

        this.rowSelected.emit([false, this.selection.selected]);
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    getFilterPredicate() {
        return (row: T, filters: string): boolean => {
            const filterData: IKeyFilterValues[] = JSON.parse(filters);
            for (const filter of filterData) {
                if (filter.values.length === 0) {
                    continue;
                }

                let value = _.get(row, filter.key);
                if (!value || value === '') {
                    return false;
                }

                let index = -1;
                if (filter.type === ColumnType.DateTime || filter.type === ColumnType.Date) {
                    const dates = filter.values.map((x) => new Date(x));
                    index = dates.findIndex((x) => x.getTime() === value.getTime());
                } else if (Value.isArray(value)) {
                    value = _.join(value, ',');
                    index = filter.values.findIndex((x) => _.isEqual(x, value));
                } else {
                    index = filter.values.findIndex((x) => _.isEqual(x, value));
                }

                if (index === -1) {
                    return false;
                }
            }

            if (this.mainFilter && this.mainFilter.length > 0) {
                let match = false;

                filterData.forEach((filter) => {
                    const value = _.get(row, filter.key);
                    // tslint:disable-next-line: no-construct
                    const stringValue = new String(value).toLowerCase();
                    match = match || stringValue.indexOf(this.mainFilter) !== -1;
                });
                return match;
            }

            return true;
        };
    }

    onColumnChange(index: number, event: any): void {
        if (this.tableColumns[index].Display && this.tableColumns.filter((c) => c.Display).length <= 1) {
            event.preventDefault();
            return;
        }

        this.tableColumns[index].Display = !this.tableColumns[index].Display;
        this.renderColumns();
        this.saveColumnConfig();
    }

    clearAllFilters(): void {
        this.tableColumnList.forEach((column: IColumnDefinition) => {
            column.SortDirection = undefined;
            column.FilterValues = undefined;
        });

        // Clear sort, see https://github.com/angular/components/issues/10524
        this.clearSort();

        this.dataSource.filter = '[]';
    }

    /**
     * Return from the Action Buttons
     * @param action Value From the Action Buttons
     */
    onActionSelected(action: [T, number]): void {
        this.actionSelected.emit(action);
    }

    getMinValueForNumberInput(element: T, column: IColumnDefinition): number | undefined {
        if (!column || !column.NumberInputOptions) {
            return;
        }

        if (column.NumberInputOptions.MinInputNumberField) {
            return element[column.NumberInputOptions.MinInputNumberField];
        }

        return column.NumberInputOptions.MinInputNumber;
    }

    getMaxValueForNumberInput(element: T, column: IColumnDefinition): number | undefined {
        if (!column.NumberInputOptions) {
            return;
        }

        if (column.NumberInputOptions.MaxInputNumberField) {
            return element[column.NumberInputOptions.MaxInputNumberField];
        }

        return column.NumberInputOptions.MaxInputNumber;
    }

    iconClick(element: T, column: IColumnDefinition): void {
        this.iconClicked.emit([element, column]);
    }

    numberInputChange(element: T, column: IColumnDefinition, event: any): void {
        this.numberChange.emit([element, column, event.target.value]);
    }

    onCatalogueClicked(element: T, column: IColumnDefinition): void {
        this.catalogueClicked.emit([element, column]);
    }

    onCatalogueSearchClicked(element: T, column: IColumnDefinition): void {
        this.searchCatalogueClicked.emit([element, column]);
    }

    onCatalogueClearClicked(element: T, column: IColumnDefinition): void {
        this.clearCatalogueClicked.emit([element, column]);
    }

    onHyperLinkClicked(element: T, column: IColumnDefinition): void {
        this.hyperLinkClicked.emit([element, column]);
    }

    private multipleRowSelection(row: T): void {
        this.selection.toggle(row);
    }

    private singleRowSelection(row: T): void {
        if (this.selection.isSelected(row)) {
            this.selection.clear();
        } else {
            this.selection.clear();
            this.selection.toggle(row);
        }
    }

    private getDistinctValues(selectedColumn: IColumnDefinition): IDistinctColumns[] {
        let result: IDistinctColumns[] = [];

        this.data.forEach((row) => {
            let value = _.get(row, selectedColumn.Field);
            let displayedValue = value;

            if (Value.isArray(value)) {
                value = _.join(value, ',');
                displayedValue = value;
            }

            if (value === undefined || value === null || value === '') {
                return;
            }

            const isAlreadyChecked = selectedColumn.FilterValues ? selectedColumn.FilterValues.findIndex((x) => x === value) >= 0 : false;

            result.push({
                name: value,
                displayedName: displayedValue,
                checked: isAlreadyChecked,
            });
        });

        result = _.uniqBy(result, (x) => x.displayedName);

        return result;
    }

    //#region Drag and Drop
    headerDragStarted(index: number) {}

    headerDropListDropped(event: CdkDragDrop<IColumnDefinition>) {
        if (!event) {
            return;
        }
        const displayedColumns = this.displayedColumns.filter((x) => x != 'select');
        const previousColumnIndex = this.tableColumns.findIndex((x) => x.Field === displayedColumns[event.previousIndex]);
        const currentColumnIndex = this.tableColumns.findIndex((x) => x.Field === displayedColumns[event.currentIndex]);
        if (this.canColumnBeMoved(this.tableColumns[currentColumnIndex])) {
            this.moveItemInArray(this.tableColumns, previousColumnIndex, currentColumnIndex);
            this.renderColumns();
            this.saveColumnConfig();
        }
    }
    //#endregion

    //#region Sorting and Filtering

    applyMainFilter(event: any): void {
        this.mainFilter = event.value.trim().toLowerCase();
        this.applyFilters();
    }

    private applyFilters(): void {
        const filters: IKeyFilterValues[] = [];

        this.tableColumnList.forEach((column) => {
            if (!column.FilterValues) {
                column.FilterValues = [];
            }

            //const fieldName = x.SelectedField && x.SelectedField.SelectField ? x.SelectedField.SelectField : x.Field;

            filters.push({
                key: column.Field,
                type: column.ColumnType,
                values: column.FilterValues,
            });
        });

        if (filters.length > 0) {
            this.dataSource.filter = JSON.stringify(filters);
        }
    }

    private sortColumn(id: string, start?: 'asc' | 'desc') {
        const currentColumn = this.sort.active;
        const currentDirection = this.sort.direction;
        if (id !== currentColumn || start !== currentDirection) {
            this.sort.sort({ id: '', start, disableClear: false } as any);
            this.sort.sort({ id, start, disableClear: false } as any);
        }
    }

    private clearSort() {
        // Clear sort, see https://github.com/angular/components/issues/10524
        let sortable: any = { id: null, start: null, disableClear: false };
        this.sort.sort(sortable);
    }

    private sortColumns(): void {
        const id = this.tableColumns.findIndex((column) => column.SortDirection);
        if (id === -1) {
            return;
        }

        const columnName = this.tableColumns[id].Field;
        const direction = this.tableColumns[id].SortDirection;

        this.clearSort();

        if (direction) {
            this.sortColumn(columnName, direction);
        }

        // HACK(Fernando Abel): https://github.com/angular/components/issues/10242
        const activeSortHeader = this.sort.sortables.get(columnName) as MatSortHeader;
        if (activeSortHeader) {
            const viewState: ArrowViewStateTransition = activeSortHeader._isSorted()
                ? { fromState: direction, toState: 'active' }
                : { fromState: 'active', toState: direction };
            activeSortHeader._setAnimationTransitionState(viewState);
        }

        this.cdref.detectChanges();
    }

    //#endregion

    //#region Dialogs

    openFilterDialog(selectedColumn: IColumnDefinition): void {
        const data: IFilterColumnsData = {
            selectedColumn: _.cloneDeep(selectedColumn),
            distinctData: this.getDistinctValues(selectedColumn),
        };

        const columnFilteringDialog = this.dialog.open(FilterColumnsComponent, {
            disableClose: false,
            autoFocus: false,
            width: '350px',
            panelClass: 'overlay-panel',
            data,
        });

        columnFilteringDialog
            .afterClosed()
            .pipe(take(1))
            .subscribe((response: IFilterColumnsResponse) => {
                if (response && response.action === 'Ok') {
                    this.filterByColumn(response);
                    this.sortByTable(response);
                }
            });
    }

    //#endregion

    //#region After FilterColumns response

    private filterByColumn(response: IFilterColumnsResponse): void {
        if (!response || !response.selectedColumn) {
            return;
        }

        const column = this.tableColumnList.find((x) => x.Field === response.selectedColumn!.Field);

        if (column) {
            column.FilterValues = response.selectedColumn.FilterValues;
        }

        this.applyFilters();
    }

    private sortByTable(response: IFilterColumnsResponse): void {
        if (response.sortingHasChanged === false) {
            return;
        }

        const columnName = response.selectedColumn!.Field;
        const direction = response.selectedColumn!.SortDirection;

        this.tableColumnList.forEach((column) => {
            column.SortDirection = column.Field !== columnName ? undefined : direction;
        });

        this.sortColumns();
    }

    //#endregion

    //#region Print and Export

    sendToPrinter(): void {
        const selectedData = this.getDataToExportPrint();
        const colNames = this.getDisplayedColumnNames();

        const table = TableBuilderHelper.buildTable(selectedData, this.displayedColumns, colNames);

        if (table) {
            const newWin = window.open('#');
            if (!newWin) return;
            newWin.document.write(TableBuilderHelper.printPageBuilderDefault(table));
            newWin.print();
            newWin.close();
        }
    }

    // TODO: Create a service for that, currently being used in advanced-osm-table and osm-table
    exportToExcel(): void {
        // const tableTitle = TableTags.Table;
        // const selectedData = this.getSelectedDataWithDisplayedColumnsOnly();
        // const colNames = this.getDisplayedColumnNames();
        // // generate a worksheet
        // const ws = xlsx.utils.aoa_to_sheet([colNames]);
        // xlsx.utils.sheet_add_json(ws, selectedData, {
        //     header: this.displayedColumns.slice(1), // remove the 'select' column
        //     skipHeader: true,
        //     origin: 1,
        // });
        // // add to workbook
        // const wb = xlsx.utils.book_new();
        // xlsx.utils.book_append_sheet(wb, ws, tableTitle);
        // // write workbook and force a download
        // xlsx.writeFile(wb, `${tableTitle}.xls`, {
        //     type: 'array',
        //     bookType: 'xls',
        // });
    }

    private getDataToExportPrint(): T[] {
        if (!this.selection.isEmpty()) {
            return this.selection.selected;
        }
        if (!this.dataSource.sort) {
            return this.selection.selected;
        }

        return this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
    }

    private getSelectedDataWithDisplayedColumnsOnly(): Partial<T>[] {
        const selectedData = this.getDataToExportPrint();

        return _.map(selectedData, (obj) => {
            return _.pick(obj, this.displayedColumns);
        });
    }

    private getDisplayedColumnNames(): string[] {
        return this.tableColumns.filter((column) => column.Display === true).map((column) => column.Title);
    }

    //#endregion

    //#region LocalStorage
    private loadFromStorage(): void {
        if (!this.tableConfiguration || !this.tableConfiguration.LocalStorageKey) {
            return;
        }

        const localStorageColumns = this.localStorageService.getAsJson(this.tableConfiguration.LocalStorageKey) as IColumnDefinition[];

        if (!localStorageColumns) {
            return;
        }

        const tableColumnList = _.cloneDeep(this.tableColumns);
        for (const obj of tableColumnList) {
            const index = localStorageColumns.findIndex((i) => i.Field === obj.Field);
            if (index !== -1) {
                const previousIndex = this.tableColumns.findIndex((i) => i.Field === obj.Field);

                // update the displayed property
                this.tableColumns[previousIndex].Display = localStorageColumns[index].Display;
                // rearange columns
                this.moveItemInArray(this.tableColumns, previousIndex, index);
            }
        }
    }

    private saveColumnConfig(): void {
        if (!this.tableConfiguration || !this.tableConfiguration.LocalStorageKey) {
            return;
        }

        this.localStorageService.setAsJson(this.tableConfiguration.LocalStorageKey, this.tableColumns);
    }

    private moveItemInArray(array: any[], previousIndex: number, index: number): void {
        const temp = array[previousIndex];
        array[previousIndex] = array[index];
        array[index] = temp;
    }
    //#endregion

    //#region Paginator

    private localizePaginator(): void {
        if (!this.tableConfiguration.AllowPagination) {
            return;
        }

        if (this.paginator === undefined) {
            return;
        }

        this.paginator._intl.firstPageLabel = 'First Page';
        this.paginator._intl.previousPageLabel = 'Previous Page';
        this.paginator._intl.nextPageLabel = 'Next Page';
        this.paginator._intl.lastPageLabel = 'Last Page';
        this.paginator._intl.itemsPerPageLabel = 'Items per Page';

        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            if (length === 0 || pageSize === 0) {
                return `0 of ${length}`;
            }

            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            // If the start index exceeds the list length, do not try and fix the end index to the end.
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${startIndex + 1} - ${endIndex} of ${length}`;
        };
    }

    //#endregion

    //#region ClassNames
    getRowClassName(): string {
        const hasImageColumn = this.tableColumns.find((c) => c.ColumnType === ColumnType.Image);

        if (hasImageColumn) {
            return 'row-with-image';
        }

        return '';
    }

    getColumnClassName(column: IColumnDefinition): string {
        switch (column.ColumnType) {
            case ColumnType.Actions:
                return 'actions';
            case ColumnType.Icon:
                return 'icons';
            case ColumnType.Image:
                return 'images';
        }
        return '';
    }
    //#endregion

    //#region Checks (Header, Cell, Column or Row)

    isImmutableColumn = ColumnHelper.isImmutableColumn;
    canColumnBeHidden = ColumnHelper.canColumnBeHidden;
    canColumnBeMoved = ColumnHelper.canColumnBeMoved;
    canColumnBeFiltered = ColumnHelper.canColumnBeFiltered;
    isFilteringEnabledOnColumn = ColumnHelper.isFilteringEnabledOnColumn;
    hasFiltersOrSortingEnabled = ColumnHelper.hasFiltersOrSortingEnabled;
    isCellClickable = ColumnHelper.isCellClickable;

    //#endregion
}
