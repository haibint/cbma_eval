function Editor(_currentWall) {
    this.currentWall = _currentWall;
    this.dom = renderEditor(this.currentWall);

    this.updateEditorDom = function (wall){
        this.dom.label.innerHTML = wall.name || ""
        this.dom.size.innerHTML = '尺寸：' + wall.w + ' x ' + wall.h
        this.dom.area.innerHTML = '面积：' + wall.area + '平方米'
        this.dom.material = (new MaterialSelect(wall)).dom
        this.dom.score.innerHTML = '得分：' + wall.score
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
    // var material = document.createElement('p')
    // material.innerHTML = '材料：' + wall.material
    var material = (new MaterialSelect(wall)).dom
    var score = document.createElement('p')
    score.innerHTML = '得分：' + wall.score
    dom.appendChild(label)
    dom.appendChild(size)
    dom.appendChild(area)
    dom.appendChild(material)
    dom.appendChild(score)

    dom.label = label
    dom.size = size
    dom.area = area
    dom.material = material
    dom.score = score

    document.querySelector('#editor').appendChild(dom)

    return dom
}

function MaterialSelect(wall) {
    this.options = wall.materialOptions;
    this.optionDoms = null;
    this.currentSelected = 0;

    this.renderDom = function() {
        var dom = document.createElement('select');
        var _optionDoms = this.options.map(function(datum, index){
            var option = new Option(datum.name, datum.weight)
            dom.options.add(option)
            return option
        })

        this.optionDoms = _optionDoms
        return dom
    }
    this.renderDom.bind(this);
    this.dom = this.renderDom();
}