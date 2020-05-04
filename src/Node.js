function Node(x, y, status, blocked) {
    /**
     * This is the x value on the grid
     * @type number
     */
    this. x = x

    /**
     * This is the y value on the grid
     * @type number 
     */
    // Y coordinate
    this.y = y

    /**
     * This is a boolean value if the node was visited or not
     * @type boolean
     */
    this.status = status

    /**
     * This is a boolean value if the node is blocked 
     */
    this.blocked = blocked 
}

export default Node;