function BFS(grid, start_row, start_col, end_row, end_col, allNodes) {

    let startingNode = grid.getNode(start_col, start_row);
    let endingNode = grid.getNode(end_col, end_row);

    //console.log(startingNode.x + ', ' + startingNode.y);
    //console.log(endingNode.x + ', ' +endingNode.y)

    let queue = [] 

    queue.push(startingNode);
    startingNode.status = true;

    // BFS go wide, always look at neighbours 
    while (queue.length != 0) {

        let currentNode = queue.shift();

        if (currentNode.x === endingNode.x && currentNode.y === endingNode.y) {
            return getPath(currentNode);
        }

        let neighbours = grid.getNeighbours(currentNode) 
        for (let i = 0; i < neighbours.length; i++) {
            let currentNeighbour = neighbours[i]

            // If node was visited already 
            if (currentNeighbour.status || currentNeighbour.blocked) {
                continue; 
            }
            allNodes.push(currentNeighbour);

            queue.push(currentNeighbour);
            currentNeighbour.status = true 

            // Add reference to previous node, this is to 
            currentNeighbour.parent = currentNode 
        }       
    }
    return []
}

function getPath(node) {
    let path = [[node.x, node.y]];
    let i = 0;
    while (node.parent) {
        node = node.parent
        path.push([node.x, node.y]);
    }

    // Return the path from start to finish
    return path.reverse()
}

export default BFS;