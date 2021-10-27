export class TableBuilderHelper {
    static buildTable<T>(dataArray: T[], columns: string[], columnNames: string[]): string {
        let out = '<table><thead><tr>';
        for (const h of columnNames) {
            out += '<th>' + h + '</th>';
        }
        out += '</tr></thead><tbody>';
        for (const data of dataArray) {
            out += '<tr>';
            for (const j of columns) {
                if (j !== 'select' && j !== 'actions') {
                    out += '<td>' + (data[j] || '-') + '</td>';
                }
            }
            out += '</tr>';
        }
        out += '</tbody></table>';
        return out;
    }

    static printPageBuilderDefault(table: string, printedOnLabel: string): string {
        return (
            '<html><head>' +
            '<style type="text/css" media="print">' +
            '  @page { size: auto;   margin: 25px 0 25px 0; }' +
            '</style>' +
            '<style type="text/css" media="all">' +
            'table{border-collapse: collapse; font-size: 12px; }\n' +
            'table, th, td {border: 1px solid grey}\n' +
            'th, td {text-align: center; vertical-align: middle;}\n' +
            'p {font-weight: bold; margin-left:20px }\n' +
            'table { width:94%; margin-left:3%; margin-right:3%}\n' +
            'div.bs-table-print { text-align:center;}\n' +
            '</style></head><title>Print Table</title><body>' +
            '<p>' +
            printedOnLabel +
            ': ' +
            new Date() +
            ' </p>' +
            '<div class="bs-table-print">' +
            table +
            '</div></body></html>'
        );
    }
}
