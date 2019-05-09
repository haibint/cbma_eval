/* 
    h
    |  /d
    | /
    |/_______w
*/
function Room(_name, _w, _d, _h) {
    this.name = _name;
    this.w = _w;
    this.d = _d;
    this.h = _h;
    this.volume = this.w * this.d * this.h;
    this.walls = createWalls(this.w, this.d, this.h);
    this.dom = createDomForRoom(this.w, this.d, this.h, this.walls);
    this.getRoomScore = function(){return computeScore(this.walls)}
    this.getRoomScore.bind(this)
}

function createWalls(_w, _d, _h){
    var wallBottom = new Wall('地板', 'bottom', _w, _d);
    var wallTop = new Wall('天花', 'top', _w, _d);
    var wallLeft = new Wall('左牆', 'left', _h, _d);
    var wallRight = new Wall('右牆', 'right', _h, _d);
    var wallFront = new Wall('前牆', 'front', _w, _h);
    var wallBack = new Wall('後牆', 'back', _w, _h);

    return {front:wallFront, left:wallLeft, bottom:wallBottom, right:wallRight, top:wallTop, back:wallBack} //sequence important for render
}

function createDomForRoom(_w, _d, _h, _walls) {
    var dom = document.createElement('div');
    dom.classList.add('myRoom');

    Object.keys(_walls).map(function(key, index){
        dom.appendChild(_walls[key].dom)
    })
    return dom 
}

function computeScore(_walls) {
    var result = 0;
    Object.keys(_walls).map(function(pos, index){
        result += _walls[pos].score
    })
    return result
}