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
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/table";
import * as i5 from "@angular/material/sort";
import * as i6 from "@angular/cdk/drag-drop";
import * as i7 from "@angular/material/form-field";
import * as i8 from "@angular/material/input";
import * as i9 from "@angular/material/button";
import * as i10 from "@angular/material/tooltip";
import * as i11 from "@angular/material/icon";
import * as i12 from "@angular/material/menu";
import * as i13 from "@angular/material/paginator";
import * as i14 from "@angular/material/checkbox";
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
AdvancedMaterialTableComponent.ɵfac = function AdvancedMaterialTableComponent_Factory(t) { return new (t || AdvancedMaterialTableComponent)(i0.ɵɵdirectiveInject(i1.MatDialog), i0.ɵɵdirectiveInject(i2.LocalStorageService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
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
    } }, directives: [i3.NgIf, i4.MatTable, i5.MatSort, i6.CdkDropListGroup, i6.CdkDropList, i4.MatColumnDef, i4.MatHeaderCellDef, i4.MatCellDef, i3.NgForOf, i4.MatHeaderRowDef, i4.MatRowDef, i7.MatFormField, i8.MatInput, i9.MatButton, i10.MatTooltip, i11.MatIcon, i12.MatMenuTrigger, i12.MatMenu, i12.MatMenuContent, i12.MatMenuItem, i13.MatPaginator, i4.MatHeaderCell, i14.MatCheckbox, i4.MatCell, i6.CdkDrag, i3.NgClass, i5.MatSortHeader, i3.NgSwitch, i3.NgSwitchCase, i7.MatSuffix, i4.MatHeaderRow, i4.MatRow], styles: [".mat-table[_ngcontent-%COMP%]{border:1px solid rgba(0,0,0,.12);border-bottom:0}.mat-header-row[_ngcontent-%COMP%]{min-height:40px;height:40px}.mat-row[_ngcontent-%COMP%]{min-height:40px;height:40px;align-items:stretch}.mat-row[_ngcontent-%COMP%]:hover{background-color:#4d74a8}.mat-row[_ngcontent-%COMP%]:hover   .mat-cell[_ngcontent-%COMP%], .mat-row[_ngcontent-%COMP%]:hover   .mat-icon[_ngcontent-%COMP%]{color:#fff}.mat-row.row-with-image[_ngcontent-%COMP%]{height:55px}.mat-row[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center}.mat-row[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{min-width:50%}.mat-row[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:55px;min-width:100px;margin:0}.mat-header-cell[_ngcontent-%COMP%], .mat-cell[_ngcontent-%COMP%]{min-height:40px;border-right:1px solid rgba(0,0,0,.12);padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-header-cell.mat-column-select[_ngcontent-%COMP%], .mat-cell.mat-column-select[_ngcontent-%COMP%]{padding:0 8px;width:20px;flex:none;justify-content:center}.mat-header-cell[_ngcontent-%COMP%]:last-child, .mat-cell[_ngcontent-%COMP%]:last-child{border-right:0}.no-records[_ngcontent-%COMP%]{height:48px;display:flex;align-items:center;justify-content:center;background:white}.table-top-panel[_ngcontent-%COMP%]{display:flex;justify-content:space-between;height:1.25em;padding:1em 0 1.5em}.table-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;text-transform:uppercase;font-weight:bold}.table-pagination[_ngcontent-%COMP%]   .mat-paginator[_ngcontent-%COMP%]{background:transparent}.table-pagination[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:4em;margin:0 .2em 0 .5em}.mat-header-cell[_ngcontent-%COMP%]{display:flex;align-items:inherit;align-content:stretch}.mat-header-cell[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:1em}.mat-header-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:bold}.mat-header-cell.icons[_ngcontent-%COMP%], .mat-header-cell.actions[_ngcontent-%COMP%], .mat-cell.icons[_ngcontent-%COMP%], .mat-cell.actions[_ngcontent-%COMP%]{padding:0;width:40px;flex:none;justify-content:center}.mat-header-cell.images[_ngcontent-%COMP%], .mat-cell.images[_ngcontent-%COMP%]{padding:2px;min-width:100px;flex:none;justify-content:center}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdvancedMaterialTableComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-advanced-material-table',
                templateUrl: './ngx-advanced-material-table.component.html',
                styleUrls: ['./ngx-advanced-material-table.component.scss'],
            }]
    }], function () { return [{ type: i1.MatDialog }, { type: i2.LocalStorageService }, { type: i0.ChangeDetectorRef }]; }, { tableConfiguration: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS9zcmMvbGliL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUvc3JjL2xpYi9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsb0RBQW9EO0FBQ3BELGdDQUFnQztBQUNoQyxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDNUgsT0FBTyxFQUFpRCxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVoRyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUVILFVBQVUsR0FLYixNQUFNLDBDQUEwQyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUc3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7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QUFnQjtrQkFBekIsTUFBTTtZQUNHLHNCQUFzQjtrQkFBL0IsTUFBTTtZQUNHLHFCQUFxQjtrQkFBOUIsTUFBTTtZQUNHLGdCQUFnQjtrQkFBekIsTUFBTTtZQUVrQixTQUFTO2tCQUFqQyxTQUFTO21CQUFDLFlBQVk7WUFDSCxJQUFJO2tCQUF2QixTQUFTO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG4vLyBGSVhNRShGZXJuYW5kbyBBYmVsKTogWExTWCBtb2R1bGUgbm90IGJlaW5nIGZvdW5kXG4vLyBpbXBvcnQgKiBhcyB4bHN4IGZyb20gJ3hsc3gnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ydCwgQXJyb3dWaWV3U3RhdGVUcmFuc2l0aW9uLCBNYXRTb3J0SGVhZGVyLCBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElUYWJsZUNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2ludGVyZmFjZXMvdGFibGUtY29uZmlndXJhdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHtcbiAgICBJQ29sdW1uRGVmaW5pdGlvbixcbiAgICBDb2x1bW5UeXBlLFxuICAgIElBZHZhbmNlZFJvd01lbnUsXG4gICAgSUZpbHRlckNvbHVtbnNEYXRhLFxuICAgIElGaWx0ZXJDb2x1bW5zUmVzcG9uc2UsXG4gICAgSURpc3RpbmN0Q29sdW1ucyxcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbHVtbi1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IENka0RyYWdEcm9wIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBJS2V5RmlsdGVyVmFsdWVzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2tleS1maWx0ZXItdmFsdWVzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvdGFibGUtYnVpbGRlci5oZWxwZXInO1xuaW1wb3J0IHsgVmFsdWUgfSBmcm9tICcuL2hlbHBlcnMvdmFsdWVzLmhlbHBlcic7XG5pbXBvcnQgeyBGaWx0ZXJDb2x1bW5zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbHRlci1jb2x1bW5zL2ZpbHRlci1jb2x1bW5zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2x1bW5IZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvY29sdW1ucy5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LWFkdmFuY2VkLW1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEFkdmFuY2VkTWF0ZXJpYWxUYWJsZUNvbXBvbmVudDxUID0gYW55PiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KClcbiAgICB0YWJsZUNvbmZpZ3VyYXRpb24hOiBJVGFibGVDb25maWd1cmF0aW9uO1xuXG4gICAgQElucHV0KClcbiAgICBhY3Rpb25Db25maWd1cmF0aW9uPzogSUFkdmFuY2VkUm93TWVudVtdO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdGFibGVDb2x1bW5zKHZhbHVlOiBJQ29sdW1uRGVmaW5pdGlvbltdKSB7XG4gICAgICAgIHRoaXMudGFibGVDb2x1bW5MaXN0ID0gXy5jbG9uZURlZXAodmFsdWUpO1xuICAgIH1cbiAgICBnZXQgdGFibGVDb2x1bW5zKCk6IElDb2x1bW5EZWZpbml0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy50YWJsZUNvbHVtbkxpc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkYXRhc2V0ITogVFtdO1xuICAgIEBJbnB1dCgpIHNldCBkYXRhKHZhbHVlOiBUW10pIHtcbiAgICAgICAgdGhpcy5kYXRhc2V0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRhYmxlKCk7XG4gICAgfVxuICAgIGdldCBkYXRhKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQ7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGVkRGF0YShpbml0aWFsU2VsZWN0aW9uOiBUW10pIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWw8YW55Pih0cnVlLCBpbml0aWFsU2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGFjdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8W1QsIG51bWJlcl0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBpY29uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPFtULCBJQ29sdW1uRGVmaW5pdGlvbl0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSByb3dTZWxlY3RlZDogRXZlbnRFbWl0dGVyPFtib29sZWFuLCBUW11dPiA9IG5ldyBFdmVudEVtaXR0ZXI8W2Jvb2xlYW4sIFRbXV0+KCk7XG4gICAgQE91dHB1dCgpIG51bWJlckNoYW5nZTogRXZlbnRFbWl0dGVyPFtULCBJQ29sdW1uRGVmaW5pdGlvbiwgbnVtYmVyXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGNhdGFsb2d1ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHNlYXJjaENhdGFsb2d1ZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGNsZWFyQ2F0YWxvZ3VlQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgaHlwZXJMaW5rQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3IhOiBNYXRQYWdpbmF0b3I7XG4gICAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0ITogTWF0U29ydDtcblxuICAgIGRhdGFTb3VyY2UhOiBNYXRUYWJsZURhdGFTb3VyY2U8VD47XG4gICAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbXTtcblxuICAgIG5vUm93c0Rpc3BsYXllZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhhc0hpZGRlbkNvbHVtbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjb2x1bW5UeXBlID0gQ29sdW1uVHlwZTtcbiAgICBzZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSwgW10pO1xuXG4gICAgcHJpdmF0ZSB0YWJsZUNvbHVtbkxpc3Q6IElDb2x1bW5EZWZpbml0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIG1haW5GaWx0ZXIgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBjZHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2FkRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMubG9jYWxpemVQYWdpbmF0b3IoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc29ydENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5zb3J0LnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKChjb2w6IFNvcnQpID0+IHtcbiAgICAgICAgICAgIGlmICghY29sLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZUNvbHVtbkxpc3QuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5GaWVsZCAhPT0gY29sLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4uU29ydERpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4uU29ydERpcmVjdGlvbiA9IGNvbC5kaXJlY3Rpb24gYXMgJ2FzYycgfCAnZGVzYycgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCA9IChjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uLCBlbGVtZW50OiBUKSA9PiBDb2x1bW5IZWxwZXIuZ2V0Q29udGVudChjb2x1bW4uRmllbGQsIGVsZW1lbnQpO1xuICAgIGdldFRvb2xUaXAgPSAocm93OiBULCBjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uKSA9PiBDb2x1bW5IZWxwZXIuZ2V0VG9vbFRpcDxUPihjb2x1bW4sIHJvdyk7XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemVUYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ub1Jvd3NEaXNwbGF5ZWQgPSB0aGlzLmRhdGEubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxUPih0aGlzLmRhdGEpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0aW5nRGF0YUFjY2Vzc29yID0gKGl0ZW0sIHByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gQ29sdW1uSGVscGVyLmdldENvbnRlbnQocHJvcGVydHksIGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb250ZW50LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmZpbHRlclByZWRpY2F0ZSA9IHRoaXMuZ2V0RmlsdGVyUHJlZGljYXRlKCk7XG4gICAgICAgIHRoaXMuYXBwbHlGaWx0ZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJDb2x1bW5zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMgPSB0aGlzLnRhYmxlQ29sdW1ucy5maWx0ZXIoKGNvbHVtbikgPT4gY29sdW1uLkRpc3BsYXkgPT09IHRydWUpLm1hcCgoY29sdW1uKSA9PiBjb2x1bW4uRmllbGQpO1xuICAgICAgICBpZiAodGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uQWxsb3dTZWxlY3QpIHtcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgJ3NlbGVjdCcgY29sdW1uIGF0IHRoZSBzdGFydFxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLnVuc2hpZnQoJ3NlbGVjdCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Sb3dDaGVja2VkKHJvdzogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uTXVsdGlwbGVTZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVSb3dTZWxlY3Rpb24ocm93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlUm93U2VsZWN0aW9uKHJvdyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd1NlbGVjdGVkLmVtaXQoW2ZhbHNlLCB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZF0pO1xuICAgIH1cblxuICAgIG9uRG91YmxlQ2xpY2socm93OiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm93U2VsZWN0ZWQuZW1pdChbdHJ1ZSwgW3Jvd11dKTtcbiAgICB9XG5cbiAgICBtYXN0ZXJUb2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID8gdGhpcy5zZWxlY3Rpb24uY2xlYXIoKSA6IHRoaXMuZGF0YVNvdXJjZS5kYXRhLmZvckVhY2goKHJvdykgPT4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0KHJvdykpO1xuXG4gICAgICAgIHRoaXMucm93U2VsZWN0ZWQuZW1pdChbZmFsc2UsIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkXSk7XG4gICAgfVxuXG4gICAgaXNBbGxTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBudW1TZWxlY3RlZCA9PT0gbnVtUm93cztcbiAgICB9XG5cbiAgICBnZXRGaWx0ZXJQcmVkaWNhdGUoKSB7XG4gICAgICAgIHJldHVybiAocm93OiBULCBmaWx0ZXJzOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckRhdGE6IElLZXlGaWx0ZXJWYWx1ZXNbXSA9IEpTT04ucGFyc2UoZmlsdGVycyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbHRlciBvZiBmaWx0ZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci52YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IF8uZ2V0KHJvdywgZmlsdGVyLmtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudHlwZSA9PT0gQ29sdW1uVHlwZS5EYXRlVGltZSB8fCBmaWx0ZXIudHlwZSA9PT0gQ29sdW1uVHlwZS5EYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVzID0gZmlsdGVyLnZhbHVlcy5tYXAoKHgpID0+IG5ldyBEYXRlKHgpKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBkYXRlcy5maW5kSW5kZXgoKHgpID0+IHguZ2V0VGltZSgpID09PSB2YWx1ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVmFsdWUuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfLmpvaW4odmFsdWUsICcsJyk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZmlsdGVyLnZhbHVlcy5maW5kSW5kZXgoKHgpID0+IF8uaXNFcXVhbCh4LCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZmlsdGVyLnZhbHVlcy5maW5kSW5kZXgoKHgpID0+IF8uaXNFcXVhbCh4LCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubWFpbkZpbHRlciAmJiB0aGlzLm1haW5GaWx0ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyRGF0YS5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBfLmdldChyb3csIGZpbHRlci5rZXkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gbWF0Y2ggfHwgc3RyaW5nVmFsdWUuaW5kZXhPZih0aGlzLm1haW5GaWx0ZXIpICE9PSAtMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uQ29sdW1uQ2hhbmdlKGluZGV4OiBudW1iZXIsIGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGFibGVDb2x1bW5zW2luZGV4XS5EaXNwbGF5ICYmIHRoaXMudGFibGVDb2x1bW5zLmZpbHRlcigoYykgPT4gYy5EaXNwbGF5KS5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFibGVDb2x1bW5zW2luZGV4XS5EaXNwbGF5ID0gIXRoaXMudGFibGVDb2x1bW5zW2luZGV4XS5EaXNwbGF5O1xuICAgICAgICB0aGlzLnJlbmRlckNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5zYXZlQ29sdW1uQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgY2xlYXJBbGxGaWx0ZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYmxlQ29sdW1uTGlzdC5mb3JFYWNoKChjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb2x1bW4uU29ydERpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbHVtbi5GaWx0ZXJWYWx1ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENsZWFyIHNvcnQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xMDUyNFxuICAgICAgICB0aGlzLmNsZWFyU29ydCgpO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSAnW10nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBmcm9tIHRoZSBBY3Rpb24gQnV0dG9uc1xuICAgICAqIEBwYXJhbSBhY3Rpb24gVmFsdWUgRnJvbSB0aGUgQWN0aW9uIEJ1dHRvbnNcbiAgICAgKi9cbiAgICBvbkFjdGlvblNlbGVjdGVkKGFjdGlvbjogW1QsIG51bWJlcl0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3Rpb25TZWxlY3RlZC5lbWl0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0TWluVmFsdWVGb3JOdW1iZXJJbnB1dChlbGVtZW50OiBULCBjb2x1bW46IElDb2x1bW5EZWZpbml0aW9uKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCFjb2x1bW4gfHwgIWNvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uTnVtYmVySW5wdXRPcHRpb25zLk1pbklucHV0TnVtYmVyRmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50W2NvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMuTWluSW5wdXROdW1iZXJGaWVsZF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sdW1uLk51bWJlcklucHV0T3B0aW9ucy5NaW5JbnB1dE51bWJlcjtcbiAgICB9XG5cbiAgICBnZXRNYXhWYWx1ZUZvck51bWJlcklucHV0KGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIWNvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW4uTnVtYmVySW5wdXRPcHRpb25zLk1heElucHV0TnVtYmVyRmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50W2NvbHVtbi5OdW1iZXJJbnB1dE9wdGlvbnMuTWF4SW5wdXROdW1iZXJGaWVsZF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sdW1uLk51bWJlcklucHV0T3B0aW9ucy5NYXhJbnB1dE51bWJlcjtcbiAgICB9XG5cbiAgICBpY29uQ2xpY2soZWxlbWVudDogVCwgY29sdW1uOiBJQ29sdW1uRGVmaW5pdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmljb25DbGlja2VkLmVtaXQoW2VsZW1lbnQsIGNvbHVtbl0pO1xuICAgIH1cblxuICAgIG51bWJlcklucHV0Q2hhbmdlKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24sIGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5udW1iZXJDaGFuZ2UuZW1pdChbZWxlbWVudCwgY29sdW1uLCBldmVudC50YXJnZXQudmFsdWVdKTtcbiAgICB9XG5cbiAgICBvbkNhdGFsb2d1ZUNsaWNrZWQoZWxlbWVudDogVCwgY29sdW1uOiBJQ29sdW1uRGVmaW5pdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNhdGFsb2d1ZUNsaWNrZWQuZW1pdChbZWxlbWVudCwgY29sdW1uXSk7XG4gICAgfVxuXG4gICAgb25DYXRhbG9ndWVTZWFyY2hDbGlja2VkKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hDYXRhbG9ndWVDbGlja2VkLmVtaXQoW2VsZW1lbnQsIGNvbHVtbl0pO1xuICAgIH1cblxuICAgIG9uQ2F0YWxvZ3VlQ2xlYXJDbGlja2VkKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGVhckNhdGFsb2d1ZUNsaWNrZWQuZW1pdChbZWxlbWVudCwgY29sdW1uXSk7XG4gICAgfVxuXG4gICAgb25IeXBlckxpbmtDbGlja2VkKGVsZW1lbnQ6IFQsIGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oeXBlckxpbmtDbGlja2VkLmVtaXQoW2VsZW1lbnQsIGNvbHVtbl0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbXVsdGlwbGVSb3dTZWxlY3Rpb24ocm93OiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uLnRvZ2dsZShyb3cpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2luZ2xlUm93U2VsZWN0aW9uKHJvdzogVCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24uaXNTZWxlY3RlZChyb3cpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnRvZ2dsZShyb3cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaXN0aW5jdFZhbHVlcyhzZWxlY3RlZENvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiBJRGlzdGluY3RDb2x1bW5zW10ge1xuICAgICAgICBsZXQgcmVzdWx0OiBJRGlzdGluY3RDb2x1bW5zW10gPSBbXTtcblxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBfLmdldChyb3csIHNlbGVjdGVkQ29sdW1uLkZpZWxkKTtcbiAgICAgICAgICAgIGxldCBkaXNwbGF5ZWRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoVmFsdWUuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IF8uam9pbih2YWx1ZSwgJywnKTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5ZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGlzQWxyZWFkeUNoZWNrZWQgPSBzZWxlY3RlZENvbHVtbi5GaWx0ZXJWYWx1ZXMgPyBzZWxlY3RlZENvbHVtbi5GaWx0ZXJWYWx1ZXMuZmluZEluZGV4KCh4KSA9PiB4ID09PSB2YWx1ZSkgPj0gMCA6IGZhbHNlO1xuXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgZGlzcGxheWVkTmFtZTogZGlzcGxheWVkVmFsdWUsXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogaXNBbHJlYWR5Q2hlY2tlZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHQgPSBfLnVuaXFCeShyZXN1bHQsICh4OiBJRGlzdGluY3RDb2x1bW5zKSA9PiB4LmRpc3BsYXllZE5hbWUpO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8jcmVnaW9uIERyYWcgYW5kIERyb3BcbiAgICBoZWFkZXJEcmFnU3RhcnRlZChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIC8vIFB1cnBvc2VkbHkgaW4gYmxhbmtcbiAgICB9XG5cbiAgICBoZWFkZXJEcm9wTGlzdERyb3BwZWQoZXZlbnQ6IENka0RyYWdEcm9wPElDb2x1bW5EZWZpbml0aW9uPikge1xuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlzcGxheWVkQ29sdW1ucyA9IHRoaXMuZGlzcGxheWVkQ29sdW1ucy5maWx0ZXIoKHgpID0+IHggIT0gJ3NlbGVjdCcpO1xuICAgICAgICBjb25zdCBwcmV2aW91c0NvbHVtbkluZGV4ID0gdGhpcy50YWJsZUNvbHVtbnMuZmluZEluZGV4KCh4KSA9PiB4LkZpZWxkID09PSBkaXNwbGF5ZWRDb2x1bW5zW2V2ZW50LnByZXZpb3VzSW5kZXhdKTtcbiAgICAgICAgY29uc3QgY3VycmVudENvbHVtbkluZGV4ID0gdGhpcy50YWJsZUNvbHVtbnMuZmluZEluZGV4KCh4KSA9PiB4LkZpZWxkID09PSBkaXNwbGF5ZWRDb2x1bW5zW2V2ZW50LmN1cnJlbnRJbmRleF0pO1xuICAgICAgICBpZiAodGhpcy5jYW5Db2x1bW5CZU1vdmVkKHRoaXMudGFibGVDb2x1bW5zW2N1cnJlbnRDb2x1bW5JbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVJdGVtSW5BcnJheSh0aGlzLnRhYmxlQ29sdW1ucywgcHJldmlvdXNDb2x1bW5JbmRleCwgY3VycmVudENvbHVtbkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ29sdW1ucygpO1xuICAgICAgICAgICAgdGhpcy5zYXZlQ29sdW1uQ29uZmlnKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gU29ydGluZyBhbmQgRmlsdGVyaW5nXG5cbiAgICBhcHBseU1haW5GaWx0ZXIoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1haW5GaWx0ZXIgPSBldmVudC52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RmlsdGVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmlsdGVyczogSUtleUZpbHRlclZhbHVlc1tdID0gW107XG5cbiAgICAgICAgdGhpcy50YWJsZUNvbHVtbkxpc3QuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbHVtbi5GaWx0ZXJWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4uRmlsdGVyVmFsdWVzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAga2V5OiBjb2x1bW4uRmllbGQsXG4gICAgICAgICAgICAgICAgdHlwZTogY29sdW1uLkNvbHVtblR5cGUsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBjb2x1bW4uRmlsdGVyVmFsdWVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIgPSBKU09OLnN0cmluZ2lmeShmaWx0ZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc29ydENvbHVtbihpZDogc3RyaW5nLCBzdGFydD86ICdhc2MnIHwgJ2Rlc2MnKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW4gPSB0aGlzLnNvcnQuYWN0aXZlO1xuICAgICAgICBjb25zdCBjdXJyZW50RGlyZWN0aW9uID0gdGhpcy5zb3J0LmRpcmVjdGlvbjtcbiAgICAgICAgaWYgKGlkICE9PSBjdXJyZW50Q29sdW1uIHx8IHN0YXJ0ICE9PSBjdXJyZW50RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnQuc29ydCh7IGlkOiAnJywgc3RhcnQsIGRpc2FibGVDbGVhcjogZmFsc2UgfSBhcyBhbnkpO1xuICAgICAgICAgICAgdGhpcy5zb3J0LnNvcnQoeyBpZCwgc3RhcnQsIGRpc2FibGVDbGVhcjogZmFsc2UgfSBhcyBhbnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclNvcnQoKSB7XG4gICAgICAgIC8vIENsZWFyIHNvcnQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xMDUyNFxuICAgICAgICBsZXQgc29ydGFibGU6IGFueSA9IHsgaWQ6IG51bGwsIHN0YXJ0OiBudWxsLCBkaXNhYmxlQ2xlYXI6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuc29ydC5zb3J0KHNvcnRhYmxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRDb2x1bW5zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMudGFibGVDb2x1bW5zLmZpbmRJbmRleCgoY29sdW1uKSA9PiBjb2x1bW4uU29ydERpcmVjdGlvbik7XG4gICAgICAgIGlmIChpZCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSB0aGlzLnRhYmxlQ29sdW1uc1tpZF0uRmllbGQ7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMudGFibGVDb2x1bW5zW2lkXS5Tb3J0RGlyZWN0aW9uO1xuXG4gICAgICAgIHRoaXMuY2xlYXJTb3J0KCk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zb3J0Q29sdW1uKGNvbHVtbk5hbWUsIGRpcmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIQUNLKEZlcm5hbmRvIEFiZWwpOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xMDI0MlxuICAgICAgICBjb25zdCBhY3RpdmVTb3J0SGVhZGVyID0gdGhpcy5zb3J0LnNvcnRhYmxlcy5nZXQoY29sdW1uTmFtZSkgYXMgTWF0U29ydEhlYWRlcjtcbiAgICAgICAgaWYgKGFjdGl2ZVNvcnRIZWFkZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdTdGF0ZTogQXJyb3dWaWV3U3RhdGVUcmFuc2l0aW9uID0gYWN0aXZlU29ydEhlYWRlci5faXNTb3J0ZWQoKVxuICAgICAgICAgICAgICAgID8geyBmcm9tU3RhdGU6IGRpcmVjdGlvbiwgdG9TdGF0ZTogJ2FjdGl2ZScgfVxuICAgICAgICAgICAgICAgIDogeyBmcm9tU3RhdGU6ICdhY3RpdmUnLCB0b1N0YXRlOiBkaXJlY3Rpb24gfTtcbiAgICAgICAgICAgIGFjdGl2ZVNvcnRIZWFkZXIuX3NldEFuaW1hdGlvblRyYW5zaXRpb25TdGF0ZSh2aWV3U3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZHJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gRGlhbG9nc1xuXG4gICAgb3BlbkZpbHRlckRpYWxvZyhzZWxlY3RlZENvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0YTogSUZpbHRlckNvbHVtbnNEYXRhID0ge1xuICAgICAgICAgICAgc2VsZWN0ZWRDb2x1bW46IF8uY2xvbmVEZWVwKHNlbGVjdGVkQ29sdW1uKSxcbiAgICAgICAgICAgIGRpc3RpbmN0RGF0YTogdGhpcy5nZXREaXN0aW5jdFZhbHVlcyhzZWxlY3RlZENvbHVtbiksXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVyaW5nRGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihGaWx0ZXJDb2x1bW5zQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBkaXNhYmxlQ2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgICAgICAgIHdpZHRoOiAnMzUwcHgnLFxuICAgICAgICAgICAgcGFuZWxDbGFzczogJ292ZXJsYXktcGFuZWwnLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29sdW1uRmlsdGVyaW5nRGlhbG9nXG4gICAgICAgICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3BvbnNlOiBJRmlsdGVyQ29sdW1uc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmFjdGlvbiA9PT0gJ09rJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckJ5Q29sdW1uKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0QnlUYWJsZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gQWZ0ZXIgRmlsdGVyQ29sdW1ucyByZXNwb25zZVxuXG4gICAgcHJpdmF0ZSBmaWx0ZXJCeUNvbHVtbihyZXNwb25zZTogSUZpbHRlckNvbHVtbnNSZXNwb25zZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5zZWxlY3RlZENvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy50YWJsZUNvbHVtbkxpc3QuZmluZCgoeCkgPT4geC5GaWVsZCA9PT0gcmVzcG9uc2Uuc2VsZWN0ZWRDb2x1bW4hLkZpZWxkKTtcblxuICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICBjb2x1bW4uRmlsdGVyVmFsdWVzID0gcmVzcG9uc2Uuc2VsZWN0ZWRDb2x1bW4uRmlsdGVyVmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHBseUZpbHRlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRCeVRhYmxlKHJlc3BvbnNlOiBJRmlsdGVyQ29sdW1uc1Jlc3BvbnNlKTogdm9pZCB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zb3J0aW5nSGFzQ2hhbmdlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSByZXNwb25zZS5zZWxlY3RlZENvbHVtbiEuRmllbGQ7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHJlc3BvbnNlLnNlbGVjdGVkQ29sdW1uIS5Tb3J0RGlyZWN0aW9uO1xuXG4gICAgICAgIHRoaXMudGFibGVDb2x1bW5MaXN0LmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgY29sdW1uLlNvcnREaXJlY3Rpb24gPSBjb2x1bW4uRmllbGQgIT09IGNvbHVtbk5hbWUgPyB1bmRlZmluZWQgOiBkaXJlY3Rpb247XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc29ydENvbHVtbnMoKTtcbiAgICB9XG5cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBQcmludCBhbmQgRXhwb3J0XG5cbiAgICBzZW5kVG9QcmludGVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RlZERhdGEgPSB0aGlzLmdldERhdGFUb0V4cG9ydFByaW50KCk7XG4gICAgICAgIGNvbnN0IGNvbE5hbWVzID0gdGhpcy5nZXREaXNwbGF5ZWRDb2x1bW5OYW1lcygpO1xuXG4gICAgICAgIGNvbnN0IHRhYmxlID0gVGFibGVCdWlsZGVySGVscGVyLmJ1aWxkVGFibGUoc2VsZWN0ZWREYXRhLCB0aGlzLmRpc3BsYXllZENvbHVtbnMsIGNvbE5hbWVzKTtcblxuICAgICAgICBpZiAodGFibGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1dpbiA9IHdpbmRvdy5vcGVuKCcjJyk7XG4gICAgICAgICAgICBpZiAoIW5ld1dpbikgcmV0dXJuO1xuICAgICAgICAgICAgbmV3V2luLmRvY3VtZW50LndyaXRlKFRhYmxlQnVpbGRlckhlbHBlci5wcmludFBhZ2VCdWlsZGVyRGVmYXVsdCh0YWJsZSkpO1xuICAgICAgICAgICAgbmV3V2luLnByaW50KCk7XG4gICAgICAgICAgICBuZXdXaW4uY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86IENyZWF0ZSBhIHNlcnZpY2UgZm9yIHRoYXQsIGN1cnJlbnRseSBiZWluZyB1c2VkIGluIGFkdmFuY2VkIHRhYmxlXG4gICAgZXhwb3J0VG9FeGNlbCgpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc3QgdGFibGVUaXRsZSA9IFRhYmxlVGFncy5UYWJsZTtcbiAgICAgICAgLy8gY29uc3Qgc2VsZWN0ZWREYXRhID0gdGhpcy5nZXRTZWxlY3RlZERhdGFXaXRoRGlzcGxheWVkQ29sdW1uc09ubHkoKTtcbiAgICAgICAgLy8gY29uc3QgY29sTmFtZXMgPSB0aGlzLmdldERpc3BsYXllZENvbHVtbk5hbWVzKCk7XG4gICAgICAgIC8vIC8vIGdlbmVyYXRlIGEgd29ya3NoZWV0XG4gICAgICAgIC8vIGNvbnN0IHdzID0geGxzeC51dGlscy5hb2FfdG9fc2hlZXQoW2NvbE5hbWVzXSk7XG4gICAgICAgIC8vIHhsc3gudXRpbHMuc2hlZXRfYWRkX2pzb24od3MsIHNlbGVjdGVkRGF0YSwge1xuICAgICAgICAvLyAgICAgaGVhZGVyOiB0aGlzLmRpc3BsYXllZENvbHVtbnMuc2xpY2UoMSksIC8vIHJlbW92ZSB0aGUgJ3NlbGVjdCcgY29sdW1uXG4gICAgICAgIC8vICAgICBza2lwSGVhZGVyOiB0cnVlLFxuICAgICAgICAvLyAgICAgb3JpZ2luOiAxLFxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gLy8gYWRkIHRvIHdvcmtib29rXG4gICAgICAgIC8vIGNvbnN0IHdiID0geGxzeC51dGlscy5ib29rX25ldygpO1xuICAgICAgICAvLyB4bHN4LnV0aWxzLmJvb2tfYXBwZW5kX3NoZWV0KHdiLCB3cywgdGFibGVUaXRsZSk7XG4gICAgICAgIC8vIC8vIHdyaXRlIHdvcmtib29rIGFuZCBmb3JjZSBhIGRvd25sb2FkXG4gICAgICAgIC8vIHhsc3gud3JpdGVGaWxlKHdiLCBgJHt0YWJsZVRpdGxlfS54bHNgLCB7XG4gICAgICAgIC8vICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAvLyAgICAgYm9va1R5cGU6ICd4bHMnLFxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGFUb0V4cG9ydFByaW50KCk6IFRbXSB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2Uuc29ydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNvdXJjZS5zb3J0RGF0YSh0aGlzLmRhdGFTb3VyY2UuZmlsdGVyZWREYXRhLCB0aGlzLmRhdGFTb3VyY2Uuc29ydCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZERhdGFXaXRoRGlzcGxheWVkQ29sdW1uc09ubHkoKTogUGFydGlhbDxUPltdIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gdGhpcy5nZXREYXRhVG9FeHBvcnRQcmludCgpO1xuXG4gICAgICAgIHJldHVybiBfLm1hcChzZWxlY3RlZERhdGEsIChvYmo6IFQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfLnBpY2sob2JqLCB0aGlzLmRpc3BsYXllZENvbHVtbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpc3BsYXllZENvbHVtbk5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFibGVDb2x1bW5zLmZpbHRlcigoY29sdW1uKSA9PiBjb2x1bW4uRGlzcGxheSA9PT0gdHJ1ZSkubWFwKChjb2x1bW4pID0+IGNvbHVtbi5UaXRsZSk7XG4gICAgfVxuXG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gTG9jYWxTdG9yYWdlXG4gICAgcHJpdmF0ZSBsb2FkRnJvbVN0b3JhZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YWJsZUNvbmZpZ3VyYXRpb24gfHwgIXRoaXMudGFibGVDb25maWd1cmF0aW9uLkxvY2FsU3RvcmFnZUtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbG9jYWxTdG9yYWdlQ29sdW1ucyA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXRBc0pzb24odGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uTG9jYWxTdG9yYWdlS2V5KSBhcyBJQ29sdW1uRGVmaW5pdGlvbltdO1xuXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlQ29sdW1ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFibGVDb2x1bW5MaXN0ID0gXy5jbG9uZURlZXAodGhpcy50YWJsZUNvbHVtbnMpO1xuICAgICAgICBmb3IgKGNvbnN0IG9iaiBvZiB0YWJsZUNvbHVtbkxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9jYWxTdG9yYWdlQ29sdW1ucy5maW5kSW5kZXgoKGkpID0+IGkuRmllbGQgPT09IG9iai5GaWVsZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNJbmRleCA9IHRoaXMudGFibGVDb2x1bW5zLmZpbmRJbmRleCgoaSkgPT4gaS5GaWVsZCA9PT0gb2JqLkZpZWxkKTtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZGlzcGxheWVkIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZUNvbHVtbnNbcHJldmlvdXNJbmRleF0uRGlzcGxheSA9IGxvY2FsU3RvcmFnZUNvbHVtbnNbaW5kZXhdLkRpc3BsYXk7XG4gICAgICAgICAgICAgICAgLy8gcmVhcmFuZ2UgY29sdW1uc1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUl0ZW1JbkFycmF5KHRoaXMudGFibGVDb2x1bW5zLCBwcmV2aW91c0luZGV4LCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhdmVDb2x1bW5Db25maWcoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YWJsZUNvbmZpZ3VyYXRpb24gfHwgIXRoaXMudGFibGVDb25maWd1cmF0aW9uLkxvY2FsU3RvcmFnZUtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldEFzSnNvbih0aGlzLnRhYmxlQ29uZmlndXJhdGlvbi5Mb2NhbFN0b3JhZ2VLZXksIHRoaXMudGFibGVDb2x1bW5zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1vdmVJdGVtSW5BcnJheShhcnJheTogYW55W10sIHByZXZpb3VzSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCB0ZW1wID0gYXJyYXlbcHJldmlvdXNJbmRleF07XG4gICAgICAgIGFycmF5W3ByZXZpb3VzSW5kZXhdID0gYXJyYXlbaW5kZXhdO1xuICAgICAgICBhcnJheVtpbmRleF0gPSB0ZW1wO1xuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBQYWdpbmF0b3JcblxuICAgIHByaXZhdGUgbG9jYWxpemVQYWdpbmF0b3IoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YWJsZUNvbmZpZ3VyYXRpb24uQWxsb3dQYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYWdpbmF0b3IuX2ludGwuZmlyc3RQYWdlTGFiZWwgPSAnRmlyc3QgUGFnZSc7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yLl9pbnRsLnByZXZpb3VzUGFnZUxhYmVsID0gJ1ByZXZpb3VzIFBhZ2UnO1xuICAgICAgICB0aGlzLnBhZ2luYXRvci5faW50bC5uZXh0UGFnZUxhYmVsID0gJ05leHQgUGFnZSc7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yLl9pbnRsLmxhc3RQYWdlTGFiZWwgPSAnTGFzdCBQYWdlJztcbiAgICAgICAgdGhpcy5wYWdpbmF0b3IuX2ludGwuaXRlbXNQZXJQYWdlTGFiZWwgPSAnSXRlbXMgcGVyIFBhZ2UnO1xuXG4gICAgICAgIHRoaXMucGFnaW5hdG9yLl9pbnRsLmdldFJhbmdlTGFiZWwgPSAocGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCB8fCBwYWdlU2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgMCBvZiAke2xlbmd0aH1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZW5ndGggPSBNYXRoLm1heChsZW5ndGgsIDApO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHBhZ2UgKiBwYWdlU2l6ZTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBzdGFydCBpbmRleCBleGNlZWRzIHRoZSBsaXN0IGxlbmd0aCwgZG8gbm90IHRyeSBhbmQgZml4IHRoZSBlbmQgaW5kZXggdG8gdGhlIGVuZC5cbiAgICAgICAgICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCA8IGxlbmd0aCA/IE1hdGgubWluKHN0YXJ0SW5kZXggKyBwYWdlU2l6ZSwgbGVuZ3RoKSA6IHN0YXJ0SW5kZXggKyBwYWdlU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBgJHtzdGFydEluZGV4ICsgMX0gLSAke2VuZEluZGV4fSBvZiAke2xlbmd0aH1gO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIENsYXNzTmFtZXNcbiAgICBnZXRSb3dDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaGFzSW1hZ2VDb2x1bW4gPSB0aGlzLnRhYmxlQ29sdW1ucy5maW5kKChjKSA9PiBjLkNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuSW1hZ2UpO1xuXG4gICAgICAgIGlmIChoYXNJbWFnZUNvbHVtbikge1xuICAgICAgICAgICAgcmV0dXJuICdyb3ctd2l0aC1pbWFnZSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uQ2xhc3NOYW1lKGNvbHVtbjogSUNvbHVtbkRlZmluaXRpb24pOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKGNvbHVtbi5Db2x1bW5UeXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbHVtblR5cGUuQWN0aW9uczpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2FjdGlvbnMnO1xuICAgICAgICAgICAgY2FzZSBDb2x1bW5UeXBlLkljb246XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpY29ucyc7XG4gICAgICAgICAgICBjYXNlIENvbHVtblR5cGUuSW1hZ2U6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbWFnZXMnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gQ2hlY2tzIChIZWFkZXIsIENlbGwsIENvbHVtbiBvciBSb3cpXG5cbiAgICBpc0ltbXV0YWJsZUNvbHVtbiA9IENvbHVtbkhlbHBlci5pc0ltbXV0YWJsZUNvbHVtbjtcbiAgICBjYW5Db2x1bW5CZUhpZGRlbiA9IENvbHVtbkhlbHBlci5jYW5Db2x1bW5CZUhpZGRlbjtcbiAgICBjYW5Db2x1bW5CZU1vdmVkID0gQ29sdW1uSGVscGVyLmNhbkNvbHVtbkJlTW92ZWQ7XG4gICAgY2FuQ29sdW1uQmVGaWx0ZXJlZCA9IENvbHVtbkhlbHBlci5jYW5Db2x1bW5CZUZpbHRlcmVkO1xuICAgIGlzRmlsdGVyaW5nRW5hYmxlZE9uQ29sdW1uID0gQ29sdW1uSGVscGVyLmlzRmlsdGVyaW5nRW5hYmxlZE9uQ29sdW1uO1xuICAgIGhhc0ZpbHRlcnNPclNvcnRpbmdFbmFibGVkID0gQ29sdW1uSGVscGVyLmhhc0ZpbHRlcnNPclNvcnRpbmdFbmFibGVkO1xuICAgIGlzQ2VsbENsaWNrYWJsZSA9IENvbHVtbkhlbHBlci5pc0NlbGxDbGlja2FibGU7XG5cbiAgICAvLyNlbmRyZWdpb25cbn1cbiIsIjxkaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLXRvcC1wYW5lbFwiICpuZ0lmPVwidGFibGVDb25maWd1cmF0aW9uLkFsbG93RmlsdGVyIHx8IHRhYmxlQ29uZmlndXJhdGlvbi5BbGxvd0FjdGlvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWZpbHRlclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhYmxlQ29uZmlndXJhdGlvbi5BbGxvd0ZpbHRlclwiPlxuICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ7eyB0YWJsZUNvbmZpZ3VyYXRpb24uSWQgfX0tdGFibGUtZmlsdGVyLWZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJhcHBseU1haW5GaWx0ZXIoJGV2ZW50LnRhcmdldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaTE4bi1wbGFjZWhvbGRlcj1cIkBAcGxhY2Vob2xkZXItdGV4dC1maWx0ZXJSZXN1bHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJGaWx0ZXIgb24gcmVzdWx0cy4uLlwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGUtYWN0aW9uc1wiICpuZ0lmPVwidGFibGVDb25maWd1cmF0aW9uLkFsbG93QWN0aW9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlLWNsZWFyQWxsRmlsdGVyc1wiXG4gICAgICAgICAgICAgICAgb25jbGljaz1cInRoaXMuYmx1cigpXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJBbGxGaWx0ZXJzKClcIlxuICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cInRlbXBsYXRlQ2xlYXJBbGxGaWx0ZXJzLmlubmVyVGV4dFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmZpbHRlcl9saXN0X29mZjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlLXNob3dDb2x1bW5zXCJcbiAgICAgICAgICAgICAgICBbbWF0TWVudVRyaWdnZXJGb3JdPVwidmlzaWJsZUNvbHVtbnNNZW51XCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJ0ZW1wbGF0ZVNob3dIaWRlLmlubmVyVGV4dFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPnZpZXdfY29sdW1uPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8bWF0LW1lbnUgI3Zpc2libGVDb2x1bW5zTWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbWF0TWVudUNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ7eyB0YWJsZUNvbmZpZ3VyYXRpb24uSWQgfX0tdGFibGUtY29sdW1ucy1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdC1tZW51LWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHRhYmxlQ29sdW1uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ29sdW1uQ2hhbmdlKGksICRldmVudCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiY29sdW1uLkRpc3BsYXlcIiBjb2xvcj1cImFjY2VudFwiPmNoZWNrX2JveDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwiIWNvbHVtbi5EaXNwbGF5XCI+Y2hlY2tfYm94X291dGxpbmVfYmxhbms8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGNvbHVtbi5UaXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9tYXQtbWVudT5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlLWV4cG9ydC10by1leGNlbC1idXR0b25cIlxuICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cInRlbXBsYXRlRXhwb3J0Q3N2LmlubmVyVGV4dFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImV4cG9ydFRvRXhjZWwoKVwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm5vUm93c0Rpc3BsYXllZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPmZpbGVfZG93bmxvYWQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICBpZD1cInt7IHRhYmxlQ29uZmlndXJhdGlvbi5JZCB9fS10YWJsZS1wcmludC1idXR0b25cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZW5kVG9QcmludGVyKClcIlxuICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cInRlbXBsYXRlUHJpbnQuaW5uZXJUZXh0XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwibm9Sb3dzRGlzcGxheWVkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+cHJpbnQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjdGVtcGxhdGVTaG93SGlkZSBpMThuPVwiQEB0YWJsZS10b29sdGlwLWdyaWQtc2hvd0NvbHVtbnNcIj5TZWxlY3QgdmlzaWJsZSBjb2x1bW5zPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjdGVtcGxhdGVFeHBvcnRDc3YgaTE4bj1cIkBAdGFibGUtdG9vbHRpcC1leHBvcnQtY3N2XCI+RXhwb3J0IHRvIEV4Y2VsPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjdGVtcGxhdGVDbGVhckFsbEZpbHRlcnMgaTE4bj1cIkBAdGFibGUtdG9vbHRpcC1jbGVhci1hbGwtZmlsdGVyc1wiPkNsZWFyIGZpbHRlcnMgYW5kIHNvcnRpbmc8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPHRlbXBsYXRlICN0ZW1wbGF0ZVByaW50IGkxOG49XCJAQGFjdGlvbi1idG4tcHJpbnRcIj5QcmludDwvdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLXBhZ2luYXRpb25cIiAqbmdJZj1cInRhYmxlQ29uZmlndXJhdGlvbi5BbGxvd1BhZ2luYXRpb25cIj5cbiAgICAgICAgPG1hdC1wYWdpbmF0b3JcbiAgICAgICAgICAgIFtwYWdlU2l6ZU9wdGlvbnNdPVwiWzEwLCAyNSwgNTAsIDEwMF1cIlxuICAgICAgICAgICAgaWQ9XCJ7eyB0YWJsZUNvbmZpZ3VyYXRpb24uSWQgfX0tdGFibGUtcGFnaW5hdG9yXCJcbiAgICAgICAgICAgIHNob3dGaXJzdExhc3RCdXR0b25zXG4gICAgICAgID48L21hdC1wYWdpbmF0b3I+XG4gICAgPC9kaXY+XG5cbiAgICA8bWF0LXRhYmxlXG4gICAgICAgIGlkPVwie3sgdGFibGVDb25maWd1cmF0aW9uLklkIH19LXRhYmxlXCJcbiAgICAgICAgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiXG4gICAgICAgIG1hdFNvcnRcbiAgICAgICAgbWF0U29ydERpc2FibGVDbGVhcj1cImZhbHNlXCJcbiAgICAgICAgY2RrRHJvcExpc3RHcm91cFxuICAgICAgICBjZGtEcm9wTGlzdFxuICAgICAgICBjZGtEcm9wTGlzdExvY2tBeGlzPVwieFwiXG4gICAgICAgIGNka0Ryb3BMaXN0T3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcbiAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJoZWFkZXJEcm9wTGlzdERyb3BwZWQoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgICA8IS0tIFNlbGVjdCBDaGVjayBCb3ggQ29sdW1uIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInNlbGVjdFwiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5cbiAgICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwidGFibGVDb25maWd1cmF0aW9uLk11bHRpcGxlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCIkZXZlbnQgPyBtYXN0ZXJUb2dnbGUoKSA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJzZWxlY3Rpb24uaGFzVmFsdWUoKSAmJiBpc0FsbFNlbGVjdGVkKClcIlxuICAgICAgICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJzZWxlY3Rpb24uaGFzVmFsdWUoKSAmJiAhaXNBbGxTZWxlY3RlZCgpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgICA8L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIiRldmVudCA/IG9uUm93Q2hlY2tlZChyb3cpIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cInNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdylcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiB0YWJsZUNvbHVtbnM7IGxldCBpID0gaW5kZXhcIiBtYXRDb2x1bW5EZWY9XCJ7eyBjb2x1bW4uRmllbGQgfX1cIj5cbiAgICAgICAgICAgIDxtYXQtaGVhZGVyLWNlbGxcbiAgICAgICAgICAgICAgICAqbWF0SGVhZGVyQ2VsbERlZlxuICAgICAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwiaGVhZGVyRHJhZ1N0YXJ0ZWQoaSlcIlxuICAgICAgICAgICAgICAgIFtjZGtEcmFnRGF0YV09XCJ7IG5hbWU6IGNvbHVtbi5GaWVsZCB9XCJcbiAgICAgICAgICAgICAgICBbY2RrRHJhZ0Rpc2FibGVkXT1cIiFjYW5Db2x1bW5CZU1vdmVkKGNvbHVtbilcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldENvbHVtbkNsYXNzTmFtZShjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJjb2x1bW4uVGl0bGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0ZpbHRlcmluZ0VuYWJsZWRPbkNvbHVtbihjb2x1bW4pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIG1hdC1zb3J0LWhlYWRlciBbY2xhc3Muc2VsZWN0ZWRdPVwiaGFzRmlsdGVyc09yU29ydGluZ0VuYWJsZWQoY29sdW1uKVwiPnt7IGNvbHVtbi5UaXRsZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPVwidGhpcy5ibHVyKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5GaWx0ZXJEaWFsb2coY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwibm9Sb3dzRGlzcGxheWVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJoYXNGaWx0ZXJzT3JTb3J0aW5nRW5hYmxlZChjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmZpbHRlcl9saXN0PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbFxuICAgICAgICAgICAgICAgICptYXRDZWxsRGVmPVwibGV0IGVsZW1lbnQ7IGxldCByb3dJbmRleCA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRDb2x1bW5DbGFzc05hbWUoY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImlzQ2VsbENsaWNrYWJsZShjb2x1bW4pID8gb25Sb3dDaGVja2VkKGVsZW1lbnQpIDogbnVsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBbbWF0VG9vbHRpcF09XCJnZXRUb29sVGlwKGVsZW1lbnQsIGNvbHVtbilcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiY29sdW1uLkNvbHVtblR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gRGF0ZVRpbWUgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5EYXRlVGltZVwiPiB7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIERhdGUgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5EYXRlXCI+IHt7IGdldENvbnRlbnQoY29sdW1uLCBlbGVtZW50KSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVGltZSAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCJjb2x1bW5UeXBlLlRpbWVcIj4ge3sgZ2V0Q29udGVudChjb2x1bW4sIGVsZW1lbnQpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTdHJpbmcgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5TdHJpbmdcIj4ge3sgZ2V0Q29udGVudChjb2x1bW4sIGVsZW1lbnQpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBMaW5rIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cImNvbHVtblR5cGUuTGlua1wiIChjbGljayk9XCJvbkh5cGVyTGlua0NsaWNrZWQoZWxlbWVudCwgY29sdW1uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiPnt7IGdldENvbnRlbnQoY29sdW1uLCBlbGVtZW50KSB9fTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gSW1hZ2UgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJjb2x1bW5UeXBlLkltYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJ7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX1cIiBhbHQ9XCJpbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gQWN0aW9ucyAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiY29sdW1uVHlwZS5BY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFwcC1hZHZhbmNlLXRhYmxlLXJvdy1tZW51XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3dEYXRhXT1cImVsZW1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFibGVSb3dNZW51XT1cIlJvd0FjdGlvbnNDb25maWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWN0aW9uU2VsZWN0ZWQpPVwib25BY3Rpb25TZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9hcHAtYWR2YW5jZS10YWJsZS1yb3ctbWVudT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gRHJvcGRvd24gLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImNvbHVtblR5cGUuRHJvcERvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXBwLWFkdmFuY2VkLXRhYmxlLXJvdy1kcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm93RGF0YV09XCJlbGVtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NvbHVtbkRhdGFdPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhYmxlUm93RHJvcERvd25dPVwiUm93RHJvcERvd25Db25maWdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZHJvcERvd25TZWxlY3RlZCk9XCJvbkRyb3BEb3duU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvYXBwLWFkdmFuY2VkLXRhYmxlLXJvdy1kcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gSWNvbiAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImNvbHVtblR5cGUuSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImNvbHVtbi5UaXRsZSArICctJyArIGVsZW1lbnRbY29sdW1uLklkRmllbGQhXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaWNvbkNsaWNrKGVsZW1lbnQsIGNvbHVtbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPiB7eyBjb2x1bW4uTWF0SWNvbk5hbWUgfX08L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBnZXRDb250ZW50KGNvbHVtbiwgZWxlbWVudCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBOdW1iZXIgSW5wdXQgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJjb2x1bW5UeXBlLk51bWJlcklucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZsb2F0TGFiZWw9XCJuZXZlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmx5TnVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWluXT1cImdldE1pblZhbHVlRm9yTnVtYmVySW5wdXQoZWxlbWVudCwgY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4XT1cImdldE1heFZhbHVlRm9yTnVtYmVySW5wdXQoZWxlbWVudCwgY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm51bWJlcklucHV0Q2hhbmdlKGVsZW1lbnQsIGNvbHVtbiwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZWxlbWVudFtjb2x1bW4uRmllbGRdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTdWZmaXggLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG1hdFN1ZmZpeCBjbGFzcz1cInN1ZmZpeFwiICpuZ0lmPVwiY29sdW1uLlN1ZmZpeFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZWxlbWVudFtjb2x1bW4uU3VmZml4LkZpZWxkXSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBTdWZmaXggLS0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3VmZml4XCIgKm5nSWY9XCJjb2x1bW4uU3VmZml4ICYmIGNvbHVtbi5Db2x1bW5UeXBlICE9PSBjb2x1bW5UeXBlLk51bWJlcklucHV0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBlbGVtZW50W2NvbHVtbi5TdWZmaXguRmllbGRdIH19XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgIDxtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbWF0LWhlYWRlci1yb3c+XG4gICAgICAgIDxtYXQtcm93XG4gICAgICAgICAgICAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1uc1wiXG4gICAgICAgICAgICBpZD1cInt7IHJvdy5JZCB9fVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJnZXRSb3dDbGFzc05hbWUoKVwiXG4gICAgICAgICAgICAoZGJsY2xpY2spPVwib25Eb3VibGVDbGljayhyb3cpXCJcbiAgICAgICAgPjwvbWF0LXJvdz5cbiAgICA8L21hdC10YWJsZT5cblxuICAgIDxkaXYgKm5nSWY9XCJub1Jvd3NEaXNwbGF5ZWRcIiBjbGFzcz1cIm5vLXJlY29yZHNcIj5cbiAgICAgICAgPHNwYW4gaTE4bj1cIkBAdGFibGUtbm9SZXN1bHRGb3VuZFwiPk5vIG1hdGNoaW5nIHJlY29yZHMgZm91bmQ8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==