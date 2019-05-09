function Editor(_currentWall) {
    this.currentWall = _currentWall;
    this.dom = renderEditor(this.currentWall);

    this.updateEditorDom = function (wall){
        this.dom.label.innerHTML = wall.name || ""
        this.dom.size.innerHTML = '尺寸：' + wall.w + ' x ' + wall.h
        this.dom.area.innerHTML = '面积：' + wall.area + '平方米'

        this.dom.material.changeWall(wall) //changeWall is method of object instance rather than on dom
        this.dom.material.dom.selectedIndex = wall.materialIndex
        wall.updateScore(this.dom.score) //will update dom
    }
    this.updateEditorDom.bind(this);
}

function renderEditor(wall) {
    var dom = document.createElement('div')
    var label = document.createElement('p')
    label.innerHTML = wall.name || ""
    var size = document.createElement('p')
    size.innerHTML = '尺寸：' + wall.w + ' x ' + wall.h
    var area = document.createElement('p')
    area.innerHTML = '面积：' + wall.area + '平方米'
    var score = document.createElement('p')
    score.innerHTML = '得分：' + wall.score
    var material = new MaterialSelect(wall, score)
    dom.appendChild(label)
    dom.appendChild(size)
    dom.appendChild(area)
    dom.appendChild(material.dom)
    dom.appendChild(score)

    dom.label = label
    dom.size = size
    dom.area = area
    dom.material = material //special case, object instance is returned, rather than the dom
    dom.score = score

    document.querySelector('#editor').appendChild(dom)

    return dom
}

function MaterialSelect(wall, _scoreDom) {
    this.options = wall.materialOptions;
    this.optionDoms = null;
    this.wallEditing = wall;
    this.scoreDom = _scoreDom;

    this.renderDom = function() {
        var dom = document.createElement('select');
        var _optionDoms = this.options.map(function(datum, index){
            var option = new Option(datum.name, datum.weight)
            dom.options.add(option)
            return option
        })

        this.optionDoms = _optionDoms
        dom.selectedIndex = -1
        return dom
    }
    this.renderDom.bind(this);
    this.dom = this.renderDom();

    this.changeWall = function(wall){
        this.wallEditing = wall
    }
    this.changeWall.bind(this);

    this.selectOnChange = function(event) {
        this.wallEditing.material = this.dom.value
        this.wallEditing.materialIndex = this.dom.selectedIndex
        this.wallEditing.updateScore(this.scoreDom) 
    }
    this.dom.addEventListener('change', this.selectOnChange.bind(this))
}