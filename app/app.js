var $ = function(selector){
    return document.querySelector(selector)
}

function App() {
    this.roomNum = 0;
    this.rooms = [];
    this.addRoomButton = $('#addRoomButton');
    this.currentRoom= null;
    this.currentWall= null;
    this.editor = null;

    this.addRoomHandler = function() {
        if (!this.currentRoom){
            //create new room
            this.roomNum ++;
            this.rooms.push(new Room("Room"+this.roomNum, 100, 80, 50))
            this.currentRoom = this.rooms[this.rooms.length-1]
            //render lastest room to container
            $('#roomContainer').appendChild(this.currentRoom.dom)
            //render editor with current room, front wall
            this.currentWall = this.currentRoom.walls.front
            this.editor = new Editor(this.currentWall)

            //hide button
            this.addRoomButton.style.display = 'none'
        }
    }

    //to be called back by wall click listener
    this.changeCurrentWall = function(wall) {
        this.currentWall.dom.style.backgroundColor = 'grey' //restore bgColor
        wall.dom.style.backgroundColor = 'lightgrey'
        this.currentWall = wall
        this.editor.updateEditorDom(this.currentWall)
    }

    addRoomButton.addEventListener('click', this.addRoomHandler.bind(this))

}

var myApp = new App();