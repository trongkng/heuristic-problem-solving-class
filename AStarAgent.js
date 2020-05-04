function visitFlagAndDirection () {
    nodeModel.call(this);
    this.visit = false
}

function AStarAgent( ) {
    baseAgent.call(this)
    this._nodeExpandOrder = Array()
    this.init = () => {
        this._internalVisitFlagAndDirectionDatabase = Array();
        this._internalQueue = Array()
        this._nodeQueue = Array()
        this._waitingToBeAcceptedNodeQueue = Array()
        this._waitingToBeAcceptedNodeQueueFlag = Array()
        this._acceptedNodes = Array()
        for (let i in Array(numberOfRows).fill(1)) {
            let tempRow = Array(numberOfColumns);
            this._waitingToBeAcceptedNodeQueueFlag[i] = Array(numberOfColumns).fill(false)
            for (let i in Array(numberOfRows).fill(1)) {
                tempRow [i] = new visitFlagAndDirection();

            }
            this._internalVisitFlagAndDirectionDatabase.push(tempRow);
        }
        //console.log(this._internalVisitFlagAndDirectionDatabase)
    }
    this._estimateDistanceToClosestExitAndUpdate = (givenPositionAndSoFarDistance) =>{
        let row = givenPositionAndSoFarDistance.row;
        let col = givenPositionAndSoFarDistance.col;
        // because we have many exits, we have to return the min
        // estimated distance to the closest exit. 
        let minDistanceToClosestExit = 100000000; 
        destinationCoordinatesForAStarCalculation.map( (destination) => {
            let straightLineDistance = Math.sqrt( 
                (destination.row - row)**2 
                + (destination.col - col)**2)
            if (straightLineDistance < minDistanceToClosestExit) {
                minDistanceToClosestExit = straightLineDistance;
            }
        })
        if (minDistanceToClosestExit > 0 && minDistanceToClosestExit < 100000000) {
            givenPositionAndSoFarDistance.distance += minDistanceToClosestExit
        }
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
    this._run= ()=>{ 
        //let count = 0
        this.init();
        //for (let i in canonLocations) {
        this._nodeQueue.push(Object.assign( canonLocations[0], {distance: 0}));
        //this._waitingToBeAcceptedNodeQueue.push(Object.assign( canonLocations[0], {distance: 0}));
        //this._acceptedNodes.push(canonLocations[0])
        let loopCount = 0;
        while ( loopCount < 400) {
            loopCount++
            let i = 0
            // find the minimum node and add them to the accepted nodes
            let min = 10000;
            let minIndex = -1;
            /*this._nodeQueue.map( (x, index) => {
                if (x.distance < min) 
                    { 
                        min = x.distance;
                        minIndex = index;
                    }
            })*/
            this._nodeQueue.map ( (x, index) => {
                    this._estimateDistanceToClosestExitAndUpdate(x);
                    // all unaccepted nodes in nodeQueue add to waiting list
                    // overwrite existing waiting list nodes if the distance is shorter
                    if (this._waitingToBeAcceptedNodeQueueFlag[x.row][x.col].visit) {
                        //overwrite
                        let foundValue = this._waitingToBeAcceptedNodeQueue.find( item => 
                            item.row == x.row && item.col == x.col );
                        if (foundValue
                         && foundValue.distance 
                         && foundValue.distance > x.distance) 
                         foundValue.distance = x.distance;
                     } else {
                        //add node
                        this._waitingToBeAcceptedNodeQueue.push(
                            {
                                row: x.row, 
                                col: x.col,
                                distance: x.distance
                            });
                        this._waitingToBeAcceptedNodeQueueFlag[x.row][x.col] = true;
                     }
                }
            )

            while (this._nodeQueue.length > 0) this._nodeQueue.pop();
            // keep all pending nodes in waiting list

            // add the minimum node to the internal queue to discover new nodes    
            this._waitingToBeAcceptedNodeQueue.sort( 
                (a,b) => { 
                    if (a.distance < b.distance) 
                    return -1 
                    else return 1;
                }
            )
            this._acceptedNodes.push(this._waitingToBeAcceptedNodeQueue[0]);
            //this._waitingToBeAcceptedNodeQueue.push(this._nodeQueue[0])
            
            this._internalQueue.push(this._waitingToBeAcceptedNodeQueue[0]);
            let givenPosition = this._waitingToBeAcceptedNodeQueue[0]
            let startingPosition = this._waitingToBeAcceptedNodeQueue[0]
            this._waitingToBeAcceptedNodeQueue.shift();
            
            //this._nodeExpandOrder.push(givenPosition);
            let count = 0
            let flush = false;
            
            // when this while loop ends,
            // nodeQueue contains all discovered nodes
            // process all nodes in internalQueue
            //only processing internalQueue
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
                
                   distanceMatrix[i][fastCheckingLocations[positionReturned.row][positionReturned.col]] = 
                   this._internalVisitFlagAndDirectionDatabase[positionReturned.row][positionReturned.col].distance
                   
                   givenPosition = this._internalQueue[0];
                   //console.log(this._internalQueue)
                   let node = Object.assign(givenPosition);
                   node.distance = distanceToBeAssigned - startingPosition.distance;
                   this._nodeQueue.push(node);
                   flush = true;

                } else {
                    givenPosition = positionReturned;
                }
            }
        }}
        let self= this;
        this.start = (position, tableManagerIn) => {
            self._run();
            aStarAgent = new AStarAgent();
            /*dlsAgent.dls(canonLocations[0], 0,5)*/
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
            //console.log(aStarAgent._acceptedNodes);
    }
    //console.log(this._internalVisitFlagAndDirectionDatabase)
}
/**/
/*dlsAgent._nodeExpandOrder.map( (x, index) => { 
    tableManager[x.row][x.col].textContent += "*" + index + "*"

})*/
//console.log(distanceMatrix)