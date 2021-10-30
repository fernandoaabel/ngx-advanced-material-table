import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterColumnsComponent } from './components/filter-columns/filter-columns.component';
import { MaterialModule } from './modules/material.module';
import { AdvancedMaterialTableComponent } from './ngx-advanced-material-table.component';
import { FilterColumnValuesPipe } from './pipes/filter.pipe';
import * as i0 from "@angular/core";
export class NgxAdvancedMaterialTableModule {
}
NgxAdvancedMaterialTableModule.ɵfac = function NgxAdvancedMaterialTableModule_Factory(t) { return new (t || NgxAdvancedMaterialTableModule)(); };
NgxAdvancedMaterialTableModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxAdvancedMaterialTableModule });
NgxAdvancedMaterialTableModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule, FormsModule, ReactiveFormsModule, MaterialModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxAdvancedMaterialTableModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
                declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe],
                exports: [AdvancedMaterialTableComponent],
                entryComponents: [FilterColumnsComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxAdvancedMaterialTableModule, { declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe], imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule], exports: [AdvancedMaterialTableComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkdmFuY2VkLW1hdGVyaWFsLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS9zcmMvbGliL25neC1hZHZhbmNlZC1tYXRlcmlhbC10YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN6RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFRN0QsTUFBTSxPQUFPLDhCQUE4Qjs7NEdBQTlCLDhCQUE4QjtnRkFBOUIsOEJBQThCO29GQUw5QixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO3VGQUtoRSw4QkFBOEI7Y0FOMUMsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO2dCQUN6RSxZQUFZLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQztnQkFDOUYsT0FBTyxFQUFFLENBQUMsOEJBQThCLENBQUM7Z0JBQ3pDLGVBQWUsRUFBRSxDQUFDLHNCQUFzQixDQUFDO2FBQzVDOzt3RkFDWSw4QkFBOEIsbUJBSnhCLDhCQUE4QixFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixhQURuRixZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsYUFFOUQsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZpbHRlckNvbHVtbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmlsdGVyLWNvbHVtbnMvZmlsdGVyLWNvbHVtbnMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvbWF0ZXJpYWwubW9kdWxlJztcclxuaW1wb3J0IHsgQWR2YW5jZWRNYXRlcmlhbFRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsdGVyQ29sdW1uVmFsdWVzUGlwZSB9IGZyb20gJy4vcGlwZXMvZmlsdGVyLnBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBNYXRlcmlhbE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtBZHZhbmNlZE1hdGVyaWFsVGFibGVDb21wb25lbnQsIEZpbHRlckNvbHVtbnNDb21wb25lbnQsIEZpbHRlckNvbHVtblZhbHVlc1BpcGVdLFxyXG4gICAgZXhwb3J0czogW0FkdmFuY2VkTWF0ZXJpYWxUYWJsZUNvbXBvbmVudF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtGaWx0ZXJDb2x1bW5zQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEFkdmFuY2VkTWF0ZXJpYWxUYWJsZU1vZHVsZSB7fVxyXG4iXX0=