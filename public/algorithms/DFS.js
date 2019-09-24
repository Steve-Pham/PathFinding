function DFS(grid, start_row, start_col, end_row, end_col) {
    
    let startingNode = grid.getNode(start_col, start_row); // Get starting node
    let endingNode = grid.getNode(end_col, end_row); // Get ending node

    let stack = [];

    stack.push(startingNode);
    startingNode.status = true // Visited already 
    //console.log("Starting node " +  startingNode.x + ', ' + startingNode.y)

    while (stack.length != 0) {

        let currentNode = stack.pop();

        if (currentNode.x === endingNode.x && currentNode.y === endingNode.y) {
            return getPath(currentNode);
        }
        
        let neighbours = grid.getNeighbours(currentNode);
        for (let i = 0; i < neighbours.length; i++) {
            let currentNeighbour = neighbours[i];

            //console.log(currentNeighbour.x + ', ' + currentNeighbour.y);
            // If node was visited already 
            if (currentNeighbour.status) {
                continue; 
            }

            stack.push(currentNeighbour); 
            currentNeighbour.status = true

            currentNeighbour.parent = currentNode // Add reference to previous node 
        }

    }
}

function getPath(node) {
    let path = [[node.x, node.y]];
    while (node.parent) {
        node = node.parent
        path.push([node.x, node.y]);
    }

    // Return the path from start to finish
    return path.reverse()
}


export default DFS;