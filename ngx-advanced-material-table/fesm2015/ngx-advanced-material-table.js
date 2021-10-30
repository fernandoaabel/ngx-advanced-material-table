import '@angular/localize/init';
import * as i0 from '@angular/core';
import { Pipe, Component, Inject, Injectable, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i2 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/material/form-field';
import * as i6 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i7 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i8 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i9 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i11 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';
import * as i10 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import * as i7$1 from '@angular/material/paginator';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import * as i8$1 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as i6$1 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i13 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i14 from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { MatRippleModule } from '@angular/material/core';

var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["String"] = 0] = "String";
    ColumnType[ColumnType["DateTime"] = 1] = "DateTime";
    ColumnType[ColumnType["Date"] = 2] = "Date";
    ColumnType[ColumnType["Time"] = 3] = "Time";
    ColumnType[ColumnType["Actions"] = 4] = "Actions";
    ColumnType[ColumnType["DropDown"] = 5] = "DropDown";
    ColumnType[ColumnType["Icon"] = 6] = "Icon";
    ColumnType[ColumnType["NumberInput"] = 7] = "NumberInput";
    ColumnType[ColumnType["DropDownDynamic"] = 8] = "DropDownDynamic";
    ColumnType[ColumnType["Image"] = 9] = "Image";
    ColumnType[ColumnType["Link"] = 10] = "Link";
})(ColumnType || (ColumnType = {}));

class Value {
    static getDistinctItems(items) {
        const newArray = [];
        items.forEach((item) => {
            if (newArray.indexOf(item) === -1) {
                newArray.push(item);
            }
        });
        return newArray;
    }
    static splitStringBySeperator(text, seperator = ',') {
        if (Value.isNullOrWhiteSpace(text)) {
            return [];
        }
        let strs = text.split(seperator);
        strs = strs.map((str) => str.trim());
        return strs.filter((str) => Value.isNotNullOrWhiteSpace(str));
    }
    static extractValueSplitBySeparator(value, separator, index) {
        return value.indexOf(separator) > -1 ? value.split('_')[index] : '';
    }
    static isNumber(value) {
        if (Value.isNotNullOrUndefined(value) && /^\d+(\.\d+)?$/.test(value.toString())) {
            return true;
        }
        return false;
    }
    static isNumberWithPattern(value, pattern) {
        if (Value.isNotNullOrUndefined(value) && pattern.test(value.toString())) {
            return true;
        }
        return false;
    }
    static clearArray(value) {
        if (Value.isArray(value)) {
            value.splice(0, value.length);
        }
    }
    static isArray(value) {
        if (Value.isNotNullOrUndefined(value) && value instanceof Array) {
            return true;
        }
        return false;
    }
    static isString(value) {
        if (typeof value === 'string') {
            return true;
        }
        return false;
    }
    static isArrayWithItems(value) {
        if (Value.isArray(value) && value.length > 0) {
            return true;
        }
        return false;
    }
    static isNullOrUndefined(value) {
        return !Value.isNotNullOrUndefined(value);
    }
    static isNotNullOrUndefined(value) {
        if (value !== undefined && value !== null) {
            return true;
        }
        return false;
    }
    static isNotNullOrWhiteSpace(value) {
        if (Value.isNotNullOrUndefined(value) && value.trim() !== '') {
            return true;
        }
        return false;
    }
    static isNullOrWhiteSpace(value) {
        return !Value.isNotNullOrWhiteSpace(value);
    }
    static isStringContains(source, toBeMatched, caseSensitive = true) {
        if (!source || !toBeMatched) {
            return false;
        }
        if (caseSensitive) {
            if (source.indexOf(toBeMatched) !== -1) {
                return true;
            }
            return false;
        }
        else {
            if (source.toLocaleLowerCase().indexOf(toBeMatched.toLocaleLowerCase()) !== -1) {
                return true;
            }
            return false;
        }
    }
    static isArrayContains(sourceList, toBeMatched, caseSensitive = true) {
        if (!sourceList || !toBeMatched) {
            return false;
        }
        for (const source of sourceList) {
            if (caseSensitive) {
                if (source.indexOf(toBeMatched) !== -1) {
                    return true;
                }
            }
            else {
                if (source.toLocaleLowerCase().indexOf(toBeMatched.toLocaleLowerCase()) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
}

var DialogActionType;
(function (DialogActionType) {
    DialogActionType["Ok"] = "Ok";
    DialogActionType["Cancel"] = "Cancel";
})(DialogActionType || (DialogActionType = {}));

class FilterColumnValuesPipe {
    transform(items, searchText) {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter((it) => {
            return it.name.toString().toLowerCase().includes(searchText);
        });
    }
}
FilterColumnValuesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnValuesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FilterColumnValuesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnValuesPipe, name: "filterCriteria" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnValuesPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'filterCriteria' }]
        }] });

