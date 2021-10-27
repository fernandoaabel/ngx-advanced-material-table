import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisibleColumnsComponent } from './visible-columns.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { IColumnDefinitionBase } from '../../interfaces/column-definition.interface';
import { MaterialModule } from '../../modules/material/material.module';

describe('Visible Columns Component', () => {
    let component: VisibleColumnsComponent;
    let fixture: ComponentFixture<VisibleColumnsComponent>;

    const mockDialogRef = {
        open: jasmine.createSpy('open'),
        close: jasmine.createSpy('close'),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [VisibleColumnsComponent],
            imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: cloneDeep(MockGridColumnConfig),
                },
            ],
        });
        fixture = TestBed.createComponent(VisibleColumnsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    describe('onInit', () => {
        it('should create and have visible columns', () => {
            // ASSERT
            expect(component.hasVisibleColumns()).toBeTruthy();
        });
    });

    describe('getSelectAllCheckedValue', () => {
        it('to be truthy', () => {
            const checkboxConfig: any = { checked: true, source: null };
            component.onChangeSelectAll(checkboxConfig);
            fixture.detectChanges();
            expect(component.getSelectAllCheckedValue()).toBeTruthy();
        });

        it('to be falsy', () => {
            const checkboxConfig: any = { checked: false, source: null };
            component.onChangeSelectAll(checkboxConfig);
            fixture.detectChanges();
            expect(component.getSelectAllCheckedValue()).toBeFalsy();
        });
    });

    describe('hasVisibleColumns', () => {
        it('to be truthy', () => {
            const checkboxConfig: any = { checked: true, source: null };
            component.onChangeSelectAll(checkboxConfig);
            expect(component.hasVisibleColumns()).toBeTruthy();
        });

        it('to be falsy', () => {
            const checkboxConfig: any = { checked: false, source: null };
            component.onChangeSelectAll(checkboxConfig);
            expect(component.hasVisibleColumns()).toBeFalsy();
        });
    });

    describe('selecting visible columns', () => {
        it('applying changes should emit an event back to the parent/list component', () => {
            const checkboxConfig: any = { checked: true, source: null };
            component.onChangeSelectAll(checkboxConfig);

            component.onApplyColumnVisibility();
            expect(mockDialogRef.close).toHaveBeenCalled();
        });

        it('deselecting a column should remove it from emitted output', () => {
            const checkboxConfig: any = { checked: false, source: null };

            component.onChange(checkboxConfig, 0);
            component.onApplyColumnVisibility();

            expect(mockDialogRef.close).toHaveBeenCalled();
        });
    });

    afterEach(() => {
        fixture.destroy();
    });
});

const MockGridColumnConfig: IColumnDefinitionBase[] = [
    {
        Display: true,
        Field: 'PreplannedFrom',
        Title: 'Pre-Planned Date From',
    },
    {
        Display: true,
        Field: 'PreplannedTo',
        Title: 'Pre-Planned Date To',
    },
    {
        Display: true,
        Field: 'RemainingTime',
        Title: 'Remaining time',
    },
    {
        Display: true,
        Field: 'PlanningArea',
        Title: 'Planning Areas',
    },
    {
        Display: true,
        Field: 'ZipCode',
        Title: 'Zip',
    },
    {
        Display: true,
        Field: 'City',
        Title: 'City',
    },
    {
        Display: true,
        Field: 'OffsiteLocationName',
        Title: 'Location',
    },
    {
        Display: true,
        Field: 'TypeOfVisitName',
        Title: 'Type of Visit',
    },
    {
        Display: true,
        Field: 'Duration',
        Title: 'Duration',
    },
    {
        Display: true,
        Field: 'AppointmentStatusName',
        Title: 'Appointment Status',
    },
    {
        Display: true,
        Field: 'CustomerRequirementFrom',
        Title: 'Customer Requirement Date From',
    },
    {
        Display: true,
        Field: 'CustomerRequirementTo',
        Title: 'Customer Requirement Date To',
    },
    {
        Display: true,
        Field: 'ServiceCause',
        Title: 'Service Cause',
    },
];
