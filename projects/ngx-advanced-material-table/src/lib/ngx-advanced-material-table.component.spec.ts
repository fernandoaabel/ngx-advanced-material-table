import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvancedMaterialTableComponent } from './ngx-advanced-material-table.component';

describe('NgxAdvancedMaterialTableComponent', () => {
    let component: AdvancedMaterialTableComponent;
    let fixture: ComponentFixture<AdvancedMaterialTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdvancedMaterialTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedMaterialTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
