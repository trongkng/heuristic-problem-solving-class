let rows=`1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1
0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0
1	1	1	1	1	1	1	1	1	0	1	1	1	1	1	1	1	1	1	0
0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1
0	1	1	0	0	0	0	0	0	1	1	1	0	1	1	1	0	0	0	0
1	1	0	0	0	0	0	0	0	0	1	1	1	0	1	1	1	0	0	0
0	1	1	0	0	0	0	0	0	1	1	1	0	1	1	1	0	0	0	0
1	1	1	0	0	0	0	0	0	0	1	1	1	0	1	1	1	0	0	0
0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
0	0	0	0	0	1	1	1	0	0	0	0	0	0	0	0	0	0	0	0
0	0	0	0	1	1	1	1	0	0	0	0	0	0	0	0	0	0	1	1
0	0	0	0	0	1	1	0	0	1	1	1	0	0	0	0	0	0	0	0
0	0	0	0	0	0	1	1	0	1	1	1	0	0	0	0	0	0	0	0
0	0	0	0	0	1	1	0	0	0	1	1	1	0	0	0	0	0	0	0
0	0	0	0	0	0	1	1	0	1	1	1	0	0	0	0	0	0	0	0
0	0	0	0	0	1	1	0	0	0	1	1	1	0	1	1	1	0	0	0
0	0	0	0	0	0	1	1	0	1	1	1	0	1	1	1	0	0	0	0
0	0	0	0	0	1	1	0	1	1	1	1	1	0	1	1	1	0	0	0
0	1	1	0	0	0	1	1	0	1	1	1	1	1	1	1	0	0	0	0
1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1`
let cols = `1																				1
1																				1
1																				1
1						1		1		1								1		1
1			1	1	1	1	1	1	1				1				1	1	1	1
1			1	1	1	1	1	1	1				1				1	1	1	1
1			1	1	1	1	1	1	1				1				1	1	1	1
1			1	1	1	1	1	1	1		1		1		1		1	1	1	1
1			1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1
1		1	1	1	1		1		1	1	1	1	1	1	1	1	1	1	1	1
1	1	1	1	1				1	1	1	1	1	1	1	1	1	1		1	1
1	1	1	1	1				1	1	1		1	1	1	1	1	1			0
1	1	1	1	1	1			1					1	1	1	1	1	1	1	1
1	1	1	1	1	1				1				1	1	1	1	1	1	1	1
1	1	1	1	1	1			1	1				1	1	1	1	1	1	1	1
1	1	1	1	1	1			1	1				1	1		1	1	1	1	1
1	1	1	1	1	1			1	1				1				1	1	1	1
1	1	1	1	1	1			1					1				1	1	1	1
1	1		1	1	1			1									1	1	1	1
1					1											1		1	1	1`

let inputCoordinatesOfNodesFromRowColData=[{row: 19, col: [0,3,5,9,15,16,18,10]},
    {row: 18, col :[8,13]},
    {row: 17, col : [8, 12, 16]},
    {row: 16, col : []},
    {row: 15, col : [16]},
    {row: 14, col : []},
    {row: 13, col : [7]},
    {row: 12, col : [8,12]},
    {row: 11, col : [9,17]},
    {row: 10, col : [7,17,19]},
    {row: 9, col : [0,8]},
    {row: 8, col : []},
    {row: 7, col : [9,13]},
    {row: 6, col : []},
    {row: 5, col : []},
    {row: 4, col : []},
    {row: 3, col : [0,3,4,12,16]},
    {row: 2, col : [10,19]},
    {row: 1, col : [0,9,18]},
    {row: 0, col : [0,19]},]

let destinationCoordinatesForAStarCalculation=[
    {row: 11, col :19},
    //{row: 19, col :19},
]