class FilterColumnsComponent {
    constructor(dialogRef, fb, context) {
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.context = context;
        this.searchFiltersValue = '';
        this.distinctColumnValues = [];
        this.cancelResponse = { action: DialogActionType.Cancel };
        this.columnType = ColumnType;
        this.selectedColumn = this.context.selectedColumn;
        this.distinctColumnValues = this.sortColumns(this.context.distinctData);
        this.initialSortingDirection = this.selectedColumn.SortDirection;
        this.filterForm = this.fb.group({
            SearchFilters: [''],
        });
    }
    ngOnInit() {
        this.filterForm.controls.SearchFilters.valueChanges.subscribe(() => this.onSearchFiltersValueChanged());
    }
    onSearchFiltersValueChanged() {
        this.searchFiltersValue = this.filterForm.controls.SearchFilters.value;
    }
    onSelectFilter(change) {
        this.distinctColumnValues.forEach((x) => {
            if (x.name === change.source.value) {
                x.checked = change.checked;
            }
        });
    }
    onSortingValueChange(value) {
        if (this.selectedColumn.SortDirection === value) {
            this.selectedColumn.SortDirection = undefined;
        }
        else {
            this.selectedColumn.SortDirection = value;
        }
    }
    onApplyFiltersButton() {
        this.selectedColumn.FilterValues = [];
        this.selectedColumn.FilterValues = this.distinctColumnValues.filter((x) => x.checked === true).map((x) => x.name);
        const response = {
            action: DialogActionType.Ok,
            sortingHasChanged: this.initialSortingDirection !== this.selectedColumn.SortDirection,
            selectedColumn: this.selectedColumn,
        };
        this.dialogRef.close(response);
    }
    sortColumns(columns) {
        if (columns.length === 0) {
            return [];
        }
        if (columns[0].name instanceof Date) {
            columns.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
        else if (Value.isNumber(columns[0].name)) {
            columns.sort((a, b) => a.name - b.name);
        }
        else if (Value.isString(columns[0].name)) {
            columns.sort((a, b) => a.name.localeCompare(b.name));
        }
        return columns;
    }
}
FilterColumnsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnsComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.FormBuilder }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
FilterColumnsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.12", type: FilterColumnsComponent, selector: "filter-columns", ngImport: i0, template: "<div class=\"filter-columns\">\n    <button mat-icon-button class=\"close-icon\" [mat-dialog-close]=\"cancelResponse\">\n        <mat-icon>close</mat-icon>\n    </button>\n\n    <h3 mat-dialog-title i18n=\"@@filter-columns-label-filterRowsHeading\">Filter rows</h3>\n\n    <mat-dialog-content>\n        <form id=\"formFilterRoutesPlanning\" role=\"form\" [formGroup]=\"filterForm\">\n            <mat-form-field>\n                <mat-label i18n=\"@@formControl-label-filterGrid\">Search filters</mat-label>\n                <input matInput type=\"text\" formControlName=\"SearchFilters\" id=\"FilterString\" />\n            </mat-form-field>\n        </form>\n\n        <cdk-virtual-scroll-viewport itemSize=\"15\" class=\"filter-column-viewport\">\n            <span *ngIf=\"distinctColumnValues.length === 0\" i18n=\"@@routeplanning-filter-column-no-values\">No available values</span>\n\n            <div\n                class=\"filter-column-item\"\n                *cdkVirtualFor=\"let value of distinctColumnValues | filterCriteria: searchFiltersValue; let i = index\"\n            >\n                <mat-checkbox [value]=\"value.name\" [checked]=\"value.checked\" (change)=\"onSelectFilter($event)\">\n                    <span> {{ value.displayedName }}</span>\n                </mat-checkbox>\n            </div>\n        </cdk-virtual-scroll-viewport>\n\n        <mat-button-toggle-group name=\"sortDirection\" value=\"{{ selectedColumn.SortDirection }}\">\n            <mat-button-toggle id=\"filter-columns-sort-ascending\" value=\"asc\" (change)=\"onSortingValueChange($event.value)\">\n                <span i18n=\"@@filterColumns-btn-ascsort\">Ascending</span>\n                <mat-icon>arrow_upward</mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle id=\"filter-columns-sort-descending\" value=\"desc\" (change)=\"onSortingValueChange($event.value)\">\n                <span i18n=\"@@filterColumns-btn-descsort\">Descending</span>\n                <mat-icon>arrow_downward</mat-icon>\n            </mat-button-toggle>\n        </mat-button-toggle-group>\n    </mat-dialog-content>\n\n    <mat-dialog-actions>\n        <button mat-raised-button id=\"filter-columns-close\" [mat-dialog-close]=\"cancelResponse\">\n            <span i18n=\"@@action-btn-cancel\">Cancel</span>\n        </button>\n        <button mat-raised-button id=\"filter-columns-filter\" (click)=\"onApplyFiltersButton()\" color=\"accent\">\n            <span i18n=\"@@action-btn-filter\">Filter</span>\n        </button>\n    </mat-dialog-actions>\n</div>\n", styles: [".filter-columns{position:relative!important}.filter-columns .close-icon{position:absolute;top:-20px;right:-20px}.filter-columns mat-form-field{width:100%}.filter-columns .filter-column-viewport{height:13em;border:1px solid lightgray}.filter-columns .filter-column-item{height:25px;padding:.2em .5em}.filter-columns mat-button-toggle-group{margin-top:16px;width:100%}.filter-columns mat-button-toggle-group mat-button-toggle{flex:1 1 auto}.filter-columns mat-dialog-actions button{flex:1 1 auto}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i5.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i6.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { type: i7.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "id", "labelPosition", "name", "required", "checked", "disabled", "indeterminate", "aria-describedby", "value"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { type: i8.MatButtonToggle, selector: "mat-button-toggle", inputs: ["disableRipple", "aria-labelledby", "tabIndex", "appearance", "checked", "disabled", "id", "name", "aria-label", "value"], outputs: ["change"], exportAs: ["matButtonToggle"] }], directives: [{ type: i1.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["type", "mat-dialog-close", "aria-label", "matDialogClose"], exportAs: ["matDialogClose"] }, { type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5.MatLabel, selector: "mat-label" }, { type: i9.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["id", "disabled", "required", "type", "value", "readonly", "placeholder", "errorStateMatcher", "aria-describedby"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i8.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }], pipes: { "filterCriteria": FilterColumnValuesPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'filter-columns',
                    templateUrl: './filter-columns.component.html',
                    styleUrls: ['./filter-columns.component.scss'],
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: i2.FormBuilder }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class ColumnHelper {
    static getContent(field, element) {
        if (field.indexOf('.') === -1) {
            return element[field];
        }
        // Activate the way to get text from  Class.Element.XX.XX.XX
        const fieldNames = field.split('.');
        let returnValue = element[fieldNames[0]];
        for (let index = 1; index < fieldNames.length; index++) {
            returnValue = returnValue[fieldNames[index]];
        }
        return returnValue !== null && returnValue !== void 0 ? returnValue : '';
    }
    static getToolTip(column, element) {
        if (!element || !column || !element[column.Field]) {
            return '';
        }
        let val;
        switch (column.ColumnType) {
            case ColumnType.Date:
            case ColumnType.DateTime:
            case ColumnType.Time:
            case ColumnType.Icon:
            case ColumnType.DropDown:
            case ColumnType.String:
            case ColumnType.Link:
            case ColumnType.Image:
                val = element[column.Field];
                break;
            default:
                val = '';
                break;
        }
        return val;
    }
    static isImmutableColumn(column) {
        // Columns types that cannot be hidden, moved or filtered
        return column.ColumnType === ColumnType.Actions || column.ColumnType === ColumnType.Icon;
    }
    static canColumnBeHidden(column) {
        return !this.isImmutableColumn(column);
    }
    static canColumnBeMoved(column) {
        return !this.isImmutableColumn(column);
    }
    static canColumnBeFiltered(column) {
        return !this.isImmutableColumn(column);
    }
    static isFilteringEnabledOnColumn(column) {
        if (!this.canColumnBeFiltered(column)) {
            return false;
        }
        if (!column.Title) {
            return false;
        }
        return true;
    }
    static hasFiltersOrSortingEnabled(column) {
        if (!column) {
            return false;
        }
        if (column.SortDirection) {
            return true;
        }
        if (column.FilterValues && column.FilterValues.length > 0) {
            return true;
        }
        return false;
    }
    static isCellClickable(column) {
        switch (column.ColumnType) {
            case ColumnType.Actions:
            case ColumnType.Icon:
            case ColumnType.DropDown:
            case ColumnType.NumberInput:
            case ColumnType.DropDownDynamic:
                return false;
            default:
                return true;
        }
    }
}

