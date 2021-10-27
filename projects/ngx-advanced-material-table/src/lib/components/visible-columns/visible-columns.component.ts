import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IColumnDefinitionBase } from '../../interfaces/column-definition.interface';

@Component({
    selector: 'app-visible-columns',
    templateUrl: './visible-columns.component.html',
    styleUrls: ['./visible-columns.component.scss'],
})
export class VisibleColumnsComponent {
    localColumnConfig: IColumnDefinitionBase[] = [];

    constructor(public dialogRef: MatDialogRef<VisibleColumnsComponent>, @Inject(MAT_DIALOG_DATA) public data: IColumnDefinitionBase[]) {
        this.localColumnConfig = data;
    }

    onChange(event: MatCheckboxChange, index: number) {
        this.localColumnConfig[index].Display = event.checked;
    }

    onChangeSelectAll(event: MatCheckboxChange) {
        this.localColumnConfig.map((x) => (x.Display = event.checked));
    }

    getSelectAllCheckedValue() {
        return this.localColumnConfig.filter((x) => !x.Display).length === 0;
    }

    getSelectAllIndeterminate() {
        const howManyChecked = this.localColumnConfig.length;
        const howManyNotChecked = this.localColumnConfig.filter((x) => !x.Display).length;
        return howManyNotChecked > 0 && howManyChecked > howManyNotChecked;
    }

    hasVisibleColumns(): boolean {
        return this.localColumnConfig.filter((x) => x.Display).length > 0;
    }

    onApplyColumnVisibility() {
        const columnsVisible = {};
        this.localColumnConfig.forEach((x) => (columnsVisible[x.Field] = x.Display));
        this.dialogRef.close(columnsVisible);
    }
}
