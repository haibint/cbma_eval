function Editor(_currentWall) {
    this.currentWall = _currentWall;
    this.dom = renderEditor(this.currentWall);

    this.updateEditorDom = function (wall){
        this.dom.label.innerHTML = wall.name || ""
        this.dom.size.innerHTML = '尺寸：' + wall.w + ' x ' + wall.h
        this.dom.area.innerHTML = '面积：' + wall.area + '平方米'
        this.dom.material.innerHTML = '材料：' + wall.material
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
    var material = document.createElement('p')
    material.innerHTML = '材料：' + wall.material
    dom.appendChild(label)
    dom.appendChild(size)
    dom.appendChild(area)
    dom.appendChild(material)

    dom.label = label
    dom.size = size
    dom.area = area
    dom.material = material

    document.querySelector('#editor').appendChild(dom)

    return dom
}