class TableBuilderHelper {
    static buildTable(dataArray, columns, columnNames) {
        let out = '<table><thead><tr>';
        for (const h of columnNames) {
            out += '<th>' + h + '</th>';
        }
        out += '</tr></thead><tbody>';
        for (const data of dataArray) {
            out += '<tr>';
            for (const j of columns) {
                if (j !== 'select' && j !== 'actions') {
                    out += '<td>' + (ColumnHelper.getContent(j, data) || '-') + '</td>';
                }
            }
            out += '</tr>';
        }
        out += '</tbody></table>';
        return out;
    }
    static printPageBuilderDefault(table, printedOnLabel = 'Printed On') {
        return ('<html><head>' +
            '<style type="text/css" media="print">' +
            '  @page { size: auto;   margin: 25px 0 25px 0; }' +
            '</style>' +
            '<style type="text/css" media="all">' +
            'table{border-collapse: collapse; font-size: 12px; }\n' +
            'table, th, td {border: 1px solid grey}\n' +
            'th, td {text-align: center; vertical-align: middle;}\n' +
            'p {font-weight: bold; margin-left:20px }\n' +
            'table { width:94%; margin-left:3%; margin-right:3%}\n' +
            'div.bs-table-print { text-align:center;}\n' +
            '</style></head><title>Print Table</title><body>' +
            '<p>' +
            printedOnLabel +
            ': ' +
            new Date() +
            ' </p>' +
            '<div class="bs-table-print">' +
            table +
            '</div></body></html>');
    }
}

