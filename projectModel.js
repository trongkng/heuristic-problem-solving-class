let numberOfRows = colsWallFlagsTable.length; 
let numberOfColumns = rowsWallFlagsTable[0].length;
console.log("number of rows: " + numberOfRows)
console.log("number of columns: " +  numberOfColumns)

function nodeModel() {
    this.distance = 0;
    this.direction = undefined
}
function direction( name, colDiff, rowDiff, symbol) {
    this.name = name;
    this.colDiff = colDiff;
    this.rowDiff = rowDiff;
    this.symbol = symbol;
}
westMove = new direction("west", -1, 0, "\u2190")
northMove = new direction("north", 0, -1,"\u2191")
eastMove = new direction("east", 1, 0, "\u2192")
southMove = new direction("south", 0, 1, "\u2193")

function getParentPosition(position, move){
    return {
        row : position.row - move.rowDiff,
        col : position.col - move.colDiff
    }
}
function basePhysicalCellComponent() {

}

function physicalCellComponent( fourDirectionsDictFlag, baseFunction ) {
    this.east = fourDirectionsDictFlag.east;
    this.west = fourDirectionsDictFlag.west;
    this.north = fourDirectionsDictFlag.north;
    this.south = fourDirectionsDictFlag.south;
    this.prototype = baseFunction;
}

function getFourDirectionsFlagForCoordinates( coordsDict ) {
    let result = {};
    let requestRow = coordsDict.row;
    let requestCol = coordsDict.col;
    /*console.log(requestCol)
    console.log(requestRow)
    console.log(coordsDict)
    */result.west = colsWallFlagsTable[requestRow][requestCol];
    result.north = rowsWallFlagsTable[requestRow][requestCol];
    result.east = colsWallFlagsTable[requestRow][requestCol + 1];
    result.south = rowsWallFlagsTable[requestRow + 1][requestCol];
    //console.log(result)
    return result;
}

let physicalTable = new Array(numberOfRows).fill(undefined).map( 
    function (undefinedValue,rowIndex) {
        return Array(numberOfColumns).fill(undefined).map(
            function getPhysicalCellForCoordinates( undefinedValue, colIndex ) {
                return Object.create( 
                getFourDirectionsFlagForCoordinates ( 
                    { row: rowIndex, col: colIndex}), basePhysicalCellComponent)
            }
        )
    } 
)