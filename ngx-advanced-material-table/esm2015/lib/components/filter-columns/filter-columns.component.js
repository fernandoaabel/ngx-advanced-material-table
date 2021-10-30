import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnType, } from '../../interfaces/column-definition.interface';
import { Value } from '../../helpers/values.helper';
import { DialogActionType } from '../../interfaces/enums/dialog-action.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/input";
import * as i7 from "@angular/cdk/scrolling";
import * as i8 from "@angular/common";
import * as i9 from "@angular/material/button-toggle";
import * as i10 from "@angular/material/checkbox";
import * as i11 from "../../pipes/filter.pipe";
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
export class FilterColumnsComponent {
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
    } }, directives: [i3.MatButton, i1.MatDialogClose, i4.MatIcon, i1.MatDialogTitle, i1.MatDialogContent, i2.ɵNgNoValidate, i2.NgControlStatusGroup, i2.FormGroupDirective, i5.MatFormField, i5.MatLabel, i6.MatInput, i2.DefaultValueAccessor, i2.NgControlStatus, i2.FormControlName, i7.CdkVirtualScrollViewport, i7.CdkFixedSizeVirtualScroll, i8.NgIf, i7.CdkVirtualForOf, i9.MatButtonToggleGroup, i9.MatButtonToggle, i1.MatDialogActions, i10.MatCheckbox], pipes: [i11.FilterColumnValuesPipe], styles: [".filter-columns[_ngcontent-%COMP%]{position:relative!important}.filter-columns[_ngcontent-%COMP%]   .close-icon[_ngcontent-%COMP%]{position:absolute;top:-20px;right:-20px}.filter-columns[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.filter-columns[_ngcontent-%COMP%]   .filter-column-viewport[_ngcontent-%COMP%]{height:13em;border:1px solid lightgray}.filter-columns[_ngcontent-%COMP%]   .filter-column-item[_ngcontent-%COMP%]{height:25px;padding:.2em .5em}.filter-columns[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%]{margin-top:16px;width:100%}.filter-columns[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{flex:1 1 auto}.filter-columns[_ngcontent-%COMP%]   mat-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1 1 auto}"] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbHVtbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFkdmFuY2VkLW1hdGVyaWFsLXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9maWx0ZXItY29sdW1ucy9maWx0ZXItY29sdW1ucy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2ZpbHRlci1jb2x1bW5zL2ZpbHRlci1jb2x1bW5zLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFELE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFekUsT0FBTyxFQUVILFVBQVUsR0FJYixNQUFNLDhDQUE4QyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUNJakUsNEJBQStGO0lBQS9GLGdCQUErRjtJQUFtQixpQkFBTzs7OztJQUV6SCwrQkFHQztJQUNHLHdDQUErRjtJQUFsQyxtTkFBaUM7SUFDMUYsNEJBQU07SUFBQyxZQUF5QjtJQUFBLGlCQUFPO0lBQzNDLGlCQUFlO0lBQ25CLGlCQUFNOzs7SUFIWSxlQUFvQjtJQUFwQixxQ0FBb0IsNkJBQUE7SUFDdkIsZUFBeUI7SUFBekIsc0RBQXlCOztBREpwRCxNQUFNLE9BQU8sc0JBQXNCO0lBUy9CLFlBQ1csU0FBK0MsRUFDOUMsRUFBZSxFQUNTLE9BQTJCO1FBRnBELGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQzlDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDUyxZQUFPLEdB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ICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNYXRDaGVja2JveENoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7XG4gICAgSUNvbHVtbkRlZmluaXRpb24sXG4gICAgQ29sdW1uVHlwZSxcbiAgICBJRGlzdGluY3RDb2x1bW5zLFxuICAgIElGaWx0ZXJDb2x1bW5zUmVzcG9uc2UsXG4gICAgSUZpbHRlckNvbHVtbnNEYXRhLFxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NvbHVtbi1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBWYWx1ZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdmFsdWVzLmhlbHBlcic7XG5pbXBvcnQgeyBEaWFsb2dBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9lbnVtcy9kaWFsb2ctYWN0aW9uLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZpbHRlci1jb2x1bW5zJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLWNvbHVtbnMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ZpbHRlci1jb2x1bW5zLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbHVtbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgICBzZWFyY2hGaWx0ZXJzVmFsdWU6IHN0cmluZyA9ICcnO1xuICAgIHNlbGVjdGVkQ29sdW1uOiBJQ29sdW1uRGVmaW5pdGlvbjtcbiAgICBpbml0aWFsU29ydGluZ0RpcmVjdGlvbj86ICdhc2MnIHwgJ2Rlc2MnO1xuICAgIGRpc3RpbmN0Q29sdW1uVmFsdWVzOiBJRGlzdGluY3RDb2x1bW5zW10gPSBbXTtcbiAgICBjYW5jZWxSZXNwb25zZTogSUZpbHRlckNvbHVtbnNSZXNwb25zZSA9IHsgYWN0aW9uOiBEaWFsb2dBY3Rpb25UeXBlLkNhbmNlbCB9O1xuICAgIGNvbHVtblR5cGUgPSBDb2x1bW5UeXBlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxGaWx0ZXJDb2x1bW5zQ29tcG9uZW50PixcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgY29udGV4dDogSUZpbHRlckNvbHVtbnNEYXRhXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb2x1bW4gPSB0aGlzLmNvbnRleHQuc2VsZWN0ZWRDb2x1bW47XG4gICAgICAgIHRoaXMuZGlzdGluY3RDb2x1bW5WYWx1ZXMgPSB0aGlzLnNvcnRDb2x1bW5zKHRoaXMuY29udGV4dC5kaXN0aW5jdERhdGEpO1xuICAgICAgICB0aGlzLmluaXRpYWxTb3J0aW5nRGlyZWN0aW9uID0gdGhpcy5zZWxlY3RlZENvbHVtbi5Tb3J0RGlyZWN0aW9uO1xuICAgICAgICB0aGlzLmZpbHRlckZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIFNlYXJjaEZpbHRlcnM6IFsnJ10sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbHRlckZvcm0uY29udHJvbHMuU2VhcmNoRmlsdGVycy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMub25TZWFyY2hGaWx0ZXJzVmFsdWVDaGFuZ2VkKCkpO1xuICAgIH1cblxuICAgIG9uU2VhcmNoRmlsdGVyc1ZhbHVlQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hGaWx0ZXJzVmFsdWUgPSB0aGlzLmZpbHRlckZvcm0uY29udHJvbHMuU2VhcmNoRmlsdGVycy52YWx1ZTtcbiAgICB9XG5cbiAgICBvblNlbGVjdEZpbHRlcihjaGFuZ2U6IE1hdENoZWNrYm94Q2hhbmdlKSB7XG4gICAgICAgIHRoaXMuZGlzdGluY3RDb2x1bW5WYWx1ZXMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICAgICAgaWYgKHgubmFtZSA9PT0gY2hhbmdlLnNvdXJjZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHguY2hlY2tlZCA9IGNoYW5nZS5jaGVja2VkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblNvcnRpbmdWYWx1ZUNoYW5nZSh2YWx1ZTogJ2FzYycgfCAnZGVzYycpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDb2x1bW4uU29ydERpcmVjdGlvbiA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2x1bW4uU29ydERpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2x1bW4uU29ydERpcmVjdGlvbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcHBseUZpbHRlcnNCdXR0b24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb2x1bW4uRmlsdGVyVmFsdWVzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb2x1bW4uRmlsdGVyVmFsdWVzID0gdGhpcy5kaXN0aW5jdENvbHVtblZhbHVlcy5maWx0ZXIoKHgpID0+IHguY2hlY2tlZCA9PT0gdHJ1ZSkubWFwKCh4KSA9PiB4Lm5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlOiBJRmlsdGVyQ29sdW1uc1Jlc3BvbnNlID0ge1xuICAgICAgICAgICAgYWN0aW9uOiBEaWFsb2dBY3Rpb25UeXBlLk9rLFxuICAgICAgICAgICAgc29ydGluZ0hhc0NoYW5nZWQ6IHRoaXMuaW5pdGlhbFNvcnRpbmdEaXJlY3Rpb24gIT09IHRoaXMuc2VsZWN0ZWRDb2x1bW4uU29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkQ29sdW1uOiB0aGlzLnNlbGVjdGVkQ29sdW1uLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRDb2x1bW5zKGNvbHVtbnM6IElEaXN0aW5jdENvbHVtbnNbXSk6IElEaXN0aW5jdENvbHVtbnNbXSB7XG4gICAgICAgIGlmIChjb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbHVtbnNbMF0ubmFtZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGNvbHVtbnMuc29ydCgoYSwgYikgPT4gKGEubmFtZSA+IGIubmFtZSA/IDEgOiAtMSkpO1xuICAgICAgICB9IGVsc2UgaWYgKFZhbHVlLmlzTnVtYmVyKGNvbHVtbnNbMF0ubmFtZSkpIHtcbiAgICAgICAgICAgIGNvbHVtbnMuc29ydCgoYSwgYikgPT4gKGEubmFtZSBhcyBudW1iZXIpIC0gKGIubmFtZSBhcyBudW1iZXIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChWYWx1ZS5pc1N0cmluZyhjb2x1bW5zWzBdLm5hbWUpKSB7XG4gICAgICAgICAgICBjb2x1bW5zLnNvcnQoKGEsIGIpID0+IChhLm5hbWUgYXMgc3RyaW5nKS5sb2NhbGVDb21wYXJlKGIubmFtZSBhcyBzdHJpbmcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2x1bW5zO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmaWx0ZXItY29sdW1uc1wiPlxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwiY2xvc2UtaWNvblwiIFttYXQtZGlhbG9nLWNsb3NlXT1cImNhbmNlbFJlc3BvbnNlXCI+XG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG5cbiAgICA8aDMgbWF0LWRpYWxvZy10aXRsZSBpMThuPVwiQEBmaWx0ZXItY29sdW1ucy1sYWJlbC1maWx0ZXJSb3dzSGVhZGluZ1wiPkZpbHRlciByb3dzPC9oMz5cblxuICAgIDxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgICAgIDxmb3JtIGlkPVwiZm9ybUZpbHRlclJvdXRlc1BsYW5uaW5nXCIgcm9sZT1cImZvcm1cIiBbZm9ybUdyb3VwXT1cImZpbHRlckZvcm1cIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LWxhYmVsIGkxOG49XCJAQGZvcm1Db250cm9sLWxhYmVsLWZpbHRlckdyaWRcIj5TZWFyY2ggZmlsdGVyczwvbWF0LWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCB0eXBlPVwidGV4dFwiIGZvcm1Db250cm9sTmFtZT1cIlNlYXJjaEZpbHRlcnNcIiBpZD1cIkZpbHRlclN0cmluZ1wiIC8+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCBpdGVtU2l6ZT1cIjE1XCIgY2xhc3M9XCJmaWx0ZXItY29sdW1uLXZpZXdwb3J0XCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cImRpc3RpbmN0Q29sdW1uVmFsdWVzLmxlbmd0aCA9PT0gMFwiIGkxOG49XCJAQHJvdXRlcGxhbm5pbmctZmlsdGVyLWNvbHVtbi1uby12YWx1ZXNcIj5ObyBhdmFpbGFibGUgdmFsdWVzPC9zcGFuPlxuXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmaWx0ZXItY29sdW1uLWl0ZW1cIlxuICAgICAgICAgICAgICAgICpjZGtWaXJ0dWFsRm9yPVwibGV0IHZhbHVlIG9mIGRpc3RpbmN0Q29sdW1uVmFsdWVzIHwgZmlsdGVyQ3JpdGVyaWE6IHNlYXJjaEZpbHRlcnNWYWx1ZTsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG1hdC1jaGVja2JveCBbdmFsdWVdPVwidmFsdWUubmFtZVwiIFtjaGVja2VkXT1cInZhbHVlLmNoZWNrZWRcIiAoY2hhbmdlKT1cIm9uU2VsZWN0RmlsdGVyKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+IHt7IHZhbHVlLmRpc3BsYXllZE5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG5cbiAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwIG5hbWU9XCJzb3J0RGlyZWN0aW9uXCIgdmFsdWU9XCJ7eyBzZWxlY3RlZENvbHVtbi5Tb3J0RGlyZWN0aW9uIH19XCI+XG4gICAgICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUgaWQ9XCJmaWx0ZXItY29sdW1ucy1zb3J0LWFzY2VuZGluZ1wiIHZhbHVlPVwiYXNjXCIgKGNoYW5nZSk9XCJvblNvcnRpbmdWYWx1ZUNoYW5nZSgkZXZlbnQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gaTE4bj1cIkBAZmlsdGVyQ29sdW1ucy1idG4tYXNjc29ydFwiPkFzY2VuZGluZzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+YXJyb3dfdXB3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICAgICAgICA8bWF0LWJ1dHRvbi10b2dnbGUgaWQ9XCJmaWx0ZXItY29sdW1ucy1zb3J0LWRlc2NlbmRpbmdcIiB2YWx1ZT1cImRlc2NcIiAoY2hhbmdlKT1cIm9uU29ydGluZ1ZhbHVlQ2hhbmdlKCRldmVudC52YWx1ZSlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBpMThuPVwiQEBmaWx0ZXJDb2x1bW5zLWJ0bi1kZXNjc29ydFwiPkRlc2NlbmRpbmc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmFycm93X2Rvd253YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGU+XG4gICAgICAgIDwvbWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXA+XG4gICAgPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG5cbiAgICA8bWF0LWRpYWxvZy1hY3Rpb25zPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGlkPVwiZmlsdGVyLWNvbHVtbnMtY2xvc2VcIiBbbWF0LWRpYWxvZy1jbG9zZV09XCJjYW5jZWxSZXNwb25zZVwiPlxuICAgICAgICAgICAgPHNwYW4gaTE4bj1cIkBAYWN0aW9uLWJ0bi1jYW5jZWxcIj5DYW5jZWw8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIGlkPVwiZmlsdGVyLWNvbHVtbnMtZmlsdGVyXCIgKGNsaWNrKT1cIm9uQXBwbHlGaWx0ZXJzQnV0dG9uKClcIiBjb2xvcj1cImFjY2VudFwiPlxuICAgICAgICAgICAgPHNwYW4gaTE4bj1cIkBAYWN0aW9uLWJ0bi1maWx0ZXJcIj5GaWx0ZXI8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuPC9kaXY+XG4iXX0=