/**
 * Comunication with the localStorage
 */
class LocalStorageService {
    set(key, value) {
        localStorage.setItem(key, value);
    }
    get(key) {
        return localStorage.getItem(key);
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    setAsJson(localStorageKey, state, replacer) {
        localStorage.setItem(localStorageKey, JSON.stringify(state, replacer));
    }
    getAsJson(localStorageKey) {
        let storedValue = localStorage.getItem(localStorageKey);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    exists(localStorageKey) {
        if (localStorage.getItem(localStorageKey)) {
            return true;
        }
        else {
            return false;
        }
    }
}
LocalStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: LocalStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class AdvancedMaterialTableComponent {
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
AdvancedMaterialTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: AdvancedMaterialTableComponent, deps: [{ token: i1.MatDialog }, { token: LocalStorageService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AdvancedMaterialTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.12", type: AdvancedMaterialTableComponent, selector: "ngx-advanced-material-table", inputs: { tableConfiguration: "tableConfiguration", actionConfiguration: "actionConfiguration", tableColumns: "tableColumns", data: "data", selectedData: "selectedData" }, outputs: { actionSelected: "actionSelected", iconClicked: "iconClicked", rowSelected: "rowSelected", numberChange: "numberChange", catalogueClicked: "catalogueClicked", searchCatalogueClicked: "searchCatalogueClicked", clearCatalogueClicked: "clearCatalogueClicked", hyperLinkClicked: "hyperLinkClicked" }, viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div>\n    <div class=\"table-top-panel\" *ngIf=\"tableConfiguration.AllowFilter || tableConfiguration.AllowActions\">\n        <div class=\"table-filter\">\n            <ng-container *ngIf=\"tableConfiguration.AllowFilter\">\n                <mat-form-field>\n                    <input\n                        matInput\n                        id=\"{{ tableConfiguration.Id }}-table-filter-field\"\n                        (keyup)=\"applyMainFilter($event.target)\"\n                        i18n-placeholder=\"@@placeholder-text-filterResult\"\n                        placeholder=\"Filter on results...\"\n                    />\n                </mat-form-field>\n            </ng-container>\n        </div>\n\n        <div class=\"table-actions\" *ngIf=\"tableConfiguration.AllowActions\">\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-clearAllFilters\"\n                onclick=\"this.blur()\"\n                (click)=\"clearAllFilters()\"\n                [matTooltip]=\"templateClearAllFilters.innerText\"\n            >\n                <mat-icon>filter_list_off</mat-icon>\n            </button>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-showColumns\"\n                [matMenuTriggerFor]=\"visibleColumnsMenu\"\n                [matTooltip]=\"templateShowHide.innerText\"\n            >\n                <mat-icon>view_column</mat-icon>\n            </button>\n\n            <mat-menu #visibleColumnsMenu=\"matMenu\">\n                <ng-template matMenuContent>\n                    <div id=\"{{ tableConfiguration.Id }}-table-columns-checkbox\">\n                        <div\n                            mat-menu-item\n                            *ngFor=\"let column of tableColumns; let i = index\"\n                            (click)=\"onColumnChange(i, $event); $event.stopPropagation()\"\n                        >\n                            <mat-icon *ngIf=\"column.Display\" color=\"accent\">check_box</mat-icon>\n                            <mat-icon *ngIf=\"!column.Display\">check_box_outline_blank</mat-icon>\n                            <span>{{ column.Title }}</span>\n                        </div>\n                    </div>\n                </ng-template>\n            </mat-menu>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-export-to-excel-button\"\n                [matTooltip]=\"templateExportCsv.innerText\"\n                (click)=\"exportToExcel()\"\n                [disabled]=\"noRowsDisplayed\"\n            >\n                <mat-icon>file_download</mat-icon>\n            </button>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-print-button\"\n                (click)=\"sendToPrinter()\"\n                [matTooltip]=\"templatePrint.innerText\"\n                [disabled]=\"noRowsDisplayed\"\n            >\n                <mat-icon>print</mat-icon>\n            </button>\n\n            <template #templateShowHide i18n=\"@@table-tooltip-grid-showColumns\">Select visible columns</template>\n            <template #templateExportCsv i18n=\"@@table-tooltip-export-csv\">Export to Excel</template>\n            <template #templateClearAllFilters i18n=\"@@table-tooltip-clear-all-filters\">Clear filters and sorting</template>\n            <template #templatePrint i18n=\"@@action-btn-print\">Print</template>\n        </div>\n    </div>\n\n    <div class=\"table-pagination\" *ngIf=\"tableConfiguration.AllowPagination\">\n        <mat-paginator\n            [pageSizeOptions]=\"[10, 25, 50, 100]\"\n            id=\"{{ tableConfiguration.Id }}-table-paginator\"\n            showFirstLastButtons\n        ></mat-paginator>\n    </div>\n\n    <mat-table\n        id=\"{{ tableConfiguration.Id }}-table\"\n        [dataSource]=\"dataSource\"\n        matSort\n        matSortDisableClear=\"false\"\n        cdkDropListGroup\n        cdkDropList\n        cdkDropListLockAxis=\"x\"\n        cdkDropListOrientation=\"horizontal\"\n        (cdkDropListDropped)=\"headerDropListDropped($event)\"\n    >\n        <!-- Select Check Box Column -->\n        <ng-container matColumnDef=\"select\">\n            <mat-header-cell *matHeaderCellDef>\n                <mat-checkbox\n                    *ngIf=\"tableConfiguration.MultipleSelect\"\n                    (change)=\"$event ? masterToggle() : null\"\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                >\n                </mat-checkbox>\n            </mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <mat-checkbox\n                    (click)=\"$event.stopPropagation()\"\n                    (change)=\"$event ? onRowChecked(row) : null\"\n                    [checked]=\"selection.isSelected(row)\"\n                >\n                </mat-checkbox>\n            </mat-cell>\n        </ng-container>\n\n        <ng-container *ngFor=\"let column of tableColumns; let i = index\" matColumnDef=\"{{ column.Field }}\">\n            <mat-header-cell\n                *matHeaderCellDef\n                cdkDrag\n                (cdkDragStarted)=\"headerDragStarted(i)\"\n                [cdkDragData]=\"{ name: column.Field }\"\n                [cdkDragDisabled]=\"!canColumnBeMoved(column)\"\n                [ngClass]=\"getColumnClassName(column)\"\n                [matTooltip]=\"column.Title\"\n            >\n                <ng-container *ngIf=\"isFilteringEnabledOnColumn(column)\">\n                    <span mat-sort-header [class.selected]=\"hasFiltersOrSortingEnabled(column)\">{{ column.Title }}</span>\n                    <button\n                        mat-icon-button\n                        disableRipple\n                        onclick=\"this.blur()\"\n                        (click)=\"openFilterDialog(column)\"\n                        [disabled]=\"noRowsDisplayed\"\n                        [class.selected]=\"hasFiltersOrSortingEnabled(column)\"\n                    >\n                        <mat-icon>filter_list</mat-icon>\n                    </button>\n                </ng-container>\n            </mat-header-cell>\n            <mat-cell\n                *matCellDef=\"let element; let rowIndex = index\"\n                [ngClass]=\"getColumnClassName(column)\"\n                (click)=\"isCellClickable(column) ? onRowChecked(element) : null\"\n            >\n                <div [matTooltip]=\"getToolTip(element, column)\">\n                    <ng-container [ngSwitch]=\"column.ColumnType\">\n                        <!-- DateTime -->\n                        <span *ngSwitchCase=\"columnType.DateTime\"> {{ getContent(column, element) }}</span>\n                        <!-- Date -->\n                        <span *ngSwitchCase=\"columnType.Date\"> {{ getContent(column, element) }}</span>\n                        <!-- Time -->\n                        <span *ngSwitchCase=\"columnType.Time\"> {{ getContent(column, element) }}</span>\n                        <!-- String -->\n                        <span *ngSwitchCase=\"columnType.String\"> {{ getContent(column, element) }}</span>\n                        <!-- Link -->\n                        <span *ngSwitchCase=\"columnType.Link\" (click)=\"onHyperLinkClicked(element, column)\">\n                            <a href=\"{{ getContent(column, element) }}\" target=\"_blank\" rel=\"noopener\">{{ getContent(column, element) }}</a>\n                        </span>\n                        <!-- Image -->\n                        <div *ngSwitchCase=\"columnType.Image\">\n                            <img src=\"{{ getContent(column, element) }}\" alt=\"image\" />\n                        </div>\n                        <!-- Actions -->\n                        <!-- <ng-container *ngSwitchCase=\"columnType.Actions\">\n                            <app-advance-table-row-menu\n                                [rowData]=\"element\"\n                                [tableRowMenu]=\"RowActionsConfig\"\n                                (actionSelected)=\"onActionSelected($event)\"\n                            ></app-advance-table-row-menu>\n                        </ng-container> -->\n                        <!-- Dropdown -->\n                        <!-- <ng-container *ngSwitchCase=\"columnType.DropDown\">\n                            <app-advanced-table-row-dropdown\n                                [rowData]=\"element\"\n                                [columnData]=\"column\"\n                                [tableRowDropDown]=\"RowDropDownConfig\"\n                                (dropDownSelected)=\"onDropDownSelected($event)\"\n                            ></app-advanced-table-row-dropdown>\n                        </ng-container> -->\n                        <!-- Icon -->\n                        <ng-container *ngSwitchCase=\"columnType.Icon\">\n                            <button\n                                [id]=\"column.Title + '-' + element[column.IdField!]\"\n                                mat-icon-button\n                                (click)=\"iconClick(element, column)\"\n                            >\n                                <mat-icon> {{ column.MatIconName }}</mat-icon>\n                                {{ getContent(column, element) }}\n                            </button>\n                        </ng-container>\n                        <!-- Number Input -->\n                        <ng-container *ngSwitchCase=\"columnType.NumberInput\">\n                            <mat-form-field floatLabel=\"never\">\n                                <input\n                                    matInput\n                                    onlyNumbers\n                                    type=\"number\"\n                                    [min]=\"getMinValueForNumberInput(element, column)\"\n                                    [max]=\"getMaxValueForNumberInput(element, column)\"\n                                    (change)=\"numberInputChange(element, column, $event)\"\n                                    [value]=\"element[column.Field]\"\n                                />\n                                <!-- Suffix -->\n                                <span matSuffix class=\"suffix\" *ngIf=\"column.Suffix\">\n                                    {{ element[column.Suffix.Field] }}\n                                </span>\n                            </mat-form-field>\n                        </ng-container>\n                    </ng-container>\n                    <!-- Suffix -->\n                    <span class=\"suffix\" *ngIf=\"column.Suffix && column.ColumnType !== columnType.NumberInput\">\n                        {{ element[column.Suffix.Field] }}\n                    </span>\n                </div>\n            </mat-cell>\n        </ng-container>\n\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n        <mat-row\n            *matRowDef=\"let row; columns: displayedColumns\"\n            id=\"{{ row.Id }}\"\n            [ngClass]=\"getRowClassName()\"\n            (dblclick)=\"onDoubleClick(row)\"\n        ></mat-row>\n    </mat-table>\n\n    <div *ngIf=\"noRowsDisplayed\" class=\"no-records\">\n        <span i18n=\"@@table-noResultFound\">No matching records found</span>\n    </div>\n</div>\n", styles: [".mat-table{border:1px solid rgba(0,0,0,.12);border-bottom:0}.mat-header-row{min-height:40px;height:40px}.mat-row{min-height:40px;height:40px;align-items:stretch}.mat-row:hover{background-color:#4d74a8}.mat-row:hover .mat-cell,.mat-row:hover .mat-icon{color:#fff}.mat-row.row-with-image{height:55px}.mat-row .mat-cell>div{width:100%;display:flex;align-items:center}.mat-row .mat-cell .mat-form-field{min-width:50%}.mat-row .mat-cell img{height:55px;min-width:100px;margin:0}.mat-header-cell,.mat-cell{min-height:40px;border-right:1px solid rgba(0,0,0,.12);padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-header-cell.mat-column-select,.mat-cell.mat-column-select{padding:0 8px;width:20px;flex:none;justify-content:center}.mat-header-cell:last-child,.mat-cell:last-child{border-right:0}.no-records{height:48px;display:flex;align-items:center;justify-content:center;background:white}.table-top-panel{display:flex;justify-content:space-between;height:1.25em;padding:1em 0 1.5em}.table-actions{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination h4{margin:0;text-transform:uppercase;font-weight:bold}.table-pagination .mat-paginator{background:transparent}.table-pagination .mat-form-field{width:4em;margin:0 .2em 0 .5em}.mat-header-cell{display:flex;align-items:inherit;align-content:stretch}.mat-header-cell .mat-icon{font-size:1em}.mat-header-cell span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:bold}.mat-header-cell.icons,.mat-header-cell.actions,.mat-cell.icons,.mat-cell.actions{padding:0;width:40px;flex:none;justify-content:center}.mat-header-cell.images,.mat-cell.images{padding:2px;min-width:100px;flex:none;justify-content:center}\n"], components: [{ type: i5.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i6$1.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { type: i6$1.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { type: i7$1.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }, { type: i8$1.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i7.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "id", "labelPosition", "name", "required", "checked", "disabled", "indeterminate", "aria-describedby", "value"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { type: i10.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "arrowPosition", "sortActionDescription", "disableClear", "mat-sort-header", "start"], exportAs: ["matSortHeader"] }, { type: i8$1.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i8$1.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }], directives: [{ type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["id", "disabled", "required", "type", "value", "readonly", "placeholder", "errorStateMatcher", "aria-describedby"], exportAs: ["matInput"] }, { type: i13.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i6$1.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { type: i6$1.MatMenuContent, selector: "ng-template[matMenuContent]" }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortActive"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i14.CdkDropListGroup, selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { type: i14.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i8$1.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i8$1.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i8$1.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i8$1.MatCellDef, selector: "[matCellDef]" }, { type: i8$1.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i14.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i11.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i11.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5.MatSuffix, selector: "[matSuffix]" }, { type: i8$1.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i8$1.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: AdvancedMaterialTableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-advanced-material-table',
                    templateUrl: './ngx-advanced-material-table.component.html',
                    styleUrls: ['./ngx-advanced-material-table.component.scss'],
                }]
        }], ctorParameters: function () { return [{ type: i1.MatDialog }, { type: LocalStorageService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { tableConfiguration: [{
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

class MaterialModule {
}
MaterialModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: MaterialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MaterialModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: MaterialModule, exports: [CdkTableModule,
        DragDropModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        ScrollingModule] });
MaterialModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: MaterialModule, providers: [], imports: [CdkTableModule,
        DragDropModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: MaterialModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [
                        CdkTableModule,
                        DragDropModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCheckboxModule,
                        MatDialogModule,
                        MatIconModule,
                        MatInputModule,
                        MatMenuModule,
                        MatPaginatorModule,
                        MatRippleModule,
                        MatSortModule,
                        MatTableModule,
                        MatTooltipModule,
                        ScrollingModule,
                    ],
                    providers: [],
                }]
        }] });

class NgxAdvancedMaterialTableModule {
}
NgxAdvancedMaterialTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: NgxAdvancedMaterialTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxAdvancedMaterialTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: NgxAdvancedMaterialTableModule, declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe], imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule], exports: [AdvancedMaterialTableComponent] });
NgxAdvancedMaterialTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: NgxAdvancedMaterialTableModule, imports: [[CommonModule, FormsModule, ReactiveFormsModule, MaterialModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: NgxAdvancedMaterialTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
                    declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe],
                    exports: [AdvancedMaterialTableComponent],
                    entryComponents: [FilterColumnsComponent],
                }]
        }] });

/*
 * Public API Surface of ngx-advanced-material-table
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AdvancedMaterialTableComponent, ColumnType, DialogActionType, FilterColumnsComponent, NgxAdvancedMaterialTableModule };
//# sourceMappingURL=ngx-advanced-material-table.js.map
