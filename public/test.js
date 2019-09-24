const Grid = require('./Grid');
const BFS = require('./algorithms/BFS');

let maze = new Grid(200, 200);


nodes = new BFS(maze, 50, 50, 100, 50);

for (let i = 0; i < nodes[i].length; i++) {
    console.log(nodes[i][0] + ', ' + nodes[i][1]);
}
