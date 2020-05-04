//drawMatrix("abc", tableManager)
const agents = [
{divName: "bfs", heading: "Breadth First Search", agent: new BFSAgent()},
{divName: "ucs", heading: "Uniform Cost Search",agent: new UCSAgent()},
{divName: "dls", heading: "Depth Limit Search",agent: new DLSAgent()},
{divName: "prim", heading: "Prim Algorithm",agent: new PrimAgent()},
{divName: "kruskal", heading: "Kruskal Algorithm",agent: new KruskalAgent()},
{divName: "dijkstra", heading: "Dijkstra Algorithm",agent: new DijkstraAgent()},
{divName: "astar", heading: "A* Search",agent: new AStarAgent()},
]
agents.map( x => x.tableManager = new Array());
let timeTaken=[]
let globalStartPosition = {row: 19, col: 0}
let statsDivElement = document.createElement("div")
statsDivElement.setAttribute("id","stats");
document.getElementById("first").appendChild(statsDivElement)

for (let agent of agents) {
    let divElement = document.createElement("div")
    divElement.setAttribute("size","A4");
    divElement.setAttribute("id",agent.divName);
    divElement.setAttribute("class","algo");

    document.body.appendChild(divElement)
    let heading = document.createElement("h3");
    heading.textContent=agent.heading
    divElement.appendChild(heading)
    drawMatrix(agent.divName, agent.tableManager);
    let t1 = performance.now();
    agent.agent.start(globalStartPosition, agent.tableManager)
    let t2 = performance.now();
    let differenceInMillis = t2-t1;
    timeTaken.push(differenceInMillis)
    console.log(`time taken: ${differenceInMillis}`)
}
let elementDivElement = document.createElement("table")
elementDivElement.innerHTML+="<tr><td> Algorithm</td><td>Time taken (ms)</td></tr>"

timeTaken.map( function(x, index) {
    elementDivElement.innerHTML+="<tr><td>" + agents[index].heading + "</td><td>" + x + "</td></tr>"
})
    statsDivElement.appendChild(elementDivElement);

console.log(timeTaken)