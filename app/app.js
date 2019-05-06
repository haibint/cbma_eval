var $ = function(selector){
    return document.querySelector(selector)
}

function App() {
    this.roomNum = 0;
    this.rooms = [];
    this.sizeInputs = [];
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
            $('#addRoomButton').style.display = 'none'
        }
    }

    //to be called back by wall click listener
    this.changeCurrentWall = function(wall) {
        this.currentWall.dom.style.backgroundColor = 'grey' //restore bgColor
        wall.dom.style.backgroundColor = 'lightgrey'
        this.currentWall = wall
        this.editor.updateEditorDom(this.currentWall)
    }

    $('#addRoomButton').addEventListener('click', this.addRoomHandler.bind(this))

    this.createSizeInputs()
}

App.prototype.createSizeInputs = function() {
    var w_input = new ControlledInput('w_input', 'text', '长：(cm)')
    var d_input = new ControlledInput('d_input', 'text', '宽：(cm)')
    var h_input = new ControlledInput('h_input', 'text', '高：(cm)')
    this.sizeInputs.push(w_input, d_input, h_input)
    $('#size-inputs').appendChild(w_input.dom)
    $('#size-inputs').appendChild(d_input.dom)
    $('#size-inputs').appendChild(h_input.dom)
}

var myApp = new App();