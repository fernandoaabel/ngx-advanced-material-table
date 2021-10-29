import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, Person } from '../shared/services/data.service';
import { COLUMNS_CONFIG_LIST, TABLE_CONFIG } from './table.config';

@Component({
    selector: 'lib-table-demo-page',
    templateUrl: './table-demo-page.component.html',
    styleUrls: ['./table-demo-page.component.scss'],
})
export class TableDemoPageComponent implements OnInit {
    TABLE_CONFIG = TABLE_CONFIG;
    COLUMNS_CONFIG_LIST = COLUMNS_CONFIG_LIST;

    data: Person[] = [];
    selectedItems: Person[] = [];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.getAll(1000).subscribe((response) => {
            this.data = response;
        });
    }
}
