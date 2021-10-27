import { Pipe, PipeTransform } from '@angular/core';
import { IDistinctColumns } from '../interfaces/column-definition.interface';

@Pipe({ name: 'filterCriteria' })
export class FilterColumnValuesPipe implements PipeTransform {
    constructor() {}

    transform(items: IDistinctColumns[], searchText: string): IDistinctColumns[] {
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
