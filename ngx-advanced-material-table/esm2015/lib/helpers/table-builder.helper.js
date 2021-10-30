import { ColumnHelper } from './columns.helper';
export class TableBuilderHelper {
    static buildTable(dataArray, columns, columnNames) {
        let out = '<table><thead><tr>';
        for (const h of columnNames) {
            out += '<th>' + h + '</th>';
        }
        out += '</tr></thead><tbody>';
        for (const data of dataArray) {
            out += '<tr>';
            for (const j of columns) {
                if (j !== 'select' && j !== 'actions') {
                    out += '<td>' + (ColumnHelper.getContent(j, data) || '-') + '</td>';
                }
            }
            out += '</tr>';
        }
        out += '</tbody></table>';
        return out;
    }
    static printPageBuilderDefault(table, printedOnLabel = 'Printed On') {
        return ('<html><head>' +
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
            '</div></body></html>');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWR2YW5jZWQtbWF0ZXJpYWwtdGFibGUvc3JjL2xpYi9oZWxwZXJzL3RhYmxlLWJ1aWxkZXIuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxNQUFNLE9BQU8sa0JBQWtCO0lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUksU0FBYyxFQUFFLE9BQWlCLEVBQUUsV0FBcUI7UUFDekUsSUFBSSxHQUFHLEdBQUcsb0JBQW9CLENBQUM7UUFDL0IsS0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDekIsR0FBRyxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQy9CO1FBQ0QsR0FBRyxJQUFJLHNCQUFzQixDQUFDO1FBQzlCLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxFQUFFO1lBQzFCLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDZCxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtnQkFDckIsSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ25DLEdBQUcsSUFBSSxNQUFNLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7aUJBQ3ZFO2FBQ0o7WUFDRCxHQUFHLElBQUksT0FBTyxDQUFDO1NBQ2xCO1FBQ0QsR0FBRyxJQUFJLGtCQUFrQixDQUFDO1FBQzFCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxLQUFhLEVBQUUsaUJBQXlCLFlBQVk7UUFDL0UsT0FBTyxDQUNILGNBQWM7WUFDZCx1Q0FBdUM7WUFDdkMsa0RBQWtEO1lBQ2xELFVBQVU7WUFDVixxQ0FBcUM7WUFDckMsdURBQXVEO1lBQ3ZELDBDQUEwQztZQUMxQyx3REFBd0Q7WUFDeEQsNENBQTRDO1lBQzVDLHVEQUF1RDtZQUN2RCw0Q0FBNEM7WUFDNUMsaURBQWlEO1lBQ2pELEtBQUs7WUFDTCxjQUFjO1lBQ2QsSUFBSTtZQUNKLElBQUksSUFBSSxFQUFFO1lBQ1YsT0FBTztZQUNQLDhCQUE4QjtZQUM5QixLQUFLO1lBQ0wsc0JBQXNCLENBQ3pCLENBQUM7SUFDTixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW5IZWxwZXIgfSBmcm9tICcuL2NvbHVtbnMuaGVscGVyJztcblxuZXhwb3J0IGNsYXNzIFRhYmxlQnVpbGRlckhlbHBlciB7XG4gICAgc3RhdGljIGJ1aWxkVGFibGU8VD4oZGF0YUFycmF5OiBUW10sIGNvbHVtbnM6IHN0cmluZ1tdLCBjb2x1bW5OYW1lczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgb3V0ID0gJzx0YWJsZT48dGhlYWQ+PHRyPic7XG4gICAgICAgIGZvciAoY29uc3QgaCBvZiBjb2x1bW5OYW1lcykge1xuICAgICAgICAgICAgb3V0ICs9ICc8dGg+JyArIGggKyAnPC90aD4nO1xuICAgICAgICB9XG4gICAgICAgIG91dCArPSAnPC90cj48L3RoZWFkPjx0Ym9keT4nO1xuICAgICAgICBmb3IgKGNvbnN0IGRhdGEgb2YgZGF0YUFycmF5KSB7XG4gICAgICAgICAgICBvdXQgKz0gJzx0cj4nO1xuICAgICAgICAgICAgZm9yIChjb25zdCBqIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoaiAhPT0gJ3NlbGVjdCcgJiYgaiAhPT0gJ2FjdGlvbnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dCArPSAnPHRkPicgKyAoQ29sdW1uSGVscGVyLmdldENvbnRlbnQoaiwgZGF0YSkgfHwgJy0nKSArICc8L3RkPic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9ICc8L3RyPic7XG4gICAgICAgIH1cbiAgICAgICAgb3V0ICs9ICc8L3Rib2R5PjwvdGFibGU+JztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJpbnRQYWdlQnVpbGRlckRlZmF1bHQodGFibGU6IHN0cmluZywgcHJpbnRlZE9uTGFiZWw6IHN0cmluZyA9ICdQcmludGVkIE9uJyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAnPGh0bWw+PGhlYWQ+JyArXG4gICAgICAgICAgICAnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiIG1lZGlhPVwicHJpbnRcIj4nICtcbiAgICAgICAgICAgICcgIEBwYWdlIHsgc2l6ZTogYXV0bzsgICBtYXJnaW46IDI1cHggMCAyNXB4IDA7IH0nICtcbiAgICAgICAgICAgICc8L3N0eWxlPicgK1xuICAgICAgICAgICAgJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIiBtZWRpYT1cImFsbFwiPicgK1xuICAgICAgICAgICAgJ3RhYmxle2JvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IGZvbnQtc2l6ZTogMTJweDsgfVxcbicgK1xuICAgICAgICAgICAgJ3RhYmxlLCB0aCwgdGQge2JvcmRlcjogMXB4IHNvbGlkIGdyZXl9XFxuJyArXG4gICAgICAgICAgICAndGgsIHRkIHt0ZXh0LWFsaWduOiBjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7fVxcbicgK1xuICAgICAgICAgICAgJ3Age2ZvbnQtd2VpZ2h0OiBib2xkOyBtYXJnaW4tbGVmdDoyMHB4IH1cXG4nICtcbiAgICAgICAgICAgICd0YWJsZSB7IHdpZHRoOjk0JTsgbWFyZ2luLWxlZnQ6MyU7IG1hcmdpbi1yaWdodDozJX1cXG4nICtcbiAgICAgICAgICAgICdkaXYuYnMtdGFibGUtcHJpbnQgeyB0ZXh0LWFsaWduOmNlbnRlcjt9XFxuJyArXG4gICAgICAgICAgICAnPC9zdHlsZT48L2hlYWQ+PHRpdGxlPlByaW50IFRhYmxlPC90aXRsZT48Ym9keT4nICtcbiAgICAgICAgICAgICc8cD4nICtcbiAgICAgICAgICAgIHByaW50ZWRPbkxhYmVsICtcbiAgICAgICAgICAgICc6ICcgK1xuICAgICAgICAgICAgbmV3IERhdGUoKSArXG4gICAgICAgICAgICAnIDwvcD4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnMtdGFibGUtcHJpbnRcIj4nICtcbiAgICAgICAgICAgIHRhYmxlICtcbiAgICAgICAgICAgICc8L2Rpdj48L2JvZHk+PC9odG1sPidcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=