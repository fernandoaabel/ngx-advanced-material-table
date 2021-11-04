import { Component, Input, OnInit } from '@angular/core';

export interface TableRow {
    Name: string;
    Description: string;
    Input?: string;
    Output?: string;
}

@Component({
    selector: 'app-property-table',
    templateUrl: './property-table.component.html',
    styleUrls: ['./property-table.component.scss'],
})
export class PropertyTableComponent implements OnInit {
    @Input() rows: TableRow[] = [];

    constructor() {}

    ngOnInit(): void {}
}
