function visitFlagAndDirection () {
    nodeModel.call(this);
    this.visit = false
}

function BFSAgent() {
    //inherits from base agent
    //console.log(this);
    baseAgent.call(this);
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
                        temp.distance =  this._internalVisitFlagAndDirectionDatabase[givenPosition.row][givenPosition.col].distance + 1;
                        temp.visit = true;
                        temp.direction = move;
                    } 
            }
        })
    }

    // 1
    // 2 3
    // Ex: BFS starts at 2. It then starts at 1 
    // to dispatch a new action, then 
    // it starts at 3 and dispatches a new action.
    // It does not go like DFS.
    // It does not work like a real biological agent.
    // Hence, it needs to return a new position
    // that is attached to the new action.
    // if the new position is the same position as the given one,
    // the agent does not switch to a new path but stays on the
    // same path
    this.getNewPositionAndNewAction = (givenPosition) => {
        //console.log("given position");
        //console.log(givenPosition)
        //return this._getNewPostionAndNewAction(givenPosition);
        this._addViableSurroundingPositionsToQueue(givenPosition);
        let positionReturned = this._internalQueue[0];
        let actionFromPrint = this._internalVisitFlagAndDirectionDatabase[
        positionReturned.row][positionReturned.col];

        this._internalQueue.shift();
        /*console.log( "going " + actionFromPrint.direction.name);
                console.log("positionReturned")
        console.log(positionReturned )
        console.log("queue size : " + this._internalQueue.length)
        */return {
            position: positionReturned, 
            actionFrom: this._internalVisitFlagAndDirectionDatabase[positionReturned.row][positionReturned.col],
            distance: this._internalVisitFlagAndDirectionDatabase[positionReturned.row][positionReturned.col].distance
            };
    }
    let self = this;
    this.start = (position, tableManagerIn)=>{        
        let count = 0;
        while ( count < 1000 && !self.isGoalState(position) && self.isValidPosition(position) ) {
    //for (let i in Array(300).fill(1)) {
        //if (count === 0)     agent.init(position);
        count ++;
        let potentiallyNewPositionAndAction = self.getNewPositionAndNewAction(position) ;
        position = potentiallyNewPositionAndAction.position;
//         console.log("new position in loop")
//         console.log(potentiallyNewPositionAndAction.position)
        //console.log(potentiallyNewPositionAndAction)
        if (self.isValidPosition(potentiallyNewPositionAndAction.position)) {
            let pos = potentiallyNewPositionAndAction.position;
            let directionLeadingToThisPos = potentiallyNewPositionAndAction.actionFrom.direction;
            //tableManager[pos.row][pos.col].style.backgroundColor='black'
            let cell = tableManagerIn[pos.row][pos.col];
            cell.textContent += potentiallyNewPositionAndAction.distance;
            let parentPos = getParentPosition(pos, directionLeadingToThisPos)

            let parentCell = tableManagerIn[parentPos.row][parentPos.col]
            //if (parentCell.textContent.length === 0 ) {
                parentCell.textContent += directionLeadingToThisPos.symbol;
            //}
        }
    }
    }
    return this;
}