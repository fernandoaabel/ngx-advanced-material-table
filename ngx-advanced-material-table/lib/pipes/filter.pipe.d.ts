import { PipeTransform } from '@angular/core';
import { IDistinctColumns } from '../interfaces/column-definition.interface';
import * as i0 from "@angular/core";
export declare class FilterColumnValuesPipe implements PipeTransform {
    transform(items: IDistinctColumns[], searchText: string): IDistinctColumns[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterColumnValuesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterColumnValuesPipe, "filterCriteria">;
}
