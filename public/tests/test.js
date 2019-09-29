const Grid = require('../Grid');
const BFS = require('../algorithms/BFS');

let maze = new Grid(200, 200);


nodes = new BFS(maze, 50, 50, 100, 50);

for (let i = 0; i < nodes[i].length; i++) {
    console.log(nodes[i][0] + ', ' + nodes[i][1]);
}

// Test function to test colouring a path
function testColourSquares(Grid) {
    let rows = Grid.rows;
    let cols = Grid.cols; 
    let count = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        setSquareColour(`${i}-${j}`, count, "lightblue");
        count++;
        }
    }  
}
