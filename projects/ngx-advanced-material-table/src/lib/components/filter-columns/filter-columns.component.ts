import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
    IColumnDefinition,
    ColumnType,
    IDistinctColumns,
    IFilterColumnsResponse,
    IFilterColumnsData,
} from '../../interfaces/column-definition.interface';
import { Value } from '../../helpers/values.helper';
import { DialogActionType } from '../../interfaces/enums/dialog-action.enum';

@Component({
    selector: 'filter-columns',
    templateUrl: './filter-columns.component.html',
    styleUrls: ['./filter-columns.component.scss'],
})
export class FilterColumnsComponent implements OnInit {
    filterForm: FormGroup;
    searchFiltersValue: string = '';
    selectedColumn: IColumnDefinition;
    initialSortingDirection?: 'asc' | 'desc';
    distinctColumnValues: IDistinctColumns[] = [];
    cancelResponse: IFilterColumnsResponse = { action: DialogActionType.Cancel };
    columnType = ColumnType;

    constructor(
        public dialogRef: MatDialogRef<FilterColumnsComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public context: IFilterColumnsData
    ) {
        this.selectedColumn = this.context.selectedColumn;
        this.distinctColumnValues = this.sortColumns(this.context.distinctData);
        this.initialSortingDirection = this.selectedColumn.SortDirection;
        this.filterForm = this.fb.group({
            SearchFilters: [''],
        });
    }

    ngOnInit(): void {
        this.filterForm.controls.SearchFilters.valueChanges.subscribe(() => this.onSearchFiltersValueChanged());
    }

    onSearchFiltersValueChanged(): void {
        this.searchFiltersValue = this.filterForm.controls.SearchFilters.value;
    }

    onSelectFilter(change: MatCheckboxChange) {
        this.distinctColumnValues.forEach((x) => {
            if (x.name === change.source.value) {
                x.checked = change.checked;
            }
        });
    }

    onSortingValueChange(value: 'asc' | 'desc') {
        if (this.selectedColumn.SortDirection === value) {
            this.selectedColumn.SortDirection = undefined;
        } else {
            this.selectedColumn.SortDirection = value;
        }
    }

    onApplyFiltersButton(): void {
        this.selectedColumn.FilterValues = [];
        this.selectedColumn.FilterValues = this.distinctColumnValues.filter((x) => x.checked === true).map((x) => x.name);

        const response: IFilterColumnsResponse = {
            action: DialogActionType.Ok,
            sortingHasChanged: this.initialSortingDirection !== this.selectedColumn.SortDirection,
            selectedColumn: this.selectedColumn,
        };

        this.dialogRef.close(response);
    }

    private sortColumns(columns: IDistinctColumns[]): IDistinctColumns[] {
        if (columns.length === 0) {
            return [];
        }

        if (columns[0].name instanceof Date) {
            columns.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else if (Value.isNumber(columns[0].name)) {
            columns.sort((a, b) => (a.name as number) - (b.name as number));
        } else if (Value.isString(columns[0].name)) {
            columns.sort((a, b) => (a.name as string).localeCompare(b.name as string));
        }

        return columns;
    }
}
