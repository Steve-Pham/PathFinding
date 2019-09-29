import Grid from './Grid.js';
import BFS from './algorithms/BFS.js';
import DFS from './algorithms/DFS.js';

// Initialize Grid/Maze
let maze = new Grid(26, 60);

// Search Button DOM
let searchButton = document.getElementById('search');

// Reset Button DOM
let resetButton = document.getElementById('reset');

// Starting Node
let startingNode;

// Ending Node
let endingNode;

// This is the drop down menu value, BFS or DFS 
let dropDownValue = '';

// These are the default starting node/ending node locations
let start_row = 10;
let end_row = 10;
let start_col = 20;
let end_col = 35;

let curr_dragged = '';

/** Function to initiate the Grid
 * 
 * @param {Grid} Grid This is to initialize the grid/board  
 */
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
            td.setAttribute("id", `${i}-${j}`); // Set id of td to its row and column value 
            td.setAttribute("class", 'holder');
            if (i === start_row && j === start_col) {
                let start = document.createElement("div");
                start.setAttribute("id", "box");
                start.setAttribute("draggable", "true");
                td.append(start);
            }

            if (i === end_row && j === end_col) {
                let end = document.createElement("div");
                end.setAttribute("id", "box2");
                end.setAttribute("draggable", "true");
                td.append(end);
            }
            tr.append(td);
        }
    }


    // Starting Node, Ending Node colours
    startingNode = document.getElementById(`${start_row}-${start_col}`);
    endingNode = document.getElementById(`${end_row}-${end_col}`);

    startingNode.style.backgroundColor = "green";
    endingNode.style.backgroundColor = "red";


}

/** Function to change colour of a node
 * 
 * @param {string} id contains the id of the grid
 * @param {number} count contains the delay added to callstack of function 
 * @param {string} colour contains the string of the colour for the node to be changed
 */
function setSquareColour(id, count, colour) {
    if (id === `${start_row}-${start_col}` || id === `${end_row}-${end_col}`) {
        return;
    }
    setTimeout(() => {
        let node = document.getElementById(id);
        node.style.backgroundColor = colour;
    }, count*25); 
}

/** Function to animate the graph 
 * 
 * @param {Array of Nodes} path This contains the path from the starting node to end node 
 * @param {Array of Nodes} animatedNodes This contains all the neighbours that were visited during the search 
 */
function animateGrid(path, animatedNodes) {
    let i;
    for (i = 0; i < animatedNodes.length; i++) {
        setSquareColour(`${animatedNodes[i].y}-${animatedNodes[i].x}`, i, "lightblue");
    }
    for (let j = 0; j < path.length; j++) {
        setSquareColour(`${path[j][1]}-${path[j][0]}`, i, "yellow");
        i++;
    }
}

/** Function to execute Search
 * 
 * @param {Grid} grid 
 * @param {number} start_row start row of node
 * @param {number} start_col start col of node
 * @param {number} end_row  end row of node
 * @param {number} end_col end col of node 
 * @param {string} type This is a string to determine whether to execute DFS or BFS
 */
function doSearch(grid, start_row, start_col, end_row, end_col, type) {
    let path = [];
    let animatedNodes = [];
    if (type === "Breadth-First Search") {
        path = BFS(grid, start_row, start_col, end_row, end_col, animatedNodes);
        animateGrid(path, animatedNodes);
    }
    else if (type === "Depth-First Search") {
        path = DFS(grid, start_row, start_col, end_row, end_col, animatedNodes);
        animateGrid(path, animatedNodes);
    }
    else {
        console.log("No Algorithm selected");
    }
}

/** Function to reset the grid, making all nodes the colour: white
 * 
 * @param {Grid} maze 
 */
