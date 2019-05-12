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
    this.scale = computeScaleToPixel(this.w, this.d, this.h);
    this.volume = this.w * this.d * this.h;
    this.walls = createWalls(this.w, this.d, this.h, this.scale);
    this.dom = createDomForRoom(this.w, this.d, this.h, this.walls);
    this.getRoomScore = function(){return computeScore(this.walls)}
    this.getRoomScore.bind(this)
}

function createWalls(_w, _d, _h, _scale){
    var wallBottom = new Wall('地板', 'bottom', _w, _d, _scale);
    var wallTop = new Wall('天花', 'top', _w, _d, _scale);
    var wallLeft = new Wall('左牆', 'left', _h, _d, _scale);
    var wallRight = new Wall('右牆', 'right', _h, _d, _scale);
    var wallFront = new Wall('前牆', 'front', _w, _h, _scale);
    var wallBack = new Wall('後牆', 'back', _w, _h, _scale);

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

function computeScaleToPixel(_w, _d, _h){
    //pixel = meter * scale
    var scale = 1;
    var container= document.querySelector('#roomContainer');
    var containerWidth = container.offsetWidth -10 || container.clientWidth -10; //-10 to prevent wrapping of blocks

    var widthInMeter = 2 * (_w + _h)
    scale = containerWidth / widthInMeter
    return scale
}