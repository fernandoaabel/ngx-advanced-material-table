import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterColumnsComponent } from './components/filter-columns/filter-columns.component';
import { MaterialModule } from './modules/material.module';
import { AdvancedMaterialTableComponent } from './ngx-advanced-material-table.component';
import { FilterColumnValuesPipe } from './pipes/filter.pipe';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
    declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe],
    exports: [AdvancedMaterialTableComponent],
    entryComponents: [FilterColumnsComponent],
})
export class NgxAdvancedMaterialTableModule {}
