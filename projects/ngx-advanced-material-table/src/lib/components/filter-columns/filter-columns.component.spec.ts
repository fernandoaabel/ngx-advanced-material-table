import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material/material.module';
import { FilterColumnsComponent } from './filter-columns.component';
import { ColumnType, IFilterColumnsData } from '../../interfaces/column-definition.interface';
import { FilterColumnValuesPipe } from '../../pipes/filter.pipe';
import { MatCheckboxChange } from '@angular/material/checkbox';

describe('Filter Columns Component', () => {
    let component: FilterColumnsComponent;
    let fixture: ComponentFixture<FilterColumnsComponent>;

    const mockDialogRef = {
        close: jasmine.createSpy('close'),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FilterColumnsComponent],
            imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
            providers: [
                FormBuilder,
                { provide: MatDialogRef, useValue: mockDialogRef },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: MockData,
                },
                {
                    provide: FilterColumnValuesPipe,
                    useValue: {
                        transform: jasmine.createSpy('transform'),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterColumnsComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        component.selectedColumn.SortDirection = undefined;
        fixture.detectChanges();
    });

    it('should create', () => {
        // ARRANGE
        const expectedOrder = [MockData.distinctData[0], MockData.distinctData[1], MockData.distinctData[2]];

        // ASSERT
        expect(component).toBeTruthy();
        expect(component.distinctColumnValues).toEqual(expectedOrder);
        expect(component.selectedColumn).toEqual(MockData.selectedColumn);
    });

    it('onSearchFiltersValueChanged should set search value', () => {
        // ARRANGE
        const filter = ['Brad'];
        expect(component.searchFiltersValue).toBeUndefined();
        component.filterForm.controls.SearchFilters.setValue(filter);

        // ACT
        component.onSearchFiltersValueChanged();

        // ASSERT
        expect(component.searchFiltersValue).toEqual(filter);
    });

    it('onSelectFilter should set search value', () => {
        // ARRANGE
        const event = new MatCheckboxChange();
        const checkBox: any = {
            value: component.distinctColumnValues[0].name,
            checked: true,
        };
        event.source = checkBox;
        event.checked = true;
        expect(component.distinctColumnValues[0].checked).toBeFalsy();

        // ACT
        component.onSelectFilter(event);

        // ASSERT
        expect(component.distinctColumnValues[0].checked).toBeTruthy();
    });

    it('should change value to ascending', () => {
        // ACT
        component.onSortingValueChange('asc');

        // ASSERT
        expect(component.selectedColumn.SortDirection).toContain('asc');
    });

    it('should change value to descending', () => {
        // ACT
        component.onSortingValueChange('desc');

        // ASSERT
        expect(component.selectedColumn.SortDirection).toContain('desc');
    });

    it('should change value to empty when ascending is clicked again', () => {
        // ACT
        component.onSortingValueChange('asc');
        component.onSortingValueChange('asc');

        // ASSERT
        expect(component.selectedColumn.SortDirection).toBe(undefined);
    });

    it('should change value to empty when descending is clicked again', () => {
        // ACT
        component.onSortingValueChange('desc');
        component.onSortingValueChange('desc');

        // ASSERT
        expect(component.selectedColumn.SortDirection).toBe(undefined);
    });

    it('should close window when filter applied', () => {
        component.onApplyFiltersButton();
        expect(mockDialogRef.close).toHaveBeenCalledTimes(1);
    });
});

const MockData: IFilterColumnsData = {
    selectedColumn: {
        Field: 'string',
        Title: 'string',
        Display: true,
        ColumnType: ColumnType.String,
    },
    distinctData: [
        {
            name: 'John Smith',
            displayedName: 'John Smith',
            checked: false,
        },
        {
            name: 'Brad Clint',
            displayedName: 'Brad Clint',
            checked: false,
        },
        {
            name: 'Jeff Charles',
            displayedName: 'Jeff Charles',
            checked: false,
        },
    ],
};
