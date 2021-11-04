import { Component, OnInit } from '@angular/core';
import { DataService, Person } from '../services/data.service';
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
    selectedData: Person[] = [];

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.getAll(1000).subscribe((response) => {
            this.data = response;

            this.selectedData = this.data.filter((x) => x.firstname.startsWith('A') && x.gender == 'female');
        });
    }

    rowSelected(event: [boolean, Person[]]): void {
        this.selectedData = event[1];
    }
}
