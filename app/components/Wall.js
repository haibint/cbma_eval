function Wall(_name="", _pos="", _width=10, _height=10) {
    this.name = _name;
    this.position = _pos;
    this.w = _width;
    this.h = _height;
    this.material = "";
    this.area = this.w * this.h;
    this.materialOptions = [{
        name: '材料1（1分/平方米）',
        weight: 1
    }, {
        name: '材料2（2分/平方米）',
        weight: 2
    }, {
        name: '材料3（3分/平方米）',
        weight: 3
    }]
    this.score = 0

    this.dom = createDomForWall(this.name, this.position, this.w, this.h);
    
    this.clickHandler = function(event){
        if(window.myApp){
            window.myApp.changeCurrentWall(this);
        }
    }
    this.dom.addEventListener('click', this.clickHandler.bind(this));
}

function createDomForWall(_name, _pos, _width, _height){
    var dom = document.createElement('div');
    dom.classList.add('myWall');
    dom.style.height = _height;
    dom.style.width = _width;

    switch(_pos){
        case 'front': case 'back': 
            dom.style.display = 'block';
            dom.style.marginLeft = _height+'px'
            break;
        default:
            dom.style.display = 'inline-block';
            break;
    }

    var divContent = document.createTextNode(_name);
    dom.appendChild(divContent)

    return dom
}