import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FilterColumnValuesPipe {
    transform(items, searchText) {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter((it) => {
            return it.name.toString().toLowerCase().includes(searchText);
        });
    }
}
FilterColumnValuesPipe.ɵfac = function FilterColumnValuesPipe_Factory(t) { return new (t || FilterColumnValuesPipe)(); };
FilterColumnValuesPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterCriteria", type: FilterColumnValuesPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterColumnValuesPipe, [{
        type: Pipe,
        args: [{ name: 'filterCriteria' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUvc3JjL2xpYi9waXBlcy9maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFJcEQsTUFBTSxPQUFPLHNCQUFzQjtJQUMvQixTQUFTLENBQUMsS0FBeUIsRUFBRSxVQUFrQjtRQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OzRGQVpRLHNCQUFzQjs2RkFBdEIsc0JBQXNCO3VGQUF0QixzQkFBc0I7Y0FEbEMsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSURpc3RpbmN0Q29sdW1ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLWRlZmluaXRpb24uaW50ZXJmYWNlJztcblxuQFBpcGUoeyBuYW1lOiAnZmlsdGVyQ3JpdGVyaWEnIH0pXG5leHBvcnQgY2xhc3MgRmlsdGVyQ29sdW1uVmFsdWVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShpdGVtczogSURpc3RpbmN0Q29sdW1uc1tdLCBzZWFyY2hUZXh0OiBzdHJpbmcpOiBJRGlzdGluY3RDb2x1bW5zW10ge1xuICAgICAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWFyY2hUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdC5uYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19