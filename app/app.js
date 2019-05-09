var $ = function(selector){
    return document.querySelector(selector)
}

function App() {
    this.roomNum = 0;
    this.rooms = [];
    this.sizeInputs = {};
    this.currentRoom= null;
    this.currentWall= null;
    this.editor = null;
    this.report = null;

    this.addRoomHandler = function() {
        if (!this.currentRoom){
            //validate size inputs
            var validResult = this.validateSize(this.sizeInputs.w_input.myValue, this.sizeInputs.d_input.myValue, this.sizeInputs.h_input.myValue)
            if(validResult){
                //create new room
                this.rooms.push(new Room("Room"+this.roomNum, validResult.w, validResult.d, validResult.h))
                this.roomNum ++;
                this.currentRoom = this.rooms[this.rooms.length-1]
                //render lastest room to container
                $('#roomContainer').appendChild(this.currentRoom.dom)
                //render editor with current room, front wall
                this.currentWall = this.currentRoom.walls.front
                this.report = new Report(this.currentRoom)
                this.editor = new Editor(this.currentWall, this.report)
                //hide button
                $('#addRoomPage').style.display = 'none'
            } else {
                //size input not valid
            }
        }
    }

    //to be called back by wall click listener
    this.changeCurrentWall = function(wall) {
        this.currentWall.dom.style.backgroundColor = 'grey' //restore bgColor
        wall.dom.style.backgroundColor = 'lightgrey'
        this.currentWall = wall
        this.editor.updateEditorDom(this.currentWall)
        this.report.updateReport()
    }

    $('#addRoomButton').addEventListener('click', this.addRoomHandler.bind(this))

    this.createSizeInputs()
}

App.prototype.createSizeInputs = function() {
    var w_input = new ControlledInput('w_input', 'text', '长：(m)')
    var d_input = new ControlledInput('d_input', 'text', '宽：(m)')
    var h_input = new ControlledInput('h_input', 'text', '高：(m)')
    this.sizeInputs.w_input = w_input
    this.sizeInputs.d_input = d_input
    this.sizeInputs.h_input = h_input
    $('#size-inputs').classList.add("input-group")
    $('#size-inputs').classList.add("mb-3")
    $('#size-inputs').classList.add("mt-3")
    $('#size-inputs').appendChild(w_input.dom)
    $('#size-inputs').appendChild(d_input.dom)
    $('#size-inputs').appendChild(h_input.dom)
}

App.prototype.validateSize = function(w, d, h) {
    //coerced to number
    w = +w;
    d = +d;
    h = +h;
    if (w>0 && d>0 && h>0){
        return {w:w, d:d, h:h}
    } 
    return false
}

var myApp = new App();