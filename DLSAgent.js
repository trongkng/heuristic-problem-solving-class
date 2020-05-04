function visitFlagAndDirection () {
    nodeModel.call(this);
    this.visit = false
}

function DLSAgent( ) {
    baseAgent.call(this)
    this._nodeExpandOrder = Array()
    this.init = () => {
        this._internalVisitFlagAndDirectionDatabase = Array();
        this._internalQueue = Array()
        this._nodeQueue = Array()
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
                             ((!this._internalVisitFlagAndDirectionDatabase[newButMaybeBadPosition.row][newButMaybeBadPosition.col].visit) 
                            || this._internalVisitFlagAndDirectionDatabase[newButMaybeBadPosition.row][newButMaybeBadPosition.col].distance 
                                > this._internalVisitFlagAndDirectionDatabase[
                                                givenPosition.row][givenPosition.col].distance + 1))
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
    

        
        //let count = 0
        this.init();

        //for (let i in canonLocations) {
        this.run = () => {
            let count = 0
            let flush = false;
            let givenPosition = this._internalQueue[0]
            let startingPosition = this._internalQueue[0]
            //console.log("givenPosition")
            //console.log(givenPosition)
            // when this while loop ends, we finish expanding the least total cost 
            // node
            // 
            while (this._internalQueue.length > 0 && count < 100) {
                count++;
                //console.log("run ?")
                if (flush === true ) {
                   this._internalQueue.shift();
                   if (this._internalQueue.length == 0) break;
                   flush = false;
                }
                let givenPosition = this._internalQueue[0];
                if (this.isGoalState(givenPosition)) {
                    return;
                }
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
                
                   //distanceMatrix[i][fastCheckingLocations[positionReturned.row][positionReturned.col]] = 
                   this._internalVisitFlagAndDirectionDatabase[positionReturned.row][positionReturned.col].distance
                   
                   givenPosition = this._internalQueue[0];
                   //console.log(this._internalQueue)
                   let node = Object.assign(givenPosition);
                   node.distance = distanceToBeAssigned;
                   this._nodeQueue.push(node);
                   flush = true;

                } else {
                    givenPosition = positionReturned;
                }
            }
        
    }
    this.dls =(dlsStartPosition, depth, depthLimit) => {
        if (dlsStartPosition.row==19 && dlsStartPosition.col == 0){
            //console.log(window.count);
            if (window.count == 1) return;
            window.count = 1;

        }
        //else document.count=1;
        //console.log(document.count)
        //this._nodeQueue.push(canonLocations[0]);
        //let loopCount = 0;
        //while (this._nodeQueue.length > 0 && loopCount < 400) {
            //loopCount++
            //let i = 0    
            //console.log("dlsStartPosition " + JSON.stringify(dlsStartPosition))
            //console.log("depth " + depth)
            if (depth >= depthLimit) return;
            this._internalQueue.push(dlsStartPosition);

            //this._nodeQueue.shift();
            //this._nodeExpandOrder.push(givenPosition);
            this.run();
            //console.log("nodeQueue")
            //console.log(JSON.stringify(this._nodeQueue));
            let localNodeQueue = Array()
            while (this._nodeQueue.length > 0) {
                let a = this._nodeQueue[0];
                this._nodeQueue.shift();
                localNodeQueue.push(a);
            }
            for (let i in localNodeQueue) {
                //console.log("call at depth " + depth + " with " + JSON.stringify(localNodeQueue[i]))
                this.dls(localNodeQueue[i], depth +1, depthLimit);
            }
    }
    let self=this;
    this.start = (position, tableManagerIn)=> {
        
        self.dls(canonLocations[0], 0,5)
        self._internalVisitFlagAndDirectionDatabase.map(
        function (x,rowIndex) {
            x.map ( (y, colIndex) => {
                if ( y.distance >0)  {
                    //console.log(y)
                    tableManagerIn[rowIndex][colIndex].textContent += y.distance
                    let pos={row: rowIndex, col: colIndex};
                    let directionLeadingToThisPos = y.direction;
                    let parentPos = getParentPosition(pos, directionLeadingToThisPos)
                    //console.log(pos);
                    //console.log(parentPos);
                    let parentCell = tableManagerIn[parentPos.row][parentPos.col]
                    parentCell.textContent += directionLeadingToThisPos.symbol;
                }
            })
        }

)
    }
    //console.log(this._internalVisitFlagAndDirectionDatabase)
}

/*dlsAgent._nodeExpandOrder.map( (x, index) => { 
    tableManager[x.row][x.col].textContent += "*" + index + "*"

})*/
//console.log(distanceMatrix)