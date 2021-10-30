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
import * as i6 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i7 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i3$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i9 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i10 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as _ from 'lodash';
import * as i5$1 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import * as i13 from '@angular/material/paginator';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import * as i4$1 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as i6$1 from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i10$1 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i12 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
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
FilterColumnValuesPipe.ɵfac = function FilterColumnValuesPipe_Factory(t) { return new (t || FilterColumnValuesPipe)(); };
FilterColumnValuesPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterCriteria", type: FilterColumnValuesPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterColumnValuesPipe, [{
        type: Pipe,
        args: [{ name: 'filterCriteria' }]
    }], null, null); })();

function FilterColumnsComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵi18n(1, 19);
    i0.ɵɵelementEnd();
} }
function FilterColumnsComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelementStart(1, "mat-checkbox", 21);
    i0.ɵɵlistener("change", function FilterColumnsComponent_div_14_Template_mat_checkbox_change_1_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.onSelectFilter($event); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("value", value_r2.name)("checked", value_r2.checked);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", value_r2.displayedName, "");
} }
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
FilterColumnsComponent.ɵfac = function FilterColumnsComponent_Factory(t) { return new (t || FilterColumnsComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef), i0.ɵɵdirectiveInject(i2.FormBuilder), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); };
FilterColumnsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FilterColumnsComponent, selectors: [["filter-columns"]], decls: 34, vars: 9, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_filter_columns_label_filterRowsHeading$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_1 = goog.getMsg("Filter rows");
        i18n_0 = MSG_EXTERNAL_filter_columns_label_filterRowsHeading$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:@@filter-columns-label-filterRowsHeading:Filter rows`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_formControl_label_filterGrid$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_3 = goog.getMsg("Search filters");
        i18n_2 = MSG_EXTERNAL_formControl_label_filterGrid$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:@@formControl-label-filterGrid:Search filters`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_filterColumns_btn_ascsort$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_5 = goog.getMsg("Ascending");
        i18n_4 = MSG_EXTERNAL_filterColumns_btn_ascsort$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:@@filterColumns-btn-ascsort:Ascending`;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_filterColumns_btn_descsort$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_7 = goog.getMsg("Descending");
        i18n_6 = MSG_EXTERNAL_filterColumns_btn_descsort$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_7;
    }
    else {
        i18n_6 = $localize `:@@filterColumns-btn-descsort:Descending`;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_action_btn_cancel$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_9 = goog.getMsg("Cancel");
        i18n_8 = MSG_EXTERNAL_action_btn_cancel$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_9;
    }
    else {
        i18n_8 = $localize `:@@action-btn-cancel:Cancel`;
    } let i18n_10; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_action_btn_filter$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_11 = goog.getMsg("Filter");
        i18n_10 = MSG_EXTERNAL_action_btn_filter$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS_11;
    }
    else {
        i18n_10 = $localize `:@@action-btn-filter:Filter`;
    } let i18n_12; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_routeplanning_filter_column_no_values$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS__13 = goog.getMsg("No available values");
        i18n_12 = MSG_EXTERNAL_routeplanning_filter_column_no_values$$LIB_COMPONENTS_FILTER_COLUMNS_FILTER_COLUMNS_COMPONENT_TS__13;
    }
    else {
        i18n_12 = $localize `:@@routeplanning-filter-column-no-values:No available values`;
    } return [[1, "filter-columns"], ["mat-icon-button", "", 1, "close-icon", 3, "mat-dialog-close"], ["mat-dialog-title", ""], i18n_0, ["id", "formFilterRoutesPlanning", "role", "form", 3, "formGroup"], i18n_2, ["matInput", "", "type", "text", "formControlName", "SearchFilters", "id", "FilterString"], ["itemSize", "15", 1, "filter-column-viewport"], [4, "ngIf"], ["class", "filter-column-item", 4, "cdkVirtualFor", "cdkVirtualForOf"], ["name", "sortDirection", 3, "value"], ["id", "filter-columns-sort-ascending", "value", "asc", 3, "change"], i18n_4, ["id", "filter-columns-sort-descending", "value", "desc", 3, "change"], i18n_6, ["mat-raised-button", "", "id", "filter-columns-close", 3, "mat-dialog-close"], i18n_8, ["mat-raised-button", "", "id", "filter-columns-filter", "color", "accent", 3, "click"], i18n_10, i18n_12, [1, "filter-column-item"], [3, "value", "checked", "change"]]; }, template: function FilterColumnsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "button", 1);
        i0.ɵɵelementStart(2, "mat-icon");
        i0.ɵɵtext(3, "close");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "h3", 2);
        i0.ɵɵi18n(5, 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "mat-dialog-content");
        i0.ɵɵelementStart(7, "form", 4);
        i0.ɵɵelementStart(8, "mat-form-field");
        i0.ɵɵelementStart(9, "mat-label");
        i0.ɵɵi18n(10, 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(11, "input", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "cdk-virtual-scroll-viewport", 7);
        i0.ɵɵtemplate(13, FilterColumnsComponent_span_13_Template, 2, 0, "span", 8);
        i0.ɵɵtemplate(14, FilterColumnsComponent_div_14_Template, 4, 3, "div", 9);
        i0.ɵɵpipe(15, "filterCriteria");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "mat-button-toggle-group", 10);
        i0.ɵɵelementStart(17, "mat-button-toggle", 11);
        i0.ɵɵlistener("change", function FilterColumnsComponent_Template_mat_button_toggle_change_17_listener($event) { return ctx.onSortingValueChange($event.value); });
        i0.ɵɵelementStart(18, "span");
        i0.ɵɵi18n(19, 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "mat-icon");
        i0.ɵɵtext(21, "arrow_upward");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(22, "mat-button-toggle", 13);
        i0.ɵɵlistener("change", function FilterColumnsComponent_Template_mat_button_toggle_change_22_listener($event) { return ctx.onSortingValueChange($event.value); });
        i0.ɵɵelementStart(23, "span");
        i0.ɵɵi18n(24, 14);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(25, "mat-icon");
        i0.ɵɵtext(26, "arrow_downward");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "mat-dialog-actions");
        i0.ɵɵelementStart(28, "button", 15);
        i0.ɵɵelementStart(29, "span");
        i0.ɵɵi18n(30, 16);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "button", 17);
        i0.ɵɵlistener("click", function FilterColumnsComponent_Template_button_click_31_listener() { return ctx.onApplyFiltersButton(); });
        i0.ɵɵelementStart(32, "span");
        i0.ɵɵi18n(33, 18);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("mat-dialog-close", ctx.cancelResponse);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("formGroup", ctx.filterForm);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngIf", ctx.distinctColumnValues.length === 0);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("cdkVirtualForOf", i0.ɵɵpipeBind2(15, 6, ctx.distinctColumnValues, ctx.searchFiltersValue));
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("value", ctx.selectedColumn.SortDirection);
        i0.ɵɵadvance(12);
        i0.ɵɵproperty("mat-dialog-close", ctx.cancelResponse);
    } }, directives: [i3.MatButton, i1.MatDialogClose, i4.MatIcon, i1.MatDialogTitle, i1.MatDialogContent, i2.ɵNgNoValidate, i2.NgControlStatusGroup, i2.FormGroupDirective, i5.MatFormField, i5.MatLabel, i6.MatInput, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlName, i7.CdkVirtualScrollViewport, i7.CdkFixedSizeVirtualScroll, i3$1.NgIf, i7.CdkVirtualForOf, i9.MatButtonToggleGroup, i9.MatButtonToggle, i1.MatDialogActions, i10.MatCheckbox], pipes: [FilterColumnValuesPipe], styles: [".filter-columns[_ngcontent-%COMP%]{position:relative!important}.filter-columns[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]{position:absolute;top:-20px;right:-20px}.filter-columns[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.filter-columns[_ngcontent-%COMP%]   .filter-column-viewport[_ngcontent-%COMP%]{height:13em;border:1px solid lightgray}.filter-columns[_ngcontent-%COMP%]   .filter-column-item[_ngcontent-%COMP%]{height:25px;padding:.2em .5em}.filter-columns[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%]{margin-top:16px;width:100%}.filter-columns[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{flex:1 1 auto}.filter-columns[_ngcontent-%COMP%]   mat-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1 1 auto}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterColumnsComponent, [{
        type: Component,
        args: [{
                selector: 'filter-columns',
                templateUrl: './filter-columns.component.html',
                styleUrls: ['./filter-columns.component.scss'],
            }]
    }], function () { return [{ type: i1.MatDialogRef }, { type: i2.FormBuilder }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }]; }, null); })();

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
LocalStorageService.ɵfac = function LocalStorageService_Factory(t) { return new (t || LocalStorageService)(); };
LocalStorageService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LocalStorageService, factory: LocalStorageService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LocalStorageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

function AdvancedMaterialTableComponent_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-form-field");
    i0.ɵɵelementStart(2, "input", 14);
    i0.ɵɵlistener("keyup", function AdvancedMaterialTableComponent_div_1_ng_container_2_Template_input_keyup_2_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.applyMainFilter($event.target); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("id", "", ctx_r8.tableConfiguration.Id, "-table-filter-field");
} }
function AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_div_1_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 33);
    i0.ɵɵtext(1, "check_box");
    i0.ɵɵelementEnd();
} }
function AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_div_1_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, "check_box_outline_blank");
    i0.ɵɵelementEnd();
} }
function AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_div_1_Template_div_click_0_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r24); const i_r20 = restoredCtx.index; const ctx_r23 = i0.ɵɵnextContext(4); ctx_r23.onColumnChange(i_r20, $event); return $event.stopPropagation(); });
    i0.ɵɵtemplate(1, AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_div_1_mat_icon_1_Template, 2, 0, "mat-icon", 32);
    i0.ɵɵtemplate(2, AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_div_1_mat_icon_2_Template, 2, 0, "mat-icon", 12);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r19 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", column_r19.Display);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !column_r19.Display);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(column_r19.Title);
} }
function AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtemplate(1, AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_div_1_Template, 5, 3, "div", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(3);
    i0.ɵɵpropertyInterpolate1("id", "", ctx_r13.tableConfiguration.Id, "-table-columns-checkbox");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r13.tableColumns);
} }
function AdvancedMaterialTableComponent_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelementStart(1, "button", 16);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_div_1_div_3_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r26); const ctx_r25 = i0.ɵɵnextContext(2); return ctx_r25.clearAllFilters(); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "filter_list_off");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 17);
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "view_column");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "mat-menu", null, 18);
    i0.ɵɵtemplate(9, AdvancedMaterialTableComponent_div_1_div_3_ng_template_9_Template, 2, 2, "ng-template", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 20);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_div_1_div_3_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r26); const ctx_r27 = i0.ɵɵnextContext(2); return ctx_r27.exportToExcel(); });
    i0.ɵɵelementStart(11, "mat-icon");
    i0.ɵɵtext(12, "file_download");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 20);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_div_1_div_3_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r26); const ctx_r28 = i0.ɵɵnextContext(2); return ctx_r28.sendToPrinter(); });
    i0.ɵɵelementStart(14, "mat-icon");
    i0.ɵɵtext(15, "print");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "template", null, 21);
    i0.ɵɵi18n(18, 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "template", null, 23);
    i0.ɵɵi18n(21, 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "template", null, 25);
    i0.ɵɵi18n(24, 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "template", null, 27);
    i0.ɵɵi18n(27, 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r12 = i0.ɵɵreference(8);
    const _r14 = i0.ɵɵreference(17);
    const _r15 = i0.ɵɵreference(20);
    const _r16 = i0.ɵɵreference(23);
    const _r17 = i0.ɵɵreference(26);
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "", ctx_r9.tableConfiguration.Id, "-table-clearAllFilters");
    i0.ɵɵproperty("matTooltip", _r16.innerText);
    i0.ɵɵadvance(3);
    i0.ɵɵpropertyInterpolate1("id", "", ctx_r9.tableConfiguration.Id, "-table-showColumns");
    i0.ɵɵproperty("matMenuTriggerFor", _r12)("matTooltip", _r14.innerText);
    i0.ɵɵadvance(6);
    i0.ɵɵpropertyInterpolate1("id", "", ctx_r9.tableConfiguration.Id, "-table-export-to-excel-button");
    i0.ɵɵproperty("matTooltip", _r15.innerText)("disabled", ctx_r9.noRowsDisplayed);
    i0.ɵɵadvance(3);
    i0.ɵɵpropertyInterpolate1("id", "", ctx_r9.tableConfiguration.Id, "-table-print-button");
    i0.ɵɵproperty("matTooltip", _r17.innerText)("disabled", ctx_r9.noRowsDisplayed);
} }
function AdvancedMaterialTableComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelementStart(1, "div", 11);
    i0.ɵɵtemplate(2, AdvancedMaterialTableComponent_div_1_ng_container_2_Template, 3, 1, "ng-container", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, AdvancedMaterialTableComponent_div_1_div_3_Template, 28, 11, "div", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.tableConfiguration.AllowFilter);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.tableConfiguration.AllowActions);
} }
const _c10 = function () { return [10, 25, 50, 100]; };
function AdvancedMaterialTableComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelement(1, "mat-paginator", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("id", "", ctx_r1.tableConfiguration.Id, "-table-paginator");
    i0.ɵɵproperty("pageSizeOptions", i0.ɵɵpureFunction0(2, _c10));
} }
function AdvancedMaterialTableComponent_mat_header_cell_5_mat_checkbox_1_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-checkbox", 37);
    i0.ɵɵlistener("change", function AdvancedMaterialTableComponent_mat_header_cell_5_mat_checkbox_1_Template_mat_checkbox_change_0_listener($event) { i0.ɵɵrestoreView(_r31); const ctx_r30 = i0.ɵɵnextContext(2); return $event ? ctx_r30.masterToggle() : null; });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r29 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("checked", ctx_r29.selection.hasValue() && ctx_r29.isAllSelected())("indeterminate", ctx_r29.selection.hasValue() && !ctx_r29.isAllSelected());
} }
function AdvancedMaterialTableComponent_mat_header_cell_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtemplate(1, AdvancedMaterialTableComponent_mat_header_cell_5_mat_checkbox_1_Template, 1, 2, "mat-checkbox", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r2.tableConfiguration.MultipleSelect);
} }
function AdvancedMaterialTableComponent_mat_cell_6_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-cell");
    i0.ɵɵelementStart(1, "mat-checkbox", 38);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_mat_cell_6_Template_mat_checkbox_click_1_listener($event) { return $event.stopPropagation(); })("change", function AdvancedMaterialTableComponent_mat_cell_6_Template_mat_checkbox_change_1_listener($event) { const restoredCtx = i0.ɵɵrestoreView(_r35); const row_r32 = restoredCtx.$implicit; const ctx_r34 = i0.ɵɵnextContext(); return $event ? ctx_r34.onRowChecked(row_r32) : null; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r32 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("checked", ctx_r3.selection.isSelected(row_r32));
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_header_cell_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 43);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 44);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_ng_container_7_mat_header_cell_1_ng_container_1_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r43); const column_r36 = i0.ɵɵnextContext(2).$implicit; const ctx_r41 = i0.ɵɵnextContext(); return ctx_r41.openFilterDialog(column_r36); });
    i0.ɵɵelementStart(4, "mat-icon");
    i0.ɵɵtext(5, "filter_list");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const column_r36 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r40 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("selected", ctx_r40.hasFiltersOrSortingEnabled(column_r36));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(column_r36.Title);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("selected", ctx_r40.hasFiltersOrSortingEnabled(column_r36));
    i0.ɵɵproperty("disabled", ctx_r40.noRowsDisplayed);
} }
const _c11 = function (a0) { return { name: a0 }; };
function AdvancedMaterialTableComponent_ng_container_7_mat_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-header-cell", 42);
    i0.ɵɵlistener("cdkDragStarted", function AdvancedMaterialTableComponent_ng_container_7_mat_header_cell_1_Template_mat_header_cell_cdkDragStarted_0_listener() { i0.ɵɵrestoreView(_r47); const i_r37 = i0.ɵɵnextContext().index; const ctx_r45 = i0.ɵɵnextContext(); return ctx_r45.headerDragStarted(i_r37); });
    i0.ɵɵtemplate(1, AdvancedMaterialTableComponent_ng_container_7_mat_header_cell_1_ng_container_1_Template, 6, 6, "ng-container", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r38 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cdkDragData", i0.ɵɵpureFunction1(5, _c11, column_r36.Field))("cdkDragDisabled", !ctx_r38.canColumnBeMoved(column_r36))("ngClass", ctx_r38.getColumnClassName(column_r36))("matTooltip", column_r36.Title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r38.isFilteringEnabledOnColumn(column_r36));
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r51 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r51.getContent(column_r36, element_r49), "");
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r52 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r52.getContent(column_r36, element_r49), "");
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r53 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r53.getContent(column_r36, element_r49), "");
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r54 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r54.getContent(column_r36, element_r49), "");
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_7_Template(rf, ctx) { if (rf & 1) {
    const _r70 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 51);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_7_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r70); const element_r49 = i0.ɵɵnextContext().$implicit; const column_r36 = i0.ɵɵnextContext().$implicit; const ctx_r68 = i0.ɵɵnextContext(); return ctx_r68.onHyperLinkClicked(element_r49, column_r36); });
    i0.ɵɵelementStart(1, "a", 52);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r55 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("href", ctx_r55.getContent(column_r36, element_r49), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r55.getContent(column_r36, element_r49));
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "img", 53);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r56 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("src", ctx_r56.getContent(column_r36, element_r49), i0.ɵɵsanitizeUrl);
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r78 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 54);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r78); const element_r49 = i0.ɵɵnextContext().$implicit; const column_r36 = i0.ɵɵnextContext().$implicit; const ctx_r76 = i0.ɵɵnextContext(); return ctx_r76.iconClick(element_r49, column_r36); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r57 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("id", column_r36.Title + "-" + element_r49[column_r36.IdField]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", column_r36.MatIconName, "");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r57.getContent(column_r36, element_r49), " ");
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_10_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext(2).$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", element_r49[column_r36.Suffix.Field], " ");
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r87 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-form-field", 55);
    i0.ɵɵelementStart(2, "input", 56);
    i0.ɵɵlistener("change", function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_10_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r87); const element_r49 = i0.ɵɵnextContext().$implicit; const column_r36 = i0.ɵɵnextContext().$implicit; const ctx_r85 = i0.ɵɵnextContext(); return ctx_r85.numberInputChange(element_r49, column_r36, $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_10_span_3_Template, 2, 1, "span", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r58 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("min", ctx_r58.getMinValueForNumberInput(element_r49, column_r36))("max", ctx_r58.getMaxValueForNumberInput(element_r49, column_r36))("value", element_r49[column_r36.Field]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", column_r36.Suffix);
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = i0.ɵɵnextContext().$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", element_r49[column_r36.Suffix.Field], " ");
} }
function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_Template(rf, ctx) { if (rf & 1) {
    const _r95 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-cell", 45);
    i0.ɵɵlistener("click", function AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_Template_mat_cell_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r95); const element_r49 = restoredCtx.$implicit; const column_r36 = i0.ɵɵnextContext().$implicit; const ctx_r93 = i0.ɵɵnextContext(); return ctx_r93.isCellClickable(column_r36) ? ctx_r93.onRowChecked(element_r49) : null; });
    i0.ɵɵelementStart(1, "div", 46);
    i0.ɵɵelementContainerStart(2, 47);
    i0.ɵɵtemplate(3, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_3_Template, 2, 1, "span", 48);
    i0.ɵɵtemplate(4, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_4_Template, 2, 1, "span", 48);
    i0.ɵɵtemplate(5, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_5_Template, 2, 1, "span", 48);
    i0.ɵɵtemplate(6, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_6_Template, 2, 1, "span", 48);
    i0.ɵɵtemplate(7, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_7_Template, 3, 2, "span", 49);
    i0.ɵɵtemplate(8, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_div_8_Template, 2, 1, "div", 48);
    i0.ɵɵtemplate(9, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_9_Template, 5, 3, "ng-container", 48);
    i0.ɵɵtemplate(10, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_ng_container_10_Template, 4, 4, "ng-container", 48);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtemplate(11, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_span_11_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const element_r49 = ctx.$implicit;
    const column_r36 = i0.ɵɵnextContext().$implicit;
    const ctx_r39 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r39.getColumnClassName(column_r36));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matTooltip", ctx_r39.getToolTip(element_r49, column_r36));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", column_r36.ColumnType);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.DateTime);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.Date);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.Time);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.String);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.Link);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.Image);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.Icon);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r39.columnType.NumberInput);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", column_r36.Suffix && column_r36.ColumnType !== ctx_r39.columnType.NumberInput);
} }
function AdvancedMaterialTableComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 39);
    i0.ɵɵtemplate(1, AdvancedMaterialTableComponent_ng_container_7_mat_header_cell_1_Template, 2, 7, "mat-header-cell", 40);
    i0.ɵɵtemplate(2, AdvancedMaterialTableComponent_ng_container_7_mat_cell_2_Template, 12, 12, "mat-cell", 41);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const column_r36 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("matColumnDef", column_r36.Field);
} }
function AdvancedMaterialTableComponent_mat_header_row_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-header-row");
} }
function AdvancedMaterialTableComponent_mat_row_9_Template(rf, ctx) { if (rf & 1) {
    const _r99 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-row", 60);
    i0.ɵɵlistener("dblclick", function AdvancedMaterialTableComponent_mat_row_9_Template_mat_row_dblclick_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r99); const row_r97 = restoredCtx.$implicit; const ctx_r98 = i0.ɵɵnextContext(); return ctx_r98.onDoubleClick(row_r97); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r97 = ctx.$implicit;
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("id", row_r97.Id);
    i0.ɵɵproperty("ngClass", ctx_r6.getRowClassName());
} }
function AdvancedMaterialTableComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵi18n(2, 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
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
AdvancedMaterialTableComponent.ɵfac = function AdvancedMaterialTableComponent_Factory(t) { return new (t || AdvancedMaterialTableComponent)(i0.ɵɵdirectiveInject(i1.MatDialog), i0.ɵɵdirectiveInject(LocalStorageService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
AdvancedMaterialTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdvancedMaterialTableComponent, selectors: [["ngx-advanced-material-table"]], viewQuery: function AdvancedMaterialTableComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(MatPaginator, 5);
        i0.ɵɵviewQuery(MatSort, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.paginator = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.sort = _t.first);
    } }, inputs: { tableConfiguration: "tableConfiguration", actionConfiguration: "actionConfiguration", tableColumns: "tableColumns", data: "data", selectedData: "selectedData" }, outputs: { actionSelected: "actionSelected", iconClicked: "iconClicked", rowSelected: "rowSelected", numberChange: "numberChange", catalogueClicked: "catalogueClicked", searchCatalogueClicked: "searchCatalogueClicked", clearCatalogueClicked: "clearCatalogueClicked", hyperLinkClicked: "hyperLinkClicked" }, decls: 11, vars: 8, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_placeholder_text_filterResult$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___1 = goog.getMsg("Filter on results...");
        i18n_0 = MSG_EXTERNAL_placeholder_text_filterResult$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___1;
    }
    else {
        i18n_0 = $localize `:@@placeholder-text-filterResult:Filter on results...`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_table_tooltip_grid_showColumns$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___3 = goog.getMsg("Select visible columns");
        i18n_2 = MSG_EXTERNAL_table_tooltip_grid_showColumns$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___3;
    }
    else {
        i18n_2 = $localize `:@@table-tooltip-grid-showColumns:Select visible columns`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_table_tooltip_export_csv$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___5 = goog.getMsg("Export to Excel");
        i18n_4 = MSG_EXTERNAL_table_tooltip_export_csv$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___5;
    }
    else {
        i18n_4 = $localize `:@@table-tooltip-export-csv:Export to Excel`;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_table_tooltip_clear_all_filters$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___7 = goog.getMsg("Clear filters and sorting");
        i18n_6 = MSG_EXTERNAL_table_tooltip_clear_all_filters$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___7;
    }
    else {
        i18n_6 = $localize `:@@table-tooltip-clear-all-filters:Clear filters and sorting`;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_action_btn_print$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___9 = goog.getMsg("Print");
        i18n_8 = MSG_EXTERNAL_action_btn_print$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS___9;
    }
    else {
        i18n_8 = $localize `:@@action-btn-print:Print`;
    } let i18n_12; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_table_noResultFound$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS__13 = goog.getMsg("No matching records found");
        i18n_12 = MSG_EXTERNAL_table_noResultFound$$LIB_NGX_ADVANCED_MATERIAL_TABLE_COMPONENT_TS__13;
    }
    else {
        i18n_12 = $localize `:@@table-noResultFound:No matching records found`;
    } return [["class", "table-top-panel", 4, "ngIf"], ["class", "table-pagination", 4, "ngIf"], ["matSort", "", "matSortDisableClear", "false", "cdkDropListGroup", "", "cdkDropList", "", "cdkDropListLockAxis", "x", "cdkDropListOrientation", "horizontal", 3, "id", "dataSource", "cdkDropListDropped"], ["matColumnDef", "select"], [4, "matHeaderCellDef"], [4, "matCellDef"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], [4, "matHeaderRowDef"], [3, "id", "ngClass", "dblclick", 4, "matRowDef", "matRowDefColumns"], ["class", "no-records", 4, "ngIf"], [1, "table-top-panel"], [1, "table-filter"], [4, "ngIf"], ["class", "table-actions", 4, "ngIf"], ["matInput", "", "placeholder", i18n_0, 3, "id", "keyup"], [1, "table-actions"], ["mat-icon-button", "", "onclick", "this.blur()", 3, "id", "matTooltip", "click"], ["mat-icon-button", "", 3, "id", "matMenuTriggerFor", "matTooltip"], ["visibleColumnsMenu", "matMenu"], ["matMenuContent", ""], ["mat-icon-button", "", 3, "id", "matTooltip", "disabled", "click"], ["templateShowHide", ""], i18n_2, ["templateExportCsv", ""], i18n_4, ["templateClearAllFilters", ""], i18n_6, ["templatePrint", ""], i18n_8, [3, "id"], ["mat-menu-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["mat-menu-item", "", 3, "click"], ["color", "accent", 4, "ngIf"], ["color", "accent"], [1, "table-pagination"], ["showFirstLastButtons", "", 3, "pageSizeOptions", "id"], [3, "checked", "indeterminate", "change", 4, "ngIf"], [3, "checked", "indeterminate", "change"], [3, "checked", "click", "change"], [3, "matColumnDef"], ["cdkDrag", "", 3, "cdkDragData", "cdkDragDisabled", "ngClass", "matTooltip", "cdkDragStarted", 4, "matHeaderCellDef"], [3, "ngClass", "click", 4, "matCellDef"], ["cdkDrag", "", 3, "cdkDragData", "cdkDragDisabled", "ngClass", "matTooltip", "cdkDragStarted"], ["mat-sort-header", ""], ["mat-icon-button", "", "disableRipple", "", "onclick", "this.blur()", 3, "disabled", "click"], [3, "ngClass", "click"], [3, "matTooltip"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "click", 4, "ngSwitchCase"], ["class", "suffix", 4, "ngIf"], [3, "click"], ["target", "_blank", "rel", "noopener", 3, "href"], ["alt", "image", 3, "src"], ["mat-icon-button", "", 3, "id", "click"], ["floatLabel", "never"], ["matInput", "", "onlyNumbers", "", "type", "number", 3, "min", "max", "value", "change"], ["matSuffix", "", "class", "suffix", 4, "ngIf"], ["matSuffix", "", 1, "suffix"], [1, "suffix"], [3, "id", "ngClass", "dblclick"], [1, "no-records"], i18n_12]; }, template: function AdvancedMaterialTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div");
        i0.ɵɵtemplate(1, AdvancedMaterialTableComponent_div_1_Template, 4, 2, "div", 0);
        i0.ɵɵtemplate(2, AdvancedMaterialTableComponent_div_2_Template, 2, 3, "div", 1);
        i0.ɵɵelementStart(3, "mat-table", 2);
        i0.ɵɵlistener("cdkDropListDropped", function AdvancedMaterialTableComponent_Template_mat_table_cdkDropListDropped_3_listener($event) { return ctx.headerDropListDropped($event); });
        i0.ɵɵelementContainerStart(4, 3);
        i0.ɵɵtemplate(5, AdvancedMaterialTableComponent_mat_header_cell_5_Template, 2, 1, "mat-header-cell", 4);
        i0.ɵɵtemplate(6, AdvancedMaterialTableComponent_mat_cell_6_Template, 2, 1, "mat-cell", 5);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵtemplate(7, AdvancedMaterialTableComponent_ng_container_7_Template, 3, 1, "ng-container", 6);
        i0.ɵɵtemplate(8, AdvancedMaterialTableComponent_mat_header_row_8_Template, 1, 0, "mat-header-row", 7);
        i0.ɵɵtemplate(9, AdvancedMaterialTableComponent_mat_row_9_Template, 1, 2, "mat-row", 8);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(10, AdvancedMaterialTableComponent_div_10_Template, 3, 0, "div", 9);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.tableConfiguration.AllowFilter || ctx.tableConfiguration.AllowActions);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.tableConfiguration.AllowPagination);
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate1("id", "", ctx.tableConfiguration.Id, "-table");
        i0.ɵɵproperty("dataSource", ctx.dataSource);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngForOf", ctx.tableColumns);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("matHeaderRowDef", ctx.displayedColumns);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("matRowDefColumns", ctx.displayedColumns);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.noRowsDisplayed);
    } }, directives: [i3$1.NgIf, i4$1.MatTable, i5$1.MatSort, i6$1.CdkDropListGroup, i6$1.CdkDropList, i4$1.MatColumnDef, i4$1.MatHeaderCellDef, i4$1.MatCellDef, i3$1.NgForOf, i4$1.MatHeaderRowDef, i4$1.MatRowDef, i5.MatFormField, i6.MatInput, i3.MatButton, i10$1.MatTooltip, i4.MatIcon, i12.MatMenuTrigger, i12.MatMenu, i12.MatMenuContent, i12.MatMenuItem, i13.MatPaginator, i4$1.MatHeaderCell, i10.MatCheckbox, i4$1.MatCell, i6$1.CdkDrag, i3$1.NgClass, i5$1.MatSortHeader, i3$1.NgSwitch, i3$1.NgSwitchCase, i5.MatSuffix, i4$1.MatHeaderRow, i4$1.MatRow], styles: [".mat-table[_ngcontent-%COMP%]{border:1px solid rgba(0,0,0,.12);border-bottom:0}.mat-header-row[_ngcontent-%COMP%]{min-height:40px;height:40px}.mat-row[_ngcontent-%COMP%]{min-height:40px;height:40px;align-items:stretch}.mat-row[_ngcontent-%COMP%]:hover{background-color:#4d74a8}.mat-row[_ngcontent-%COMP%]:hover   .mat-cell[_ngcontent-%COMP%], .mat-row[_ngcontent-%COMP%]:hover   .mat-icon[_ngcontent-%COMP%]{color:#fff}.mat-row.row-with-image[_ngcontent-%COMP%]{height:55px}.mat-row[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center}.mat-row[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{min-width:50%}.mat-row[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:55px;min-width:100px;margin:0}.mat-header-cell[_ngcontent-%COMP%], .mat-cell[_ngcontent-%COMP%]{min-height:40px;border-right:1px solid rgba(0,0,0,.12);padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-header-cell.mat-column-select[_ngcontent-%COMP%], .mat-cell.mat-column-select[_ngcontent-%COMP%]{padding:0 8px;width:20px;flex:none;justify-content:center}.mat-header-cell[_ngcontent-%COMP%]:last-child, .mat-cell[_ngcontent-%COMP%]:last-child{border-right:0}.no-records[_ngcontent-%COMP%]{height:48px;display:flex;align-items:center;justify-content:center;background:white}.table-top-panel[_ngcontent-%COMP%]{display:flex;justify-content:space-between;height:1.25em;padding:1em 0 1.5em}.table-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;text-transform:uppercase;font-weight:bold}.table-pagination[_ngcontent-%COMP%]   .mat-paginator[_ngcontent-%COMP%]{background:transparent}.table-pagination[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:4em;margin:0 .2em 0 .5em}.mat-header-cell[_ngcontent-%COMP%]{display:flex;align-items:inherit;align-content:stretch}.mat-header-cell[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:1em}.mat-header-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:bold}.mat-header-cell.icons[_ngcontent-%COMP%], .mat-header-cell.actions[_ngcontent-%COMP%], .mat-cell.icons[_ngcontent-%COMP%], .mat-cell.actions[_ngcontent-%COMP%]{padding:0;width:40px;flex:none;justify-content:center}.mat-header-cell.images[_ngcontent-%COMP%], .mat-cell.images[_ngcontent-%COMP%]{padding:2px;min-width:100px;flex:none;justify-content:center}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdvancedMaterialTableComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-advanced-material-table',
                templateUrl: './ngx-advanced-material-table.component.html',
                styleUrls: ['./ngx-advanced-material-table.component.scss'],
            }]
    }], function () { return [{ type: i1.MatDialog }, { type: LocalStorageService }, { type: i0.ChangeDetectorRef }]; }, { tableConfiguration: [{
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
        }] }); })();

class MaterialModule {
}
MaterialModule.ɵfac = function MaterialModule_Factory(t) { return new (t || MaterialModule)(); };
MaterialModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: MaterialModule });
MaterialModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [], imports: [CdkTableModule,
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MaterialModule, { exports: [CdkTableModule,
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
        ScrollingModule] }); })();

class NgxAdvancedMaterialTableModule {
}
NgxAdvancedMaterialTableModule.ɵfac = function NgxAdvancedMaterialTableModule_Factory(t) { return new (t || NgxAdvancedMaterialTableModule)(); };
NgxAdvancedMaterialTableModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxAdvancedMaterialTableModule });
NgxAdvancedMaterialTableModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule, FormsModule, ReactiveFormsModule, MaterialModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxAdvancedMaterialTableModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
                declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe],
                exports: [AdvancedMaterialTableComponent],
                entryComponents: [FilterColumnsComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxAdvancedMaterialTableModule, { declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe], imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule], exports: [AdvancedMaterialTableComponent] }); })();

/*
 * Public API Surface of ngx-advanced-material-table
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AdvancedMaterialTableComponent, ColumnType, DialogActionType, FilterColumnsComponent, NgxAdvancedMaterialTableModule };
//# sourceMappingURL=ngx-advanced-material-table.js.map
