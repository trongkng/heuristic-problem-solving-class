
let colsDataRows = cols.split("\n")
let colsWallFlagsTable = colsDataRows.map( function(x) {return x.split("\t")} )

let rowsDataRows = rows.split("\n")
let rowsWallFlagsTable = rowsDataRows.map( function(x) { return x.split("\t")} )

//console.log(rowsWallFlagsTable.length)
//console.log(colsWallFlagsTable.length)
const tableManagerDivs = new Array()
const tableManager = new Array()

function drawMatrix(divId, tableManagerIn)
{
    let tableDiv = document.getElementById(divId)
    let tableElement = document.createElement("table");
    for (rowsWallFlagsIndex in rowsWallFlagsTable ) {
        let tableRowManager = new Array();
        let tableRow = document.createElement("tr");
        let rowIndex = Number(rowsWallFlagsIndex)
        //console.log(rowIndex)
        let inputFlagsRow = rowsWallFlagsTable[rowIndex]
        let inputFlagsColRow = colsWallFlagsTable[rowIndex]
        //console.log(inputFlagsColRow)
        for (rowFlagItemIndex in inputFlagsRow) {

            let rowItemIndex = Number(rowFlagItemIndex);
            let rowFlag = inputFlagsRow[rowItemIndex]
            let cell = document.createElement("td");
            tableRowManager.push(cell);
            let a = cell.style
            a.backgroundColor = 'white'
            a.borderWidth = 0
            a.borderStyle = 'solid'

            a.borderColor='green'
            a.width=20
            a.height=20
            if (rowFlag === '1') {
               a.borderTopWidth='medium'
            } else {
                //a.borderTopWidth = 'thin'
            }

            try {
                let colFlag = inputFlagsColRow[rowItemIndex]
                if (colFlag === '1') {
                   a.borderLeftWidth='medium'
                } else {
                   //a.borderLeftWidth = 'thin'
                }
                if ( Number(rowItemIndex) === (rowsWallFlagsTable[0].length - 1)) {
                   if (inputFlagsColRow[ Number(rowItemIndex) + 1] === '1') {
                       a.borderRightWidth='medium'
                   } else {
                       //a.borderRightWidth = 'thin'
                   } 
                }
            } catch ( e) { } 

            tableRow.appendChild(cell);
        }
        tableManagerIn.push(tableRowManager)
        tableElement.appendChild(tableRow);
       }

    tableDiv.appendChild(tableElement);
    return tableManagerIn;
}

