import { get } from 'lodash';
import { IColumnDefinition } from '../interfaces/column-definition.interface';

export function getTextFieldFromSelectColumn(row: any, selectedColumn: IColumnDefinition, listOfValues: any[]) {
    if (!selectedColumn.SelectedField) {
        return;
    }

    // Gets the Selected Value in row[SelectedField.SelectField]
    const valueSelected = get(row, selectedColumn.SelectedField.SelectField);

    // Finds the value within the many possible values, where ValueField matches SelectField
    const valueFromArray = listOfValues.find((v) => v[selectedColumn.SelectedField!.ValueField] === valueSelected);

    // Returns TextField
    return valueFromArray[selectedColumn.SelectedField.TextField];
}
