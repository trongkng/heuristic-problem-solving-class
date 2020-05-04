function visitFlagAndDirection () {
    nodeModel.call(this);
    this.visit = false
}
distanceMatrix = Array();
canonLocations = Array();
fastCheckingLocations = {};
function generateDistanceMatrix( inputLocations) {
    //inherits from base agent
    //console.log(this);
    baseAgent.call(this)
        let localCount = 0;
        for (let i in inputLocations) {
            let localRow = inputLocations[i];
            if ( fastCheckingLocations[localRow.row] == undefined) {
                    fastCheckingLocations[localRow.row]  = {};
                }
            for (let j in localRow.col) {
          
            fastCheckingLocations[localRow.row]
            [localRow.col[j]] = localCount;
            localCount ++;
            canonLocations.push({
                row: localRow.row, 
                col: localRow.col[j],
                flags: getFourDirectionsFlagForCoordinates(
                {row: localRow.row, 
                col: localRow.col[j]})
                });
        }}
        console.log(fastCheckingLocations)
    for (let i in Array(canonLocations.length).fill(1)) {
            let tempRow = Array(canonLocations.length);
            for (let i in Array(length).fill(1)) {
                tempRow [i] = 0;
            }
            distanceMatrix.push(tempRow);
    }
    this.init = () => {
        this._internalVisitFlagAndDirectionDatabase = Array();
        this._internalQueue = Array()

        for (let i in Array(numberOfRows).fill(1)) {
            let tempRow = Array(numberOfColumns);
            for (let i in Array(numberOfRows).fill(1)) {
                tempRow [i] = new visitFlagAndDirection();
            }
            this._internalVisitFlagAndDirectionDatabase.push(tempRow);
        }
        //console.log(this._internalVisitFlagAndDirectionDatabase)
    }
        this._addViableSurroundingPositionsToQueue = (givenPosition) => {
            //console.log("givenPosition " );
            //console.log(givenPosition)
            let fourWallFlags = this._getFourWallFlags(givenPosition);
            //console.log("fourWallFlags")
            //console.log(fourWallFlags)
            this._internalVisitFlagAndDirectionDatabase[givenPosition.row][givenPosition.col].visit = true;
            Array(eastMove, westMove, southMove, northMove).map( (move) => {
                //console.log("move")
                //console.log(move.name + " closed wall ? " + this._isFlagAClosedWall( fourWallFlags[move.name]))
                if (!this._isFlagAClosedWall( fourWallFlags[move.name] ) ) {
                    let newButMaybeBadPosition = this._getNewPositionBasedOnDirection(givenPosition, move)
                    //console.log("test "+ newButMaybeBadPosition.row + "," + newButMaybeBadPosition.col)
                    //console.log("visit ? " + this._internalVisitFlagAndDirectionDatabase[newButMaybeBadPosition.row][newButMaybeBadPosition.col].visit)
                    if (    this.isValidPosition(newButMaybeBadPosition) 
                            && 
                            !this._internalVisitFlagAndDirectionDatabase[newButMaybeBadPosition.row][newButMaybeBadPosition.col].visit) 
                        {
                            //console.log("push " + newButMaybeBadPosition.row + "," + newButMaybeBadPosition.col)
                            this._internalQueue.push(newButMaybeBadPosition)
                            
                            let temp = this._internalVisitFlagAndDirectionDatabase[newButMaybeBadPosition.row][newButMaybeBadPosition.col]
                            temp.distance =  this._internalVisitFlagAndDirectionDatabase[
                                                givenPosition.row][givenPosition.col].distance + 1;
                            temp.visit = true;
                            temp.direction = move;
                        } 
                }
            })
        }
    

        
        let count = 0
        for (let i in canonLocations) {
            this.init();
            this._internalQueue.push(canonLocations[i]);
            let givenPosition = canonLocations[i];
            let startingPosition = canonLocations[i];
            let count = 0
            let flush = false;

            //console.log("Restart ?")

            while (this._internalQueue.length > 0 && count < 100) {
                count++;
                //console.log("run ?")
                if (flush === true ) {
                   this._internalQueue.shift();
                   if (this._internalQueue.length == 0) break;
                   flush = false;
                }
                let givenPosition = this._internalQueue[0];
                this._internalQueue.shift();

                this._addViableSurroundingPositionsToQueue(givenPosition);
                //console.log(this._internalQueue);
                let positionReturned = this._internalQueue[0];
                if (!positionReturned) break;
                //console.log("positionReturned")
                //console.log(positionReturned)
                //console.log(startingPosition)
                //console.log(((positionReturned.row != startingPosition.row)
                //|| (positionReturned.col != startingPosition.col))
                //&& fastCheckingLocations[positionReturned.row] 
                //&& fastCheckingLocations[positionReturned.row][positionReturned.col] !== undefined) 
                
                if ( ((positionReturned.row != startingPosition.row)
                || (positionReturned.col != startingPosition.col))
                && fastCheckingLocations[positionReturned.row] 
                && fastCheckingLocations[positionReturned.row][positionReturned.col] !==undefined ) {
                   //console.log("assign");
                   //console.log(this._internalVisitFlagAndDirectionDatabase[positionReturned.row][positionReturned.col].distance)                   
                   let distanceToBeAssigned = this._internalVisitFlagAndDirectionDatabase[positionReturned.row][positionReturned.col].distance
                
                   distanceMatrix[i][fastCheckingLocations[positionReturned.row][positionReturned.col]] = 
                   this._internalVisitFlagAndDirectionDatabase[positionReturned.row][positionReturned.col].distance
                   givenPosition = this._internalQueue[0];
                   //console.log(this._internalQueue)
                   flush = true;
                } else {
                    givenPosition = positionReturned;
                }
            }
        
    }
}
new generateDistanceMatrix(inputCoordinatesOfNodesFromRowColData)
console.log(distanceMatrix)