import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterColumnsComponent } from './components/filter-columns/filter-columns.component';
import { MaterialModule } from './modules/material/material.module';
import { AdvancedMaterialTableComponent } from './ngx-advanced-material-table.component';
import { VisibleColumnsComponent } from './components/visible-columns/visible-columns.component';
import { FilterColumnValuesPipe } from './pipes/filter.pipe';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
    declarations: [
        AdvancedMaterialTableComponent,
        VisibleColumnsComponent,
        FilterColumnsComponent,
        FilterColumnValuesPipe,
        // AdvanceTableRowMenuComponent,
        // AdvancedTableRowDropDownComponent,
        // AdvancedTableRowDynamicDropDownComponent,
        // AdvancedTableRowDynamicCatalogueSelectComponent,
    ],
    exports: [AdvancedMaterialTableComponent, VisibleColumnsComponent],
    entryComponents: [VisibleColumnsComponent, FilterColumnsComponent],
})
export class NgxAdvancedMaterialTableModule {}
