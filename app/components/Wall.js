function Wall(_name="", _pos="", _width=10, _height=10, _scale) {
    this.name = _name;
    this.position = _pos;
    this.w = _width;
    this.h = _height;
    this.scale = _scale;
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
    this.materialIndex = -1;
    this.score = 0

    this.dom = createDomForWall(this.name, this.position, this.w, this.h, this.scale);

    this.updateScore = function(scoreDom){
        if (this.materialIndex < 0 || this.materialIndex > this.materialOptions.length-1) {
            scoreDom.innerHTML = '得分：0'
            return 0
        }
        this.score = this.materialOptions[this.materialIndex].weight * this.area
        this.score = this.score > 0 ? this.score : 0
        scoreDom.innerHTML = '得分：' + this.score
        return this.score
    }
    this.updateScore.bind(this)
    
    this.clickHandler = function(event){
        if(window.myApp){
            window.myApp.changeCurrentWall(this);
        }
    }
    this.dom.addEventListener('click', this.clickHandler.bind(this));
}

function createDomForWall(_name, _pos, _width, _height, _scale){
    var dom = document.createElement('div');
    dom.classList.add('myWall');
    var realSize = computeRealSizeScaleToPixel(_width, _height, _scale)
    console.log(realSize)
    dom.style.width = realSize.w;
    dom.style.height = realSize.h;

    switch(_pos){
        case 'front': case 'back': 
            dom.style.display = 'block';
            dom.style.marginLeft = realSize.h+'px'
            break;
        default:
            dom.style.display = 'inline-block';
            break;
    }

    var divContent = document.createTextNode(_name);
    dom.appendChild(divContent)

    return dom
}

function computeRealSizeScaleToPixel(_w, _h, _scale){
    var w_px = Math.round(_w * _scale)
    var h_px = Math.round(_h * _scale)

    var realSize = {
        w: w_px,
        h: h_px
    }

    return realSize
}