function resetGrid(maze) {
    for (let i = 0; i < maze.rows; i++) {
        for (let j = 0; j < maze.cols; j++) {
            setSquareColour(`${i}-${j}`, 0, "white");
        }
    }
    // Starting Node, Ending Node colours
    startingNode = document.getElementById(`${start_row}-${start_col}`);
    endingNode = document.getElementById(`${end_row}-${end_col}`);

    startingNode.style.backgroundColor = "green";
    endingNode.style.backgroundColor = "red";
}

/** Function to fully reset Grid, making all nodes unvisited
 * 
 */
function fullReset() {
    resetGrid(maze);
    maze = new Grid(26, 60); // Because nodes are marked as visited 
}


/** Get the dropdown menu value, to determine if BFS or DFS is wanted
 * 
 */
$('.dropdown-item').click(function() {
    dropDownValue = $(this).text();
    let span = document.getElementById('thetitle');
    if (dropDownValue === 'Depth-First Search') {
        span.textContent = "You have chosen Depth-First Search, this does not guarantee shortest path!"
    }
    else if (dropDownValue === "Breadth-First Search") {
        span.textContent = "You have chosen Breadth-First Search, this guarantees shortest path!"
    }
});

/** 
 * 
 */
function init() {

    let box = document.getElementById('box'); // Start Node
    let box2 = document.getElementById('box2'); // End Node

    box.addEventListener("dragstart", dragstart)
    box.addEventListener("dragend", dragend)

    box2.addEventListener("dragstart", dragstart)
    box2.addEventListener("dragend", dragend)

    let containers = document.getElementsByClassName('holder');

    for (let container of containers) {
        container.addEventListener("dragover", dragover)
        container.addEventListener("dragenter", dragenter)
        container.addEventListener("dragleave", dragleave)
        container.addEventListener("drop", drop)
        /*
        container.addEventListener("click", ()=> {
            drawWall(container);
        })
        */
    }

    // Event Listeners
    searchButton.addEventListener('click', () => {
        fullReset();
        doSearch(maze, start_row, start_col, end_row, end_col, dropDownValue);
    })

    resetButton.addEventListener('click', () => {
        fullReset();
    })
}

 
// THE DRAG FUNCTIONS
function dragstart(e) {
    this.className += " held"
    if (this === document.getElementById('box')) {
        curr_dragged = "green";
    }
    else if (this === document.getElementById('box2')) {
        curr_dragged = "red";
    }
    setTimeout(()=> {
        this.className="invisible";
    }, 0);
}

function dragend() {
    this.className = "box";
  }

function dragover(e) {
    e.preventDefault()
  }

function dragenter(e) {
    /*
    if (e.target.className === "holder" ) {
        e.target.style.backgroundColor = "green";
    } 
    */
  }

function dragleave(e) {
    if (e.target.className === "holder") {
        e.target.style.backgroundColor = "white";
    }
  }

function drop(e) {
    e.preventDefault();
    if (e.target.className === "holder" && curr_dragged === "green") {
        let box = document.getElementById('box');
        e.target.style.backgroundColor = "green";
        box.parentNode.style.backgroundColor = "white";
        box.parentNode.removeChild(box);
        e.target.append(box);
        
        let matrix = e.target.id.split('-');
        start_row = matrix[0];
        start_col = matrix[1];
    }
    else if (e.target.className === "holder" && curr_dragged === "red") {
        let box = document.getElementById('box2');
        e.target.style.backgroundColor = "red";
        box.parentNode.style.backgroundColor = "white";
        box.parentNode.removeChild(box);
        e.target.append(box);
        
        let matrix = e.target.id.split('-');
        end_row = matrix[0];
        end_col = matrix[1];
    }
}
/*
function drawWall(currnode) {
    setSquareColour(currnode.id, 0, "#404040");
    // Get the id
    let matrix = currnode.id.split('-');
    let curr_row = parseInt(matrix[0]);
    let curr_col = parseInt(matrix[1]);
 
    let nodeToChange = maze.getNode(curr_row, curr_col);

}
*/



initialize(maze); // Make the grid
init(); // Initialize the event listners









