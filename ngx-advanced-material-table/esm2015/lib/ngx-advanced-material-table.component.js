import * as _ from 'lodash';
// FIXME(Fernando Abel): XLSX module not being found
// import * as xlsx from 'xlsx';
import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import { ColumnType, } from './interfaces/column-definition.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TableBuilderHelper } from './helpers/table-builder.helper';
import { Value } from './helpers/values.helper';
import { FilterColumnsComponent } from './components/filter-columns/filter-columns.component';
import { ColumnHelper } from './helpers/columns.helper';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "./services/local-storage.service";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/icon";
import * as i6 from "@angular/material/menu";
import * as i7 from "@angular/material/paginator";
import * as i8 from "@angular/material/table";
import * as i9 from "@angular/material/checkbox";
import * as i10 from "@angular/material/sort";
import * as i11 from "@angular/common";
import * as i12 from "@angular/material/input";
import * as i13 from "@angular/material/tooltip";
import * as i14 from "@angular/cdk/drag-drop";
export class AdvancedMaterialTableComponent {
    constructor(dialog, localStorageService, cdref) {
        this.dialog = dialog;
        this.localStorageService = localStorageService;
        this.cdref = cdref;
        this.actionSelected = new EventEmitter();
        this.iconClicked = new EventEmitter();
        this.rowSelected = new EventEmitter();
        this.numberChange = new EventEmitter();
        this.catalogueClicked = new EventEmitter();
        this.searchCatalogueClicked = new EventEmitter();
        this.clearCatalogueClicked = new EventEmitter();
        this.hyperLinkClicked = new EventEmitter();
        this.displayedColumns = [];
        this.noRowsDisplayed = false;
        this.hasHiddenColumns = false;
        this.columnType = ColumnType;
        this.selection = new SelectionModel(true, []);
        this.tableColumnList = [];
        this.mainFilter = '';
        this.getContent = (column, element) => ColumnHelper.getContent(column.Field, element);
        this.getToolTip = (row, column) => ColumnHelper.getToolTip(column, row);
        //#endregion
        //#region Checks (Header, Cell, Column or Row)
        this.isImmutableColumn = ColumnHelper.isImmutableColumn;
        this.canColumnBeHidden = ColumnHelper.canColumnBeHidden;
        this.canColumnBeMoved = ColumnHelper.canColumnBeMoved;
        this.canColumnBeFiltered = ColumnHelper.canColumnBeFiltered;
        this.isFilteringEnabledOnColumn = ColumnHelper.isFilteringEnabledOnColumn;
        this.hasFiltersOrSortingEnabled = ColumnHelper.hasFiltersOrSortingEnabled;
        this.isCellClickable = ColumnHelper.isCellClickable;
    }
    set tableColumns(value) {
        this.tableColumnList = _.cloneDeep(value);
    }
    get tableColumns() {
        return this.tableColumnList;
    }
    set data(value) {
        this.dataset = value;
        this.initializeTable();
    }
    get data() {
        return this.dataset;
    }
    set selectedData(initialSelection) {
        this.selection = new SelectionModel(true, initialSelection);
    }
    get selectedData() {
        return this.selection.selected;
    }
    ngOnInit() {
        this.loadFromStorage();
        this.renderColumns();
        this.localizePaginator();
    }
    ngAfterViewInit() {
        this.sortColumns();
        this.sort.sortChange.subscribe((col) => {
            if (!col.active) {
                return;
            }
            this.tableColumnList.forEach((column) => {
                if (column.Field !== col.active) {
                    column.SortDirection = undefined;
                }
                else {
                    column.SortDirection = col.direction;
                }
            });
        });
        this.initializeTable();
    }
    initializeTable() {
        if (this.data) {
            this.noRowsDisplayed = this.data.length === 0;
        }
        this.dataSource = new MatTableDataSource(this.data);
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
    renderColumns() {
        this.displayedColumns = this.tableColumns.filter((column) => column.Display === true).map((column) => column.Field);
        if (this.tableConfiguration.AllowSelect) {
            // Add the 'select' column at the start
            this.displayedColumns.unshift('select');
        }
    }
    onRowChecked(row) {
        if (this.tableConfiguration.MultipleSelect) {
            this.multipleRowSelection(row);
        }
        else {
            this.singleRowSelection(row);
        }
        this.rowSelected.emit([false, this.selection.selected]);
    }
    onDoubleClick(row) {
        this.rowSelected.emit([true, [row]]);
    }
    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
        this.rowSelected.emit([false, this.selection.selected]);
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    getFilterPredicate() {
        return (row, filters) => {
            const filterData = JSON.parse(filters);
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
                }
                else if (Value.isArray(value)) {
                    value = _.join(value, ',');
                    index = filter.values.findIndex((x) => _.isEqual(x, value));
                }
                else {
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
                    const stringValue = value.toLowerCase();
                    match = match || stringValue.indexOf(this.mainFilter) !== -1;
                });
                return match;
            }
            return true;
        };
    }
    onColumnChange(index, event) {
        if (this.tableColumns[index].Display && this.tableColumns.filter((c) => c.Display).length <= 1) {
            event.preventDefault();
            return;
        }
        this.tableColumns[index].Display = !this.tableColumns[index].Display;
        this.renderColumns();
        this.saveColumnConfig();
    }
    clearAllFilters() {
        this.tableColumnList.forEach((column) => {
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
    onActionSelected(action) {
        this.actionSelected.emit(action);
    }
    getMinValueForNumberInput(element, column) {
        if (!column || !column.NumberInputOptions) {
            return;
        }
        if (column.NumberInputOptions.MinInputNumberField) {
            return element[column.NumberInputOptions.MinInputNumberField];
        }
        return column.NumberInputOptions.MinInputNumber;
    }
    getMaxValueForNumberInput(element, column) {
        if (!column.NumberInputOptions) {
            return;
        }
        if (column.NumberInputOptions.MaxInputNumberField) {
            return element[column.NumberInputOptions.MaxInputNumberField];
        }
        return column.NumberInputOptions.MaxInputNumber;
    }
    iconClick(element, column) {
        this.iconClicked.emit([element, column]);
    }
    numberInputChange(element, column, event) {
        this.numberChange.emit([element, column, event.target.value]);
    }
    onCatalogueClicked(element, column) {
        this.catalogueClicked.emit([element, column]);
    }
    onCatalogueSearchClicked(element, column) {
        this.searchCatalogueClicked.emit([element, column]);
    }
    onCatalogueClearClicked(element, column) {
        this.clearCatalogueClicked.emit([element, column]);
    }
    onHyperLinkClicked(element, column) {
        this.hyperLinkClicked.emit([element, column]);
    }
    multipleRowSelection(row) {
        this.selection.toggle(row);
    }
    singleRowSelection(row) {
        if (this.selection.isSelected(row)) {
            this.selection.clear();
        }
        else {
            this.selection.clear();
            this.selection.toggle(row);
        }
    }
    getDistinctValues(selectedColumn) {
        let result = [];
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
    headerDragStarted(index) {
        // Purposedly in blank
    }
    headerDropListDropped(event) {
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
    applyMainFilter(event) {
        this.mainFilter = event.value.trim().toLowerCase();
        this.applyFilters();
    }
    applyFilters() {
        const filters = [];
        this.tableColumnList.forEach((column) => {
            if (!column.FilterValues) {
                column.FilterValues = [];
            }
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
    sortColumn(id, start) {
        const currentColumn = this.sort.active;
        const currentDirection = this.sort.direction;
        if (id !== currentColumn || start !== currentDirection) {
            this.sort.sort({ id: '', start, disableClear: false });
            this.sort.sort({ id, start, disableClear: false });
        }
    }
    clearSort() {
        // Clear sort, see https://github.com/angular/components/issues/10524
        let sortable = { id: null, start: null, disableClear: false };
        this.sort.sort(sortable);
    }
    sortColumns() {
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
        const activeSortHeader = this.sort.sortables.get(columnName);
        if (activeSortHeader) {
            const viewState = activeSortHeader._isSorted()
                ? { fromState: direction, toState: 'active' }
                : { fromState: 'active', toState: direction };
            activeSortHeader._setAnimationTransitionState(viewState);
        }
        this.cdref.detectChanges();
    }
    //#endregion
    //#region Dialogs
    openFilterDialog(selectedColumn) {
        const data = {
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
            .subscribe((response) => {
            if (response && response.action === 'Ok') {
                this.filterByColumn(response);
                this.sortByTable(response);
            }
        });
    }
    //#endregion
    //#region After FilterColumns response
    filterByColumn(response) {
        if (!response || !response.selectedColumn) {
            return;
        }
        const column = this.tableColumnList.find((x) => x.Field === response.selectedColumn.Field);
        if (column) {
            column.FilterValues = response.selectedColumn.FilterValues;
        }
        this.applyFilters();
    }
    sortByTable(response) {
        if (response.sortingHasChanged === false) {
            return;
        }
        const columnName = response.selectedColumn.Field;
        const direction = response.selectedColumn.SortDirection;
        this.tableColumnList.forEach((column) => {
            column.SortDirection = column.Field !== columnName ? undefined : direction;
        });
        this.sortColumns();
    }
    //#endregion
    //#region Print and Export
    sendToPrinter() {
        const selectedData = this.getDataToExportPrint();
        const colNames = this.getDisplayedColumnNames();
        const table = TableBuilderHelper.buildTable(selectedData, this.displayedColumns, colNames);
        if (table) {
            const newWin = window.open('#');
            if (!newWin)
                return;
            newWin.document.write(TableBuilderHelper.printPageBuilderDefault(table));
            newWin.print();
            newWin.close();
        }
    }
    // TODO: Create a service for that, currently being used in advanced table
    exportToExcel() {
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
    getDataToExportPrint() {
        if (!this.selection.isEmpty()) {
            return this.selection.selected;
        }
        if (!this.dataSource.sort) {
            return this.selection.selected;
        }
        return this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
    }
    getSelectedDataWithDisplayedColumnsOnly() {
        const selectedData = this.getDataToExportPrint();
        return _.map(selectedData, (obj) => {
            return _.pick(obj, this.displayedColumns);
        });
    }
    getDisplayedColumnNames() {
        return this.tableColumns.filter((column) => column.Display === true).map((column) => column.Title);
    }
    //#endregion
    //#region LocalStorage
    loadFromStorage() {
        if (!this.tableConfiguration || !this.tableConfiguration.LocalStorageKey) {
            return;
        }
        const localStorageColumns = this.localStorageService.getAsJson(this.tableConfiguration.LocalStorageKey);
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
    saveColumnConfig() {
        if (!this.tableConfiguration || !this.tableConfiguration.LocalStorageKey) {
            return;
        }
        this.localStorageService.setAsJson(this.tableConfiguration.LocalStorageKey, this.tableColumns);
    }
    moveItemInArray(array, previousIndex, index) {
        const temp = array[previousIndex];
        array[previousIndex] = array[index];
        array[index] = temp;
    }
    //#endregion
    //#region Paginator
    localizePaginator() {
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
        this.paginator._intl.getRangeLabel = (page, pageSize, length) => {
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
    getRowClassName() {
        const hasImageColumn = this.tableColumns.find((c) => c.ColumnType === ColumnType.Image);
        if (hasImageColumn) {
            return 'row-with-image';
        }
        return '';
    }
    getColumnClassName(column) {
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
}
AdvancedMaterialTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: AdvancedMaterialTableComponent, deps: [{ token: i1.MatDialog }, { token: i2.LocalStorageService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AdvancedMaterialTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.12", type: AdvancedMaterialTableComponent, selector: "ngx-advanced-material-table", inputs: { tableConfiguration: "tableConfiguration", actionConfiguration: "actionConfiguration", tableColumns: "tableColumns", data: "data", selectedData: "selectedData" }, outputs: { actionSelected: "actionSelected", iconClicked: "iconClicked", rowSelected: "rowSelected", numberChange: "numberChange", catalogueClicked: "catalogueClicked", searchCatalogueClicked: "searchCatalogueClicked", clearCatalogueClicked: "clearCatalogueClicked", hyperLinkClicked: "hyperLinkClicked" }, viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div>\n    <div class=\"table-top-panel\" *ngIf=\"tableConfiguration.AllowFilter || tableConfiguration.AllowActions\">\n        <div class=\"table-filter\">\n            <ng-container *ngIf=\"tableConfiguration.AllowFilter\">\n                <mat-form-field>\n                    <input\n                        matInput\n                        id=\"{{ tableConfiguration.Id }}-table-filter-field\"\n                        (keyup)=\"applyMainFilter($event.target)\"\n                        i18n-placeholder=\"@@placeholder-text-filterResult\"\n                        placeholder=\"Filter on results...\"\n                    />\n                </mat-form-field>\n            </ng-container>\n        </div>\n\n        <div class=\"table-actions\" *ngIf=\"tableConfiguration.AllowActions\">\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-clearAllFilters\"\n                onclick=\"this.blur()\"\n                (click)=\"clearAllFilters()\"\n                [matTooltip]=\"templateClearAllFilters.innerText\"\n            >\n                <mat-icon>filter_list_off</mat-icon>\n            </button>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-showColumns\"\n                [matMenuTriggerFor]=\"visibleColumnsMenu\"\n                [matTooltip]=\"templateShowHide.innerText\"\n            >\n                <mat-icon>view_column</mat-icon>\n            </button>\n\n            <mat-menu #visibleColumnsMenu=\"matMenu\">\n                <ng-template matMenuContent>\n                    <div id=\"{{ tableConfiguration.Id }}-table-columns-checkbox\">\n                        <div\n                            mat-menu-item\n                            *ngFor=\"let column of tableColumns; let i = index\"\n                            (click)=\"onColumnChange(i, $event); $event.stopPropagation()\"\n                        >\n                            <mat-icon *ngIf=\"column.Display\" color=\"accent\">check_box</mat-icon>\n                            <mat-icon *ngIf=\"!column.Display\">check_box_outline_blank</mat-icon>\n                            <span>{{ column.Title }}</span>\n                        </div>\n                    </div>\n                </ng-template>\n            </mat-menu>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-export-to-excel-button\"\n                [matTooltip]=\"templateExportCsv.innerText\"\n                (click)=\"exportToExcel()\"\n                [disabled]=\"noRowsDisplayed\"\n            >\n                <mat-icon>file_download</mat-icon>\n            </button>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-print-button\"\n                (click)=\"sendToPrinter()\"\n                [matTooltip]=\"templatePrint.innerText\"\n                [disabled]=\"noRowsDisplayed\"\n            >\n                <mat-icon>print</mat-icon>\n            </button>\n\n            <template #templateShowHide i18n=\"@@table-tooltip-grid-showColumns\">Select visible columns</template>\n            <template #templateExportCsv i18n=\"@@table-tooltip-export-csv\">Export to Excel</template>\n            <template #templateClearAllFilters i18n=\"@@table-tooltip-clear-all-filters\">Clear filters and sorting</template>\n            <template #templatePrint i18n=\"@@action-btn-print\">Print</template>\n        </div>\n    </div>\n\n    <div class=\"table-pagination\" *ngIf=\"tableConfiguration.AllowPagination\">\n        <mat-paginator\n            [pageSizeOptions]=\"[10, 25, 50, 100]\"\n            id=\"{{ tableConfiguration.Id }}-table-paginator\"\n            showFirstLastButtons\n        ></mat-paginator>\n    </div>\n\n    <mat-table\n        id=\"{{ tableConfiguration.Id }}-table\"\n        [dataSource]=\"dataSource\"\n        matSort\n        matSortDisableClear=\"false\"\n        cdkDropListGroup\n        cdkDropList\n        cdkDropListLockAxis=\"x\"\n        cdkDropListOrientation=\"horizontal\"\n        (cdkDropListDropped)=\"headerDropListDropped($event)\"\n    >\n        <!-- Select Check Box Column -->\n        <ng-container matColumnDef=\"select\">\n            <mat-header-cell *matHeaderCellDef>\n                <mat-checkbox\n                    *ngIf=\"tableConfiguration.MultipleSelect\"\n                    (change)=\"$event ? masterToggle() : null\"\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                >\n                </mat-checkbox>\n            </mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <mat-checkbox\n                    (click)=\"$event.stopPropagation()\"\n                    (change)=\"$event ? onRowChecked(row) : null\"\n                    [checked]=\"selection.isSelected(row)\"\n                >\n                </mat-checkbox>\n            </mat-cell>\n        </ng-container>\n\n        <ng-container *ngFor=\"let column of tableColumns; let i = index\" matColumnDef=\"{{ column.Field }}\">\n            <mat-header-cell\n                *matHeaderCellDef\n                cdkDrag\n                (cdkDragStarted)=\"headerDragStarted(i)\"\n                [cdkDragData]=\"{ name: column.Field }\"\n                [cdkDragDisabled]=\"!canColumnBeMoved(column)\"\n                [ngClass]=\"getColumnClassName(column)\"\n                [matTooltip]=\"column.Title\"\n            >\n                <ng-container *ngIf=\"isFilteringEnabledOnColumn(column)\">\n                    <span mat-sort-header [class.selected]=\"hasFiltersOrSortingEnabled(column)\">{{ column.Title }}</span>\n                    <button\n                        mat-icon-button\n                        disableRipple\n                        onclick=\"this.blur()\"\n                        (click)=\"openFilterDialog(column)\"\n                        [disabled]=\"noRowsDisplayed\"\n                        [class.selected]=\"hasFiltersOrSortingEnabled(column)\"\n                    >\n                        <mat-icon>filter_list</mat-icon>\n                    </button>\n                </ng-container>\n            </mat-header-cell>\n            <mat-cell\n                *matCellDef=\"let element; let rowIndex = index\"\n                [ngClass]=\"getColumnClassName(column)\"\n                (click)=\"isCellClickable(column) ? onRowChecked(element) : null\"\n            >\n                <div [matTooltip]=\"getToolTip(element, column)\">\n                    <ng-container [ngSwitch]=\"column.ColumnType\">\n                        <!-- DateTime -->\n                        <span *ngSwitchCase=\"columnType.DateTime\"> {{ getContent(column, element) }}</span>\n                        <!-- Date -->\n                        <span *ngSwitchCase=\"columnType.Date\"> {{ getContent(column, element) }}</span>\n                        <!-- Time -->\n                        <span *ngSwitchCase=\"columnType.Time\"> {{ getContent(column, element) }}</span>\n                        <!-- String -->\n                        <span *ngSwitchCase=\"columnType.String\"> {{ getContent(column, element) }}</span>\n                        <!-- Link -->\n                        <span *ngSwitchCase=\"columnType.Link\" (click)=\"onHyperLinkClicked(element, column)\">\n                            <a href=\"{{ getContent(column, element) }}\" target=\"_blank\" rel=\"noopener\">{{ getContent(column, element) }}</a>\n                        </span>\n                        <!-- Image -->\n                        <div *ngSwitchCase=\"columnType.Image\">\n                            <img src=\"{{ getContent(column, element) }}\" alt=\"image\" />\n                        </div>\n                        <!-- Actions -->\n                        <!-- <ng-container *ngSwitchCase=\"columnType.Actions\">\n                            <app-advance-table-row-menu\n                                [rowData]=\"element\"\n                                [tableRowMenu]=\"RowActionsConfig\"\n                                (actionSelected)=\"onActionSelected($event)\"\n                            ></app-advance-table-row-menu>\n                        </ng-container> -->\n                        <!-- Dropdown -->\n                        <!-- <ng-container *ngSwitchCase=\"columnType.DropDown\">\n                            <app-advanced-table-row-dropdown\n                                [rowData]=\"element\"\n                                [columnData]=\"column\"\n                                [tableRowDropDown]=\"RowDropDownConfig\"\n                                (dropDownSelected)=\"onDropDownSelected($event)\"\n                            ></app-advanced-table-row-dropdown>\n                        </ng-container> -->\n                        <!-- Icon -->\n                        <ng-container *ngSwitchCase=\"columnType.Icon\">\n                            <button\n                                [id]=\"column.Title + '-' + element[column.IdField!]\"\n                                mat-icon-button\n                                (click)=\"iconClick(element, column)\"\n                            >\n                                <mat-icon> {{ column.MatIconName }}</mat-icon>\n                                {{ getContent(column, element) }}\n                            </button>\n                        </ng-container>\n                        <!-- Number Input -->\n                        <ng-container *ngSwitchCase=\"columnType.NumberInput\">\n                            <mat-form-field floatLabel=\"never\">\n                                <input\n                                    matInput\n                                    onlyNumbers\n                                    type=\"number\"\n                                    [min]=\"getMinValueForNumberInput(element, column)\"\n                                    [max]=\"getMaxValueForNumberInput(element, column)\"\n                                    (change)=\"numberInputChange(element, column, $event)\"\n                                    [value]=\"element[column.Field]\"\n                                />\n                                <!-- Suffix -->\n                                <span matSuffix class=\"suffix\" *ngIf=\"column.Suffix\">\n                                    {{ element[column.Suffix.Field] }}\n                                </span>\n                            </mat-form-field>\n                        </ng-container>\n                    </ng-container>\n                    <!-- Suffix -->\n                    <span class=\"suffix\" *ngIf=\"column.Suffix && column.ColumnType !== columnType.NumberInput\">\n                        {{ element[column.Suffix.Field] }}\n                    </span>\n                </div>\n            </mat-cell>\n        </ng-container>\n\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n        <mat-row\n            *matRowDef=\"let row; columns: displayedColumns\"\n            id=\"{{ row.Id }}\"\n            [ngClass]=\"getRowClassName()\"\n            (dblclick)=\"onDoubleClick(row)\"\n        ></mat-row>\n    </mat-table>\n\n    <div *ngIf=\"noRowsDisplayed\" class=\"no-records\">\n        <span i18n=\"@@table-noResultFound\">No matching records found</span>\n    </div>\n</div>\n", styles: [".mat-table{border:1px solid rgba(0,0,0,.12);border-bottom:0}.mat-header-row{min-height:40px;height:40px}.mat-row{min-height:40px;height:40px;align-items:stretch}.mat-row:hover{background-color:#4d74a8}.mat-row:hover .mat-cell,.mat-row:hover .mat-icon{color:#fff}.mat-row.row-with-image{height:55px}.mat-row .mat-cell>div{width:100%;display:flex;align-items:center}.mat-row .mat-cell .mat-form-field{min-width:50%}.mat-row .mat-cell img{height:55px;min-width:100px;margin:0}.mat-header-cell,.mat-cell{min-height:40px;border-right:1px solid rgba(0,0,0,.12);padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-header-cell.mat-column-select,.mat-cell.mat-column-select{padding:0 8px;width:20px;flex:none;justify-content:center}.mat-header-cell:last-child,.mat-cell:last-child{border-right:0}.no-records{height:48px;display:flex;align-items:center;justify-content:center;background:white}.table-top-panel{display:flex;justify-content:space-between;height:1.25em;padding:1em 0 1.5em}.table-actions{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination h4{margin:0;text-transform:uppercase;font-weight:bold}.table-pagination .mat-paginator{background:transparent}.table-pagination .mat-form-field{width:4em;margin:0 .2em 0 .5em}.mat-header-cell{display:flex;align-items:inherit;align-content:stretch}.mat-header-cell .mat-icon{font-size:1em}.mat-header-cell span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:bold}.mat-header-cell.icons,.mat-header-cell.actions,.mat-cell.icons,.mat-cell.actions{padding:0;width:40px;flex:none;justify-content:center}.mat-header-cell.images,.mat-cell.images{padding:2px;min-width:100px;flex:none;justify-content:center}\n"], components: [{ type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i6.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { type: i6.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { type: i7.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }, { type: i8.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i9.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "id", "labelPosition", "name", "required", "checked", "disabled", "indeterminate", "aria-describedby", "value"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { type: i10.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "arrowPosition", "sortActionDescription", "disableClear", "mat-sort-header", "start"], exportAs: ["matSortHeader"] }, { type: i8.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i8.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }], directives: [{ type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i12.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["id", "disabled", "required", "type", "value", "readonly", "placeholder", "errorStateMatcher", "aria-describedby"], exportAs: ["matInput"] }, { type: i13.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i6.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { type: i6.MatMenuContent, selector: "ng-template[matMenuContent]" }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortActive"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i14.CdkDropListGroup, selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { type: i14.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i8.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i8.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i8.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i8.MatCellDef, selector: "[matCellDef]" }, { type: i8.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i14.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i11.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i11.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.MatSuffix, selector: "[matSuffix]" }, { type: i8.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i8.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: AdvancedMaterialTableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-advanced-material-table',
                    templateUrl: './ngx-advanced-material-table.component.html',
                    styleUrls: ['./ngx-advanced-material-table.component.scss'],
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }, { type: i2.LocalStorageService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { tableConfiguration: [{
                type: Input
            }], actionConfiguration: [{
                type: Input
            }], tableColumns: [{
                type: Input
            }], data: [{
                type: Input
            }], selectedData: [{
                type: Input
            }], actionSelected: [{
                type: Output
            }], iconClicked: [{
                type: Output
            }], rowSelected: [{
                type: Output
            }], numberChange: [{
                type: Output
            }], catalogueClicked: [{
                type: Output
            }], searchCatalogueClicked: [{
                type: Output
            }], clearCatalogueClicked: [{
                type: Output
            }], hyperLinkClicked: [{
                type: Output
            }], paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS9zcmMvbGliL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUvc3JjL2xpYi9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsb0RBQW9EO0FBQ3BELGdDQUFnQztBQUNoQyxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDNUgsT0FBTyxFQUFpRCxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVoRyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUVILFVBQVUsR0FLYixNQUFNLDBDQUEwQyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUc3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7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UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7OzRIQTFtQlEsOEJBQThCO2dIQUE5Qiw4QkFBOEIsNmtCQXlDNUIsWUFBWSx1RUFDWixPQUFPLGdEQzFFdEIsOHdXQTBPQTs0RkQxTWEsOEJBQThCO2tCQUwxQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFdBQVcsRUFBRSw4Q0FBOEM7b0JBQzNELFNBQVMsRUFBRSxDQUFDLDhDQUE4QyxDQUFDO2lCQUM5RDtrS0FHRyxrQkFBa0I7c0JBRGpCLEtBQUs7Z0JBSU4sbUJBQW1CO3NCQURsQixLQUFLO2dCQUlGLFlBQVk7c0JBRGYsS0FBSztnQkFTTyxJQUFJO3NCQUFoQixLQUFLO2dCQVFPLFlBQVk7c0JBQXhCLEtBQUs7Z0JBUUksY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBQ0csc0JBQXNCO3NCQUEvQixNQUFNO2dCQUNHLHFCQUFxQjtzQkFBOUIsTUFBTTtnQkFDRyxnQkFBZ0I7c0JBQXpCLE1BQU07Z0JBRWtCLFNBQVM7c0JBQWpDLFNBQVM7dUJBQUMsWUFBWTtnQkFDSCxJQUFJO3NCQUF2QixTQUFTO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG4vLyBGSVhNRShGZXJuYW5kbyBBYmVsKTogWExTWCBtb2R1bGUgbm90IGJlaW5nIGZvdW5kXG4vLyBpbXBvcnQgKiBhcyB4bHN4IGZyb20gJ3hsc3gnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ydCwgQXJyb3dWaWV3U3RhdGVUcmFuc2l0aW9uLCBNYXRTb3J0SGVhZGVyLCBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElUYWJsZUNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtY29uZmlndXJhdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtcbiAgICBJQ29sdW1uRGVmaW5pdGlvbixcbiAgICBDb2x1bW5UeXBlLFxuICAgIElBZHZhbmNlZFJvd01lbnUsXG4gICAgSUZpbHRlckNvbHVtbnNEYXRhLFxuICAgIElGaWx0ZXJDb2x1bW5zUmVzcG9uc2UsXG4gICAgSURpc3RpbmN0Q29sdW1ucyxcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbHVtbi1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IENka0RyYWdEcm9wIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBJS2V5RmlsdGVyVmFsdWVzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2tleS1maWx0ZXItdmFsdWVzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvdGFibGUtYnVpbGRlci5oZWxwZXInO1xuaW1wb3J0IHsgVmFsdWUgfSBmcm9tICcuL2hlbHBlcnMvdmFsdWVzLmhlbHBlcic7XG5pbXBvcnQgeyBGaWx0ZXJDb2x1bW5zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbHRlci1jb2x1bW5zL2ZpbHRlci1jb2x1bW5zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2x1bW5IZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvY29sdW1ucy5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LWFkdmFuY2VkLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTWF0ZXJpYWxUYWJsZUNvbXBvbmVudDxUID0gYW55PiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KClcbiAgICB0YWJsZUNvbmZpZ3VyYXRpb24hOiBJVGFibGVDb25maWd1cmF0aW9uO1xuXG4gICAgQElucHV0KClcbiAgICBhY3Rpb25Db25maWd1cmF0aW9uPzogSUFkdmFuY2VkUm93TWVudVtdO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdGFibGVDb2x1bW5zKHZhbHVlOiBJQ29sdW1uRGVmaW5pdGlvbltdKSB7XG4gICAgICAgIHRoaXMudGFibGVDb2x1bW5MaXN0ID0gXy5jbG9uZURlZXAodmFsdWUpO1xuICAgIH1cbiAgICBnZXQgdGFibGVDb2x1bW5zKCk6IElDb2x1bW5EZWZpbml0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy50YWJsZUNvbHVtbkxpc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkYXRhc2V0ITogVFtdO1xuICAgIEBJbnB1dCgpIHNldCBkYXRhKHZhbHVlOiBUW10pIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRhYmxlKCk7XG4gICAgfVxuICAgIGdldCBkYXRhKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQ7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkRGF0YShpbml0aWFsU2VsZWN0aW9uOiBUW10pIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0cnVlLCBpbml0aWFsU2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGFjdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8W1QsIG51bWJlcl0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBpY29uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPFtULCBJQ29sdW1uRGVmaW5pdGlvbl0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSByb3dTZWxlY3RlZDogRXZlbnRFbWl0dGVyPFtib29sZWFuLCBUW11dPiA9IG5ldyBFdmVudEVtaXR0ZXI8W2Jvb2xlYW4sIFRbXV0+KCk7XG4gICAgQE91dHB1dCgpIG51bWJlckNoYW5nZTogRXZlbnRFbWl0dGVyPFtULCBJQ29sdW1uRGVmaW5pdGlvbiwgbnVtYmVyXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGNhdGFsb2d1ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHNlYXJjaENhdGFsb2d1ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGNsZWFyQ2F0YWxvZ3VlQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgaHlwZXJMaW5rQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3IhOiBNYXRQYWdpbmF0b3I7XG4gICAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0ITogTWF0U29ydDtcblxuICAgIGRhdGFTb3VyY2UhOiBNYXRUYWJsZURhdGFTb3VyY2U8VD47XG4gICAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbXTtcblxuICAgIG5vUm93c0Rpc3BsYXllZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhhc0hpZGRlbkNvbHVtbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb2x1bW5UeXBlID0gQ29sdW1uVHlwZTtcbiAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSwgW10pO1xuXG4gICAgcHJpdmF0ZSB0YWJsZUNvbHVtbkxpc3Q6IElDb2x1bW5EZWZpbml0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIG1haW5GaWx0ZXIgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBjZHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2FkRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMubG9jYWxpemVQYWdpbmF0b3IoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc29ydENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5zb3J0LnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKChjb2w6IFNvcnQpID0+IHtcbiAgICAgICAgICAgIGlmICghY29sLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZUNvbHVtbkxpc3QuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5GaWVsZCAhPT0gY29sLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4uU29ydERpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4uU29ydERpcmVjdGlvbiA9IGNvbC5kaXJlY3Rpb24gYXMgJ2FzYycgfCAnZGVzYycgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCA9IChjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uLCBlbGVtZW50OiBUKSA9PiBDb2x1bW5IZWxwZXIuZ2V0Q29udGVudChjb2x1bW4uRmllbGQsIGVsZW1lbnQpO1xuICAgIGdldFRvb2xUaXAgPSAocm93OiBULCBjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uKSA9PiBDb2x1bW5IZWxwZXIuZ2V0VG9vbFRpcDxUPihjb2x1bW4sIHJvdyk7XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVUYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ub1Jvd3NEaXNwbGF5ZWQgPSB0aGlzLmRhdGEubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxUPih0aGlzLmRhdGEpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0aW5nRGF0YUFjY2Vzc29yID0gKGl0ZW0sIHByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gQ29sdW1uSGVscGVyLmdldENvbnRlbnQocHJvcGVydHksIGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb250ZW50LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmZpbHRlclByZWRpY2F0ZSA9IHRoaXMuZ2V0RmlsdGVyUHJlZGljYXRlKCk7XG4gICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJDb2x1bW5zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSB0aGlzLnRhYmxlQ29sdW1ucy5maWx0ZXIoKGNvbHVtbikgPT4gY29sdW1uLkRpc3BsYXkgPT09IHRydWUpLm1hcCgoY29sdW1uKSA9PiBjb2x1bW4uRmllbGQpO1xuICAgICAgICBpZiAodGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uQWxsb3dTZWxlY3QpIHtcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgJ3NlbGVjdCcgY29sdW1uIGF0IHRoZSBzdGFydFxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnVuc2hpZnQoJ3NlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Sb3dDaGVja2VkKHJvdzogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uTXVsdGlwbGVTZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVSb3dTZWxlY3Rpb24ocm93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlUm93U2VsZWN0aW9uKHJvdyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd1NlbGVjdGVkLmVtaXQoW2ZhbHNlLCB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZF0pO1xuICAgIH1cblxuICAgIG9uRG91YmxlQ2xpY2socm93OiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm93U2VsZWN0ZWQuZW1pdChbdHJ1ZSwgW3Jvd11dKTtcbiAgICB9XG5cbiAgICBtYXN0ZXJUb2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID8gdGhpcy5zZWxlY3Rpb24uY2xlYXIoKSA6IHRoaXMuZGF0YVNvdXJjZS5kYXRhLmZvckVhY2goKHJvdykgPT4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0KHJvdykpO1xuXG4gICAgICAgIHRoaXMucm93U2VsZWN0ZWQuZW1pdChbZmFsc2UsIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkXSk7XG4gICAgfVxuXG4gICAgaXNBbGxTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBudW1TZWxlY3RlZCA9PT0gbnVtUm93cztcbiAgICB9XG5cbiAgICBnZXRGaWx0ZXJQcmVkaWNhdGUoKSB7XG4gICAgICAgIHJldHVybiAocm93OiBULCBmaWx0ZXJzOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckRhdGE6IElLZXlGaWx0ZXJWYWx1ZXNbXSA9IEpTT04ucGFyc2UoZmlsdGVycyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbHRlciBvZiBmaWx0ZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci52YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IF8uZ2V0KHJvdywgZmlsdGVyLmtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudHlwZSA9PT0gQ29sdW1uVHlwZS5EYXRlVGltZSB8fCBmaWx0ZXIudHlwZSA9PT0gQ29sdW1uVHlwZS5EYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVzID0gZmlsdGVyLnZhbHVlcy5tYXAoKHgpID0+IG5ldyBEYXRlKHgpKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBkYXRlcy5maW5kSW5kZXgoKHgpID0+IHguZ2V0VGltZSgpID09PSB2YWx1ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVmFsdWUuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfLmpvaW4odmFsdWUsICcsJyk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZmlsdGVyLnZhbHVlcy5maW5kSW5kZXgoKHgpID0+IF8uaXNFcXVhbCh4LCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZmlsdGVyLnZhbHVlcy5maW5kSW5kZXgoKHgpID0+IF8uaXNFcXVhbCh4LCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWFpbkZpbHRlciAmJiB0aGlzLm1haW5GaWx0ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBfLmdldChyb3csIGZpbHRlci5rZXkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gbWF0Y2ggfHwgc3RyaW5nVmFsdWUuaW5kZXhPZih0aGlzLm1haW5GaWx0ZXIpICE9PSAtMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uQ29sdW1uQ2hhbmdlKGluZGV4OiBudW1iZXIsIGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGFibGVDb2x1bW5zW2luZGV4XS5EaXNwbGF5ICYmIHRoaXMudGFibGVDb2x1bW5zLmZpbHRlcigoYykgPT4gYy5EaXNwbGF5KS5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFibGVDb2x1bW5zW2luZGV4XS5EaXNwbGF5ID0gIXRoaXMudGFibGVDb2x1bW5zW2luZGV4XS5EaXNwbGF5O1xuICAgICAgICB0aGlzLnJlbmRlckNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5zYXZlQ29sdW1uQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgY2xlYXJBbGxGaWx0ZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYmxlQ29sdW1uTGlzdC5mb3JFYWNoKChjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb2x1bW4uU29ydERpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbHVtbi5GaWx0ZXJWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENsZWFyIHNvcnQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xMDUyNFxuICAgICAgICB0aGlzLmNsZWFyU29ydCgpO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSAnW10nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBmcm9tIHRoZSBBY3Rpb24gQnV0dG9uc1xuICAgICAqIEBwYXJhbSBhY3Rpb24gVmFsdWUgRnJvbSB0aGUgQWN0aW9uIEJ1dHRvbnNcbiAgICAgKi9cbiAgICBvbkFjdGlvblNlbGVjdGVkKGFjdGlvbjogW1QsIG51bWJlcl0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3Rpb25TZWxlY3RlZC5lbWl0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0TWluVmFsdWVGb3JOdW1iZXJJbnB1dChlbGVtZW50OiBULCBjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCFjb2x1bW4gfHwgIWNvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uTnVtYmVySW5wdXRPcHRpb25zLk1pbklucHV0TnVtYmVyRmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50W2NvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMuTWluSW5wdXROdW1iZXJGaWVsZF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sdW1uLk51bWJlcklucHV0T3B0aW9ucy5NaW5JbnB1dE51bWJlcjtcbiAgICB9XG5cbiAgICBnZXRNYXhWYWx1ZUZvck51bWJlcklucHV0KGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIWNvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uTnVtYmVySW5wdXRPcHRpb25zLk1heElucHV0TnVtYmVyRmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50W2NvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMuTWF4SW5wdXROdW1iZXJGaWVsZF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sdW1uLk51bWJlcklucHV0T3B0aW9ucy5NYXhJbnB1dE51bWJlcjtcbiAgICB9XG5cbiAgICBpY29uQ2xpY2soZWxlbWVudDogVCwgY29sdW1uOiBJQ29sdW1uRGVmaW5pdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmljb25DbGlja2VkLmVtaXQoW2VsZW1lbnQsIGNvbHVtbl0pO1xuICAgIH1cblxuICAgIG51bWJlcklucHV0Q2hhbmdlKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24sIGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5udW1iZXJDaGFuZ2UuZW1pdChbZWxlbWVudCwgY29sdW1uLCBldmVudC50YXJnZXQudmFsdWVdKTtcbiAgICB9XG5cbiAgICBvbkNhdGFsb2d1ZUNsaWNrZWQoZWxlbWVudDogVCwgY29sdW1uOiBJQ29sdW1uRGVmaW5pdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNhdGFsb2d1ZUNsaWNrZWQuZW1pdChbZWxlbWVudCwgY29sdW1uXSk7XG4gICAgfVxuXG4gICAgb25DYXRhbG9ndWVTZWFyY2hDbGlja2VkKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hDYXRhbG9ndWVDbGlja2VkLmVtaXQoW2VsZW1lbnQsIGNvbHVtbl0pO1xuICAgIH1cblxuICAgIG9uQ2F0YWxvZ3VlQ2xlYXJDbGlja2VkKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGVhckNhdGFsb2d1ZUNsaWNrZWQuZW1pdChbZWxlbWVudCwgY29sdW1uXSk7XG4gICAgfVxuXG4gICAgb25IeXBlckxpbmtDbGlja2VkKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oeXBlckxpbmtDbGlja2VkLmVtaXQoW2VsZW1lbnQsIGNvbHVtbl0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbXVsdGlwbGVSb3dTZWxlY3Rpb24ocm93OiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLnRvZ2dsZShyb3cpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2luZ2xlUm93U2VsZWN0aW9uKHJvdzogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24uaXNTZWxlY3RlZChyb3cpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnRvZ2dsZShyb3cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaXN0aW5jdFZhbHVlcyhzZWxlY3RlZENvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiBJRGlzdGluY3RDb2x1bW5zW10ge1xuICAgICAgICBsZXQgcmVzdWx0OiBJRGlzdGluY3RDb2x1bW5zW10gPSBbXTtcblxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBfLmdldChyb3csIHNlbGVjdGVkQ29sdW1uLkZpZWxkKTtcbiAgICAgICAgICAgIGxldCBkaXNwbGF5ZWRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoVmFsdWUuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IF8uam9pbih2YWx1ZSwgJywnKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5ZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGlzQWxyZWFkeUNoZWNrZWQgPSBzZWxlY3RlZENvbHVtbi5GaWx0ZXJWYWx1ZXMgPyBzZWxlY3RlZENvbHVtbi5GaWx0ZXJWYWx1ZXMuZmluZEluZGV4KCh4KSA9PiB4ID09PSB2YWx1ZSkgPj0gMCA6IGZhbHNlO1xuXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgZGlzcGxheWVkTmFtZTogZGlzcGxheWVkVmFsdWUsXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogaXNBbHJlYWR5Q2hlY2tlZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHQgPSBfLnVuaXFCeShyZXN1bHQsICh4OiBJRGlzdGluY3RDb2x1bW5zKSA9PiB4LmRpc3BsYXllZE5hbWUpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8jcmVnaW9uIERyYWcgYW5kIERyb3BcbiAgICBoZWFkZXJEcmFnU3RhcnRlZChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIC8vIFB1cnBvc2VkbHkgaW4gYmxhbmtcbiAgICB9XG5cbiAgICBoZWFkZXJEcm9wTGlzdERyb3BwZWQoZXZlbnQ6IENka0RyYWdEcm9wPElDb2x1bW5EZWZpbml0aW9uPikge1xuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGlzcGxheWVkQ29sdW1ucy5maWx0ZXIoKHgpID0+IHggIT0gJ3NlbGVjdCcpO1xuICAgICAgICBjb25zdCBwcmV2aW91c0NvbHVtbkluZGV4ID0gdGhpcy50YWJsZUNvbHVtbnMuZmluZEluZGV4KCh4KSA9PiB4LkZpZWxkID09PSBkaXNwbGF5ZWRDb2x1bW5zW2V2ZW50LnByZXZpb3VzSW5kZXhdKTtcbiAgICAgICAgY29uc3QgY3VycmVudENvbHVtbkluZGV4ID0gdGhpcy50YWJsZUNvbHVtbnMuZmluZEluZGV4KCh4KSA9PiB4LkZpZWxkID09PSBkaXNwbGF5ZWRDb2x1bW5zW2V2ZW50LmN1cnJlbnRJbmRleF0pO1xuICAgICAgICBpZiAodGhpcy5jYW5Db2x1bW5CZU1vdmVkKHRoaXMudGFibGVDb2x1bW5zW2N1cnJlbnRDb2x1bW5JbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVJdGVtSW5BcnJheSh0aGlzLnRhYmxlQ29sdW1ucywgcHJldmlvdXNDb2x1bW5JbmRleCwgY3VycmVudENvbHVtbkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ29sdW1ucygpO1xuICAgICAgICAgICAgdGhpcy5zYXZlQ29sdW1uQ29uZmlnKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gU29ydGluZyBhbmQgRmlsdGVyaW5nXG5cbiAgICBhcHBseU1haW5GaWx0ZXIoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1haW5GaWx0ZXIgPSBldmVudC52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RmlsdGVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmlsdGVyczogSUtleUZpbHRlclZhbHVlc1tdID0gW107XG5cbiAgICAgICAgdGhpcy50YWJsZUNvbHVtbkxpc3QuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbHVtbi5GaWx0ZXJWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uRmlsdGVyVmFsdWVzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5OiBjb2x1bW4uRmllbGQsXG4gICAgICAgICAgICAgICAgdHlwZTogY29sdW1uLkNvbHVtblR5cGUsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBjb2x1bW4uRmlsdGVyVmFsdWVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBKU09OLnN0cmluZ2lmeShmaWx0ZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc29ydENvbHVtbihpZDogc3RyaW5nLCBzdGFydD86ICdhc2MnIHwgJ2Rlc2MnKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW4gPSB0aGlzLnNvcnQuYWN0aXZlO1xuICAgICAgICBjb25zdCBjdXJyZW50RGlyZWN0aW9uID0gdGhpcy5zb3J0LmRpcmVjdGlvbjtcbiAgICAgICAgaWYgKGlkICE9PSBjdXJyZW50Q29sdW1uIHx8IHN0YXJ0ICE9PSBjdXJyZW50RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnQuc29ydCh7IGlkOiAnJywgc3RhcnQsIGRpc2FibGVDbGVhcjogZmFsc2UgfSBhcyBhbnkpO1xuICAgICAgICAgICAgdGhpcy5zb3J0LnNvcnQoeyBpZCwgc3RhcnQsIGRpc2FibGVDbGVhcjogZmFsc2UgfSBhcyBhbnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclNvcnQoKSB7XG4gICAgICAgIC8vIENsZWFyIHNvcnQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xMDUyNFxuICAgICAgICBsZXQgc29ydGFibGU6IGFueSA9IHsgaWQ6IG51bGwsIHN0YXJ0OiBudWxsLCBkaXNhYmxlQ2xlYXI6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuc29ydC5zb3J0KHNvcnRhYmxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRDb2x1bW5zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMudGFibGVDb2x1bW5zLmZpbmRJbmRleCgoY29sdW1uKSA9PiBjb2x1bW4uU29ydERpcmVjdGlvbik7XG4gICAgICAgIGlmIChpZCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSB0aGlzLnRhYmxlQ29sdW1uc1tpZF0uRmllbGQ7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMudGFibGVDb2x1bW5zW2lkXS5Tb3J0RGlyZWN0aW9uO1xuXG4gICAgICAgIHRoaXMuY2xlYXJTb3J0KCk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zb3J0Q29sdW1uKGNvbHVtbk5hbWUsIGRpcmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIQUNLKEZlcm5hbmRvIEFiZWwpOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xMDI0MlxuICAgICAgICBjb25zdCBhY3RpdmVTb3J0SGVhZGVyID0gdGhpcy5zb3J0LnNvcnRhYmxlcy5nZXQoY29sdW1uTmFtZSkgYXMgTWF0U29ydEhlYWRlcjtcbiAgICAgICAgaWYgKGFjdGl2ZVNvcnRIZWFkZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdTdGF0ZTogQXJyb3dWaWV3U3RhdGVUcmFuc2l0aW9uID0gYWN0aXZlU29ydEhlYWRlci5faXNTb3J0ZWQoKVxuICAgICAgICAgICAgICAgID8geyBmcm9tU3RhdGU6IGRpcmVjdGlvbiwgdG9TdGF0ZTogJ2FjdGl2ZScgfVxuICAgICAgICAgICAgICAgIDogeyBmcm9tU3RhdGU6ICdhY3RpdmUnLCB0b1N0YXRlOiBkaXJlY3Rpb24gfTtcbiAgICAgICAgICAgIGFjdGl2ZVNvcnRIZWFkZXIuX3NldEFuaW1hdGlvblRyYW5zaXRpb25TdGF0ZSh2aWV3U3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZHJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gRGlhbG9nc1xuXG4gICAgb3BlbkZpbHRlckRpYWxvZyhzZWxlY3RlZENvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YTogSUZpbHRlckNvbHVtbnNEYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDb2x1bW46IF8uY2xvbmVEZWVwKHNlbGVjdGVkQ29sdW1uKSxcbiAgICAgICAgICAgIGRpc3RpbmN0RGF0YTogdGhpcy5nZXREaXN0aW5jdFZhbHVlcyhzZWxlY3RlZENvbHVtbiksXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVyaW5nRGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihGaWx0ZXJDb2x1bW5zQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBkaXNhYmxlQ2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgICAgICAgIHdpZHRoOiAnMzUwcHgnLFxuICAgICAgICAgICAgcGFuZWxDbGFzczogJ292ZXJsYXktcGFuZWwnLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29sdW1uRmlsdGVyaW5nRGlhbG9nXG4gICAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3BvbnNlOiBJRmlsdGVyQ29sdW1uc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmFjdGlvbiA9PT0gJ09rJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckJ5Q29sdW1uKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QnlUYWJsZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gQWZ0ZXIgRmlsdGVyQ29sdW1ucyByZXNwb25zZVxuXG4gICAgcHJpdmF0ZSBmaWx0ZXJCeUNvbHVtbihyZXNwb25zZTogSUZpbHRlckNvbHVtbnNSZXNwb25zZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5zZWxlY3RlZENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy50YWJsZUNvbHVtbkxpc3QuZmluZCgoeCkgPT4geC5GaWVsZCA9PT0gcmVzcG9uc2Uuc2VsZWN0ZWRDb2x1bW4hLkZpZWxkKTtcblxuICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICBjb2x1bW4uRmlsdGVyVmFsdWVzID0gcmVzcG9uc2Uuc2VsZWN0ZWRDb2x1bW4uRmlsdGVyVmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRCeVRhYmxlKHJlc3BvbnNlOiBJRmlsdGVyQ29sdW1uc1Jlc3BvbnNlKTogdm9pZCB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zb3J0aW5nSGFzQ2hhbmdlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSByZXNwb25zZS5zZWxlY3RlZENvbHVtbiEuRmllbGQ7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHJlc3BvbnNlLnNlbGVjdGVkQ29sdW1uIS5Tb3J0RGlyZWN0aW9uO1xuXG4gICAgICAgIHRoaXMudGFibGVDb2x1bW5MaXN0LmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgY29sdW1uLlNvcnREaXJlY3Rpb24gPSBjb2x1bW4uRmllbGQgIT09IGNvbHVtbk5hbWUgPyB1bmRlZmluZWQgOiBkaXJlY3Rpb247XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc29ydENvbHVtbnMoKTtcbiAgICB9XG5cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBQcmludCBhbmQgRXhwb3J0XG5cbiAgICBzZW5kVG9QcmludGVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RlZERhdGEgPSB0aGlzLmdldERhdGFUb0V4cG9ydFByaW50KCk7XG4gICAgICAgIGNvbnN0IGNvbE5hbWVzID0gdGhpcy5nZXREaXNwbGF5ZWRDb2x1bW5OYW1lcygpO1xuXG4gICAgICAgIGNvbnN0IHRhYmxlID0gVGFibGVCdWlsZGVySGVscGVyLmJ1aWxkVGFibGUoc2VsZWN0ZWREYXRhLCB0aGlzLmRpc3BsYXllZENvbHVtbnMsIGNvbE5hbWVzKTtcblxuICAgICAgICBpZiAodGFibGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1dpbiA9IHdpbmRvdy5vcGVuKCcjJyk7XG4gICAgICAgICAgICBpZiAoIW5ld1dpbikgcmV0dXJuO1xuICAgICAgICAgICAgbmV3V2luLmRvY3VtZW50LndyaXRlKFRhYmxlQnVpbGRlckhlbHBlci5wcmludFBhZ2VCdWlsZGVyRGVmYXVsdCh0YWJsZSkpO1xuICAgICAgICAgICAgbmV3V2luLnByaW50KCk7XG4gICAgICAgICAgICBuZXdXaW4uY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IENyZWF0ZSBhIHNlcnZpY2UgZm9yIHRoYXQsIGN1cnJlbnRseSBiZWluZyB1c2VkIGluIGFkdmFuY2VkIHRhYmxlXG4gICAgZXhwb3J0VG9FeGNlbCgpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc3QgdGFibGVUaXRsZSA9IFRhYmxlVGFncy5UYWJsZTtcbiAgICAgICAgLy8gY29uc3Qgc2VsZWN0ZWREYXRhID0gdGhpcy5nZXRTZWxlY3RlZERhdGFXaXRoRGlzcGxheWVkQ29sdW1uc09ubHkoKTtcbiAgICAgICAgLy8gY29uc3QgY29sTmFtZXMgPSB0aGlzLmdldERpc3BsYXllZENvbHVtbk5hbWVzKCk7XG4gICAgICAgIC8vIC8vIGdlbmVyYXRlIGEgd29ya3NoZWV0XG4gICAgICAgIC8vIGNvbnN0IHdzID0geGxzeC51dGlscy5hb2FfdG9fc2hlZXQoW2NvbE5hbWVzXSk7XG4gICAgICAgIC8vIHhsc3gudXRpbHMuc2hlZXRfYWRkX2pzb24od3MsIHNlbGVjdGVkRGF0YSwge1xuICAgICAgICAvLyAgICAgaGVhZGVyOiB0aGlzLmRpc3BsYXllZENvbHVtbnMuc2xpY2UoMSksIC8vIHJlbW92ZSB0aGUgJ3NlbGVjdCcgY29sdW1uXG4gICAgICAgIC8vICAgICBza2lwSGVhZGVyOiB0cnVlLFxuICAgICAgICAvLyAgICAgb3JpZ2luOiAxLFxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gLy8gYWRkIHRvIHdvcmtib29rXG4gICAgICAgIC8vIGNvbnN0IHdiID0geGxzeC51dGlscy5ib29rX25ldygpO1xuICAgICAgICAvLyB4bHN4LnV0aWxzLmJvb2tfYXBwZW5kX3NoZWV0KHdiLCB3cywgdGFibGVUaXRsZSk7XG4gICAgICAgIC8vIC8vIHdyaXRlIHdvcmtib29rIGFuZCBmb3JjZSBhIGRvd25sb2FkXG4gICAgICAgIC8vIHhsc3gud3JpdGVGaWxlKHdiLCBgJHt0YWJsZVRpdGxlfS54bHNgLCB7XG4gICAgICAgIC8vICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAvLyAgICAgYm9va1R5cGU6ICd4bHMnLFxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGFUb0V4cG9ydFByaW50KCk6IFRbXSB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2Uuc29ydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZS5zb3J0RGF0YSh0aGlzLmRhdGFTb3VyY2UuZmlsdGVyZWREYXRhLCB0aGlzLmRhdGFTb3VyY2Uuc29ydCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZERhdGFXaXRoRGlzcGxheWVkQ29sdW1uc09ubHkoKTogUGFydGlhbDxUPltdIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gdGhpcy5nZXREYXRhVG9FeHBvcnRQcmludCgpO1xuXG4gICAgICAgIHJldHVybiBfLm1hcChzZWxlY3RlZERhdGEsIChvYmo6IFQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfLnBpY2sob2JqLCB0aGlzLmRpc3BsYXllZENvbHVtbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpc3BsYXllZENvbHVtbk5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFibGVDb2x1bW5zLmZpbHRlcigoY29sdW1uKSA9PiBjb2x1bW4uRGlzcGxheSA9PT0gdHJ1ZSkubWFwKChjb2x1bW4pID0+IGNvbHVtbi5UaXRsZSk7XG4gICAgfVxuXG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gTG9jYWxTdG9yYWdlXG4gICAgcHJpdmF0ZSBsb2FkRnJvbVN0b3JhZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YWJsZUNvbmZpZ3VyYXRpb24gfHwgIXRoaXMudGFibGVDb25maWd1cmF0aW9uLkxvY2FsU3RvcmFnZUtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlQ29sdW1ucyA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXRBc0pzb24odGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uTG9jYWxTdG9yYWdlS2V5KSBhcyBJQ29sdW1uRGVmaW5pdGlvbltdO1xuXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlQ29sdW1ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFibGVDb2x1bW5MaXN0ID0gXy5jbG9uZURlZXAodGhpcy50YWJsZUNvbHVtbnMpO1xuICAgICAgICBmb3IgKGNvbnN0IG9iaiBvZiB0YWJsZUNvbHVtbkxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9jYWxTdG9yYWdlQ29sdW1ucy5maW5kSW5kZXgoKGkpID0+IGkuRmllbGQgPT09IG9iai5GaWVsZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNJbmRleCA9IHRoaXMudGFibGVDb2x1bW5zLmZpbmRJbmRleCgoaSkgPT4gaS5GaWVsZCA9PT0gb2JqLkZpZWxkKTtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGlzcGxheWVkIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZUNvbHVtbnNbcHJldmlvdXNJbmRleF0uRGlzcGxheSA9IGxvY2FsU3RvcmFnZUNvbHVtbnNbaW5kZXhdLkRpc3BsYXk7XG4gICAgICAgICAgICAgICAgLy8gcmVhcmFuZ2UgY29sdW1uc1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1JbkFycmF5KHRoaXMudGFibGVDb2x1bW5zLCBwcmV2aW91c0luZGV4LCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVDb2x1bW5Db25maWcoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YWJsZUNvbmZpZ3VyYXRpb24gfHwgIXRoaXMudGFibGVDb25maWd1cmF0aW9uLkxvY2FsU3RvcmFnZUtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldEFzSnNvbih0aGlzLnRhYmxlQ29uZmlndXJhdGlvbi5Mb2NhbFN0b3JhZ2VLZXksIHRoaXMudGFibGVDb2x1bW5zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdmVJdGVtSW5BcnJheShhcnJheTogYW55W10sIHByZXZpb3VzSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCB0ZW1wID0gYXJyYXlbcHJldmlvdXNJbmRleF07XG4gICAgICAgIGFycmF5W3ByZXZpb3VzSW5kZXhdID0gYXJyYXlbaW5kZXhdO1xuICAgICAgICBhcnJheVtpbmRleF0gPSB0ZW1wO1xuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBQYWdpbmF0b3JcblxuICAgIHByaXZhdGUgbG9jYWxpemVQYWdpbmF0b3IoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uQWxsb3dQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYWdpbmF0b3IuX2ludGwuZmlyc3RQYWdlTGFiZWwgPSAnRmlyc3QgUGFnZSc7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yLl9pbnRsLnByZXZpb3VzUGFnZUxhYmVsID0gJ1ByZXZpb3VzIFBhZ2UnO1xuICAgICAgICB0aGlzLnBhZ2luYXRvci5faW50bC5uZXh0UGFnZUxhYmVsID0gJ05leHQgUGFnZSc7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yLl9pbnRsLmxhc3RQYWdlTGFiZWwgPSAnTGFzdCBQYWdlJztcbiAgICAgICAgdGhpcy5wYWdpbmF0b3IuX2ludGwuaXRlbXNQZXJQYWdlTGFiZWwgPSAnSXRlbXMgcGVyIFBhZ2UnO1xuXG4gICAgICAgIHRoaXMucGFnaW5hdG9yLl9pbnRsLmdldFJhbmdlTGFiZWwgPSAocGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCB8fCBwYWdlU2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgMCBvZiAke2xlbmd0aH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIDApO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCBpbmRleCBleGNlZWRzIHRoZSBsaXN0IGxlbmd0aCwgZG8gbm90IHRyeSBhbmQgZml4IHRoZSBlbmQgaW5kZXggdG8gdGhlIGVuZC5cbiAgICAgICAgICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCA8IGxlbmd0aCA/IE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSwgbGVuZ3RoKSA6IHN0YXJ0SW5kZXggKyBwYWdlU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBgJHtzdGFydEluZGV4ICsgMX0gLSAke2VuZEluZGV4fSBvZiAke2xlbmd0aH1gO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIENsYXNzTmFtZXNcbiAgICBnZXRSb3dDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaGFzSW1hZ2VDb2x1bW4gPSB0aGlzLnRhYmxlQ29sdW1ucy5maW5kKChjKSA9PiBjLkNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuSW1hZ2UpO1xuXG4gICAgICAgIGlmIChoYXNJbWFnZUNvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuICdyb3ctd2l0aC1pbWFnZSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uQ2xhc3NOYW1lKGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKGNvbHVtbi5Db2x1bW5UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbHVtblR5cGUuQWN0aW9uczpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGlvbnMnO1xuICAgICAgICAgICAgY2FzZSBDb2x1bW5UeXBlLkljb246XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpY29ucyc7XG4gICAgICAgICAgICBjYXNlIENvbHVtblR5cGUuSW1hZ2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbWFnZXMnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gQ2hlY2tzIChIZWFkZXIsIENlbGwsIENvbHVtbiBvciBSb3cpXG5cbiAgICBpc0ltbXV0YWJsZUNvbHVtbiA9IENvbHVtbkhlbHBlci5pc0ltbXV0YWJsZUNvbHVtbjtcbiAgICBjYW5Db2x1bW5CZUhpZGRlbiA9IENvbHVtbkhlbHBlci5jYW5Db2x1bW5CZUhpZGRlbjtcbiAgICBjYW5Db2x1bW5CZU1vdmVkID0gQ29sdW1uSGVscGVyLmNhbkNvbHVtbkJlTW92ZWQ7XG4gICAgY2FuQ29sdW1uQmVGaWx0ZXJlZCA9IENvbHVtbkhlbHBlci5jYW5Db2x1bW5CZUZpbHRlcmVkO1xuICAgIGlzRmlsdGVyaW5nRW5hYmxlZE9uQ29sdW1uID0gQ29sdW1uSGVscGVyLmlzRmlsdGVyaW5nRW5hYmxlZE9uQ29sdW1uO1xuICAgIGhhc0ZpbHRlcnNPclNvcnRpbmdFbmFibGVkID0gQ29sdW1uSGVscGVyLmhhc0ZpbHRlcnNPclNvcnRpbmdFbmFibGVkO1xuICAgIGlzQ2VsbENsaWNrYWJsZSA9IENvbHVtbkhlbHBlci5pc0NlbGxDbGlja2FibGU7XG5cbiAgICAvLyNlbmRyZWdpb25cbn1cbiIsIjxkaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLXRvcC1wYW5lbFwiICpuZ0lmPVwidGFibGVDb25maWd1cmF0aW9uLkFsbG93RmlsdGVyIHx8IHRhYmxlQ29uZmlndXJhdGlvbi5BbGxvd0FjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWZpbHRlclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhYmxlQ29uZmlndXJhdGlvbi5BbGxvd0ZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ7eyB0YWJsZUNvbmZpZ3VyYXRpb24uSWQgfX0tdGFibGUtZmlsdGVyLWZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJhcHBseU1haW5GaWx0ZXIoJGV2ZW50LnRhcmdldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaTE4bi1wbGFjZWhvbGRlcj1cIkBAcGxhY2Vob2xkZXItdGV4dC1maWx0ZXJSZXN1bHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJGaWx0ZXIgb24gcmVzdWx0cy4uLlwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtYWN0aW9uc1wiICpuZ0lmPVwidGFibGVDb25maWd1cmF0aW9uLkFsbG93QWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlLWNsZWFyQWxsRmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgb25jbGljaz1cInRoaXMuYmx1cigpXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJBbGxGaWx0ZXJzKClcIlxuICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cInRlbXBsYXRlQ2xlYXJBbGxGaWx0ZXJzLmlubmVyVGV4dFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmZpbHRlcl9saXN0X29mZjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlLXNob3dDb2x1bW5zXCJcbiAgICAgICAgICAgICAgICBbbWF0TWVudVRyaWdnZXJGb3JdPVwidmlzaWJsZUNvbHVtbnNNZW51XCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJ0ZW1wbGF0ZVNob3dIaWRlLmlubmVyVGV4dFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPnZpZXdfY29sdW1uPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8bWF0LW1lbnUgI3Zpc2libGVDb2x1bW5zTWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbWF0TWVudUNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ7eyB0YWJsZUNvbmZpZ3VyYXRpb24uSWQgfX0tdGFibGUtY29sdW1ucy1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdC1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHRhYmxlQ29sdW1uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ29sdW1uQ2hhbmdlKGksICRldmVudCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiY29sdW1uLkRpc3BsYXlcIiBjb2xvcj1cImFjY2VudFwiPmNoZWNrX2JveDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiIWNvbHVtbi5EaXNwbGF5XCI+Y2hlY2tfYm94X291dGxpbmVfYmxhbms8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGNvbHVtbi5UaXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9tYXQtbWVudT5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlLWV4cG9ydC10by1leGNlbC1idXR0b25cIlxuICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cInRlbXBsYXRlRXhwb3J0Q3N2LmlubmVyVGV4dFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cG9ydFRvRXhjZWwoKVwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm5vUm93c0Rpc3BsYXllZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmZpbGVfZG93bmxvYWQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICBpZD1cInt7IHRhYmxlQ29uZmlndXJhdGlvbi5JZCB9fS10YWJsZS1wcmludC1idXR0b25cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZW5kVG9QcmludGVyKClcIlxuICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cInRlbXBsYXRlUHJpbnQuaW5uZXJUZXh0XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwibm9Sb3dzRGlzcGxheWVkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+cHJpbnQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjdGVtcGxhdGVTaG93SGlkZSBpMThuPVwiQEB0YWJsZS10b29sdGlwLWdyaWQtc2hvd0NvbHVtbnNcIj5TZWxlY3QgdmlzaWJsZSBjb2x1bW5zPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjdGVtcGxhdGVFeHBvcnRDc3YgaTE4bj1cIkBAdGFibGUtdG9vbHRpcC1leHBvcnQtY3N2XCI+RXhwb3J0IHRvIEV4Y2VsPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjdGVtcGxhdGVDbGVhckFsbEZpbHRlcnMgaTE4bj1cIkBAdGFibGUtdG9vbHRpcC1jbGVhci1hbGwtZmlsdGVyc1wiPkNsZWFyIGZpbHRlcnMgYW5kIHNvcnRpbmc8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPHRlbXBsYXRlICN0ZW1wbGF0ZVByaW50IGkxOG49XCJAQGFjdGlvbi1idG4tcHJpbnRcIj5QcmludDwvdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLXBhZ2luYXRpb25cIiAqbmdJZj1cInRhYmxlQ29uZmlndXJhdGlvbi5BbGxvd1BhZ2luYXRpb25cIj5cbiAgICAgICAgPG1hdC1wYWdpbmF0b3JcbiAgICAgICAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwiWzEwLCAyNSwgNTAsIDEwMF1cIlxuICAgICAgICAgICAgaWQ9XCJ7eyB0YWJsZUNvbmZpZ3VyYXRpb24uSWQgfX0tdGFibGUtcGFnaW5hdG9yXCJcbiAgICAgICAgICAgIHNob3dGaXJzdExhc3RCdXR0b25zXG4gICAgICAgID48L21hdC1wYWdpbmF0b3I+XG4gICAgPC9kaXY+XG5cbiAgICA8bWF0LXRhYmxlXG4gICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlXCJcbiAgICAgICAgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgIG1hdFNvcnRcbiAgICAgICAgbWF0U29ydERpc2FibGVDbGVhcj1cImZhbHNlXCJcbiAgICAgICAgY2RrRHJvcExpc3RHcm91cFxuICAgICAgICBjZGtEcm9wTGlzdFxuICAgICAgICBjZGtEcm9wTGlzdExvY2tBeGlzPVwieFwiXG4gICAgICAgIGNka0Ryb3BMaXN0T3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcbiAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJoZWFkZXJEcm9wTGlzdERyb3BwZWQoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgICA8IS0tIFNlbGVjdCBDaGVjayBCb3ggQ29sdW1uIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInNlbGVjdFwiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cbiAgICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwidGFibGVDb25maWd1cmF0aW9uLk11bHRpcGxlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCIkZXZlbnQgPyBtYXN0ZXJUb2dnbGUoKSA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJzZWxlY3Rpb24uaGFzVmFsdWUoKSAmJiBpc0FsbFNlbGVjdGVkKClcIlxuICAgICAgICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJzZWxlY3Rpb24uaGFzVmFsdWUoKSAmJiAhaXNBbGxTZWxlY3RlZCgpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgICA8L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIiRldmVudCA/IG9uUm93Q2hlY2tlZChyb3cpIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cInNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdylcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiB0YWJsZUNvbHVtbnM7IGxldCBpID0gaW5kZXhcIiBtYXRDb2x1bW5EZWY9XCJ7eyBjb2x1bW4uRmllbGQgfX1cIj5cbiAgICAgICAgICAgIDxtYXQtaGVhZGVyLWNlbGxcbiAgICAgICAgICAgICAgICAqbWF0SGVhZGVyQ2VsbERlZlxuICAgICAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwiaGVhZGVyRHJhZ1N0YXJ0ZWQoaSlcIlxuICAgICAgICAgICAgICAgIFtjZGtEcmFnRGF0YV09XCJ7IG5hbWU6IGNvbHVtbi5GaWVsZCB9XCJcbiAgICAgICAgICAgICAgICBbY2RrRHJhZ0Rpc2FibGVkXT1cIiFjYW5Db2x1bW5CZU1vdmVkKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENvbHVtbkNsYXNzTmFtZShjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJjb2x1bW4uVGl0bGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0ZpbHRlcmluZ0VuYWJsZWRPbkNvbHVtbihjb2x1bW4pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIG1hdC1zb3J0LWhlYWRlciBbY2xhc3Muc2VsZWN0ZWRdPVwiaGFzRmlsdGVyc09yU29ydGluZ0VuYWJsZWQoY29sdW1uKVwiPnt7IGNvbHVtbi5UaXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPVwidGhpcy5ibHVyKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5GaWx0ZXJEaWFsb2coY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwibm9Sb3dzRGlzcGxheWVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJoYXNGaWx0ZXJzT3JTb3J0aW5nRW5hYmxlZChjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmZpbHRlcl9saXN0PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbFxuICAgICAgICAgICAgICAgICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnQ7IGxldCByb3dJbmRleCA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRDb2x1bW5DbGFzc05hbWUoY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImlzQ2VsbENsaWNrYWJsZShjb2x1bW4pID8gb25Sb3dDaGVja2VkKGVsZW1lbnQpIDogbnVsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBbbWF0VG9vbHRpcF09XCJnZXRUb29sVGlwKGVsZW1lbnQsIGNvbHVtbilcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiY29sdW1uLkNvbHVtblR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gRGF0ZVRpbWUgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5EYXRlVGltZVwiPiB7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIERhdGUgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5EYXRlXCI+IHt7IGdldENvbnRlbnQoY29sdW1uLCBlbGVtZW50KSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVGltZSAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJjb2x1bW5UeXBlLlRpbWVcIj4ge3sgZ2V0Q29udGVudChjb2x1bW4sIGVsZW1lbnQpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTdHJpbmcgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5TdHJpbmdcIj4ge3sgZ2V0Q29udGVudChjb2x1bW4sIGVsZW1lbnQpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBMaW5rIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImNvbHVtblR5cGUuTGlua1wiIChjbGljayk9XCJvbkh5cGVyTGlua0NsaWNrZWQoZWxlbWVudCwgY29sdW1uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiPnt7IGdldENvbnRlbnQoY29sdW1uLCBlbGVtZW50KSB9fTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gSW1hZ2UgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJjb2x1bW5UeXBlLkltYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJ7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX1cIiBhbHQ9XCJpbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gQWN0aW9ucyAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5BY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFwcC1hZHZhbmNlLXRhYmxlLXJvdy1tZW51XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3dEYXRhXT1cImVsZW1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFibGVSb3dNZW51XT1cIlJvd0FjdGlvbnNDb25maWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWN0aW9uU2VsZWN0ZWQpPVwib25BY3Rpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9hcHAtYWR2YW5jZS10YWJsZS1yb3ctbWVudT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gRHJvcGRvd24gLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImNvbHVtblR5cGUuRHJvcERvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXBwLWFkdmFuY2VkLXRhYmxlLXJvdy1kcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm93RGF0YV09XCJlbGVtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NvbHVtbkRhdGFdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhYmxlUm93RHJvcERvd25dPVwiUm93RHJvcERvd25Db25maWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZHJvcERvd25TZWxlY3RlZCk9XCJvbkRyb3BEb3duU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvYXBwLWFkdmFuY2VkLXRhYmxlLXJvdy1kcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gSWNvbiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImNvbHVtblR5cGUuSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImNvbHVtbi5UaXRsZSArICctJyArIGVsZW1lbnRbY29sdW1uLklkRmllbGQhXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaWNvbkNsaWNrKGVsZW1lbnQsIGNvbHVtbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPiB7eyBjb2x1bW4uTWF0SWNvbk5hbWUgfX08L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBOdW1iZXIgSW5wdXQgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJjb2x1bW5UeXBlLk51bWJlcklucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmx5TnVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWluXT1cImdldE1pblZhbHVlRm9yTnVtYmVySW5wdXQoZWxlbWVudCwgY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4XT1cImdldE1heFZhbHVlRm9yTnVtYmVySW5wdXQoZWxlbWVudCwgY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm51bWJlcklucHV0Q2hhbmdlKGVsZW1lbnQsIGNvbHVtbiwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZWxlbWVudFtjb2x1bW4uRmllbGRdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTdWZmaXggLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG1hdFN1ZmZpeCBjbGFzcz1cInN1ZmZpeFwiICpuZ0lmPVwiY29sdW1uLlN1ZmZpeFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZWxlbWVudFtjb2x1bW4uU3VmZml4LkZpZWxkXSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBTdWZmaXggLS0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3VmZml4XCIgKm5nSWY9XCJjb2x1bW4uU3VmZml4ICYmIGNvbHVtbi5Db2x1bW5UeXBlICE9PSBjb2x1bW5UeXBlLk51bWJlcklucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBlbGVtZW50W2NvbHVtbi5TdWZmaXguRmllbGRdIH19XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbWF0LWhlYWRlci1yb3c+XG4gICAgICAgIDxtYXQtcm93XG4gICAgICAgICAgICAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1uc1wiXG4gICAgICAgICAgICBpZD1cInt7IHJvdy5JZCB9fVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJnZXRSb3dDbGFzc05hbWUoKVwiXG4gICAgICAgICAgICAoZGJsY2xpY2spPVwib25Eb3VibGVDbGljayhyb3cpXCJcbiAgICAgICAgPjwvbWF0LXJvdz5cbiAgICA8L21hdC10YWJsZT5cblxuICAgIDxkaXYgKm5nSWY9XCJub1Jvd3NEaXNwbGF5ZWRcIiBjbGFzcz1cIm5vLXJlY29yZHNcIj5cbiAgICAgICAgPHNwYW4gaTE4bj1cIkBAdGFibGUtbm9SZXN1bHRGb3VuZFwiPk5vIG1hdGNoaW5nIHJlY29yZHMgZm91bmQ8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==