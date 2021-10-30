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
FilterColumnValuesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnValuesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FilterColumnValuesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnValuesPipe, name: "filterCriteria" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0, type: FilterColumnValuesPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'filterCriteria' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUvc3JjL2xpYi9waXBlcy9maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFJcEQsTUFBTSxPQUFPLHNCQUFzQjtJQUMvQixTQUFTLENBQUMsS0FBeUIsRUFBRSxVQUFrQjtRQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O29IQVpRLHNCQUFzQjtrSEFBdEIsc0JBQXNCOzRGQUF0QixzQkFBc0I7a0JBRGxDLElBQUk7bUJBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJRGlzdGluY3RDb2x1bW5zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb2x1bW4tZGVmaW5pdGlvbi5pbnRlcmZhY2UnO1xuXG5AUGlwZSh7IG5hbWU6ICdmaWx0ZXJDcml0ZXJpYScgfSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJDb2x1bW5WYWx1ZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKGl0ZW1zOiBJRGlzdGluY3RDb2x1bW5zW10sIHNlYXJjaFRleHQ6IHN0cmluZyk6IElEaXN0aW5jdENvbHVtbnNbXSB7XG4gICAgICAgIGlmICghaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hUZXh0ID0gc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0Lm5hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=