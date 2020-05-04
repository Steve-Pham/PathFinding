import Node from './Node.js';

function Grid(numRows, numCols) {

    /**
     * The number of rows
     * @type number
     */
    this.rows = numRows

    /**
     * The number of columns
     * @type number
     */
    this.cols = numCols

    /**
     * Two Dimensional Arrays containing all the nodes in the graph
     */
    this.nodes = this.buildGrid(this.rows, this.cols)
}

Grid.prototype.buildGrid = function(rows, cols) {

    this.nodes = new Array(rows);

    for (let i = 0; i < rows; ++i) {
        this.nodes[i] = new Array(cols);
        for (let j = 0; j < cols; ++j) {
            this.nodes[i][j] = new Node(j, i, false, false)
            //console.log(nodes[i][j].x + ', ' + nodes[i][j].y)
        }
    }
    return this.nodes
}

Grid.prototype.getNode = function(row, col) {
    return this.nodes[col][row]
}

Grid.prototype.nodeInside = function(col, row) {
    return (row >= 0 && row < this.rows) && (col >=0 && col < this.cols)
}

Grid.prototype.isBlocked = function(row, col) {
    return this.nodes[row][col].blocked
}

Grid.prototype.setBlocked = function(row, col, blocked) {
    this.nodes[row][col].blocked = blocked 
}

Grid.prototype.getNeighbours = function(node) {
    // Do something 
    let row = node.y;
    let col = node.x;

    let neighbours = [];
    let nodes = this.nodes;

    if (this.nodeInside(col-1, row)) {
        neighbours.push(nodes[row][col-1]);
    }
    if (this.nodeInside(col+1, row)) {
        neighbours.push(nodes[row][col+1]);
    }
    if (this.nodeInside(col,row-1)) {
        neighbours.push(nodes[row-1][col]);
    }
    if (this.nodeInside(col,row+1)) {
        neighbours.push(nodes[row+1][col]);
    }
    if (this.nodeInside(col-1, row-1)) {
        neighbours.push(nodes[row-1][col-1]);
    }
    if (this.nodeInside(col+1, row+1)) {
        neighbours.push(nodes[row+1][col+1]);
    }
    if (this.nodeInside(col+1, row-1)) {
        neighbours.push(nodes[row-1][col+1]);
    }
    if (this.nodeInside(col-1, row+1)) {
        neighbours.push(nodes[row+1][col-1]);
    }

    return neighbours
}

export default Grid; 
