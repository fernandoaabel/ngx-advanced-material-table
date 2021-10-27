import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAdvancedMaterialTableComponent } from './ngx-advanced-material-table.component';

describe('NgxAdvancedMaterialTableComponent', () => {
    let component: NgxAdvancedMaterialTableComponent;
    let fixture: ComponentFixture<NgxAdvancedMaterialTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxAdvancedMaterialTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxAdvancedMaterialTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
