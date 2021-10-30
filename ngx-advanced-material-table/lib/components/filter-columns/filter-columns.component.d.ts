import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IColumnDefinition, ColumnType, IDistinctColumns, IFilterColumnsResponse, IFilterColumnsData } from '../../interfaces/column-definition.interface';
import * as i0 from "@angular/core";
export declare class FilterColumnsComponent implements OnInit {
    dialogRef: MatDialogRef<FilterColumnsComponent>;
    private fb;
    context: IFilterColumnsData;
    filterForm: FormGroup;
    searchFiltersValue: string;
    selectedColumn: IColumnDefinition;
    initialSortingDirection?: 'asc' | 'desc';
    distinctColumnValues: IDistinctColumns[];
    cancelResponse: IFilterColumnsResponse;
    columnType: typeof ColumnType;
    constructor(dialogRef: MatDialogRef<FilterColumnsComponent>, fb: FormBuilder, context: IFilterColumnsData);
    ngOnInit(): void;
    onSearchFiltersValueChanged(): void;
    onSelectFilter(change: MatCheckboxChange): void;
    onSortingValueChange(value: 'asc' | 'desc'): void;
    onApplyFiltersButton(): void;
    private sortColumns;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterColumnsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterColumnsComponent, "filter-columns", never, {}, {}, never, never>;
}
//# sourceMappingURL=filter-columns.component.d.ts.map