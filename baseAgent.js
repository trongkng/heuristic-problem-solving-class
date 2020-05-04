'use strict';
//const emptyPureDict = {};
function baseAgent(){
    this.isGoalState = (givenPosition) => {
        let row = givenPosition.row;
        let col = givenPosition.col;
        let fourWallFlags = this._getFourWallFlags(givenPosition);
        if (    (row == numberOfRows - 1 && fourWallFlags.south !== "1")
                || (row == 0  && fourWallFlags.north !== '1')
                || (col == numberOfColumns - 1 && fourWallFlags.east !== "1")
                || (col == 0  && fourWallFlags.west !== "1") )
        {
                return true;
        } else return false;
    }
    
    this.isValidPosition = (givenPosition) => {
        return (givenPosition.col >= 0 
        && givenPosition.col <= 19
        && givenPosition.row >= 0
        && givenPosition.row <= 19)
    }
    this._getFourWallFlags = (givenPosition) => {
        return getFourDirectionsFlagForCoordinates(givenPosition);
    }
    this._getNewPostionAndNewAction = ({row, col}) => {
        return { position: {row: row, col: col}, actionFrom: 'east'}
    }
    this._isFlagAClosedWall = (flag)=> {
        return flag === '1';
    }
    this._getNewPositionBasedOnDirection = (position, direction) => {
        /*console.log("about to be changed position")
        console.log(position.row + "," + position.col)
                    console.log("newly returned position");

        console.log ({
            row: position.row + direction.rowDiff,
            col: position.col + direction.colDiff
            })*/
        return {
            row: position.row + direction.rowDiff,
            col: position.col + direction.colDiff
            }
    }
     return this;
}




//console.log(BFSAgentProps);
//const BFSAgent = Object.create(baseAgent(), BFSAgentProps);

// new gives 'this' in BFSAgent() a meaning so it is not undefined
