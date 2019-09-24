
import Grid from './Grid.js';
import BFS from './algorithms/BFS.js';
import DFS from './algorithms/DFS.js';

function initialize(Grid) {
    let table = document.getElementById("grid");

    let TB = document.createElement('TBODY');

    table.append(TB);

    let rows = Grid.rows;
    let cols = Grid.cols;

    console.log(rows + ', ' + cols);

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('TR');
        TB.append(tr);
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('TD');
            tr.append(td);
        }
    }
}
//
let maze = new Grid(26, 60);
initialize(maze);