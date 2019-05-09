function Editor(_currentWall, _report) {
    this.currentWall = _currentWall;
    this.report = _report;
    this.dom = renderEditor(this.currentWall, this.report);

    this.updateEditorDom = function (wall){
        this.dom.label.innerHTML = '<th>'+wall.name || ''+'</th>'
        this.dom.size.innerHTML = '<td>尺寸：' + wall.w + ' x ' + wall.h + '</td>'
        this.dom.area.innerHTML = '<td>面积：' + wall.area + '平方米</td>'

        this.dom.material.changeWall(wall) //changeWall is method of object instance rather than on dom
        this.dom.material.dom.selectedIndex = wall.materialIndex
        wall.updateScore(this.dom.score) //will update dom
    }
    this.updateEditorDom.bind(this);
}

function renderEditor(wall, report) {
    var dom = document.createElement('table')
        dom.classList.add('table')
        dom.classList.add('table-striped')
    var label = document.createElement('tr')
    label.innerHTML = '<th>'+wall.name || ''+'</th>'
    var size = document.createElement('tr')
    size.innerHTML = '<td>尺寸：' + wall.w + ' x ' + wall.h + '</td>'
    var area = document.createElement('tr')
    area.innerHTML = '<td>面积：' + wall.area + '平方米</td>'
    var score = document.createElement('tr')
    score.innerHTML = '<td>得分：' + wall.score + '</td>'
    var materialTr = document.createElement('tr')
    var materialTd = document.createElement('td')
    var materialLabel = document.createElement('span')
    materialLabel.innerHTML = '材料：'
    var material = new MaterialSelect(wall, score, report)
    materialTd.appendChild(materialLabel)
    materialTd.appendChild(material.dom)
    materialTr.appendChild(materialTd)
    dom.appendChild(label)
    dom.appendChild(size)
    dom.appendChild(area)
    dom.appendChild(materialTr)
    dom.appendChild(score)

    dom.label = label
    dom.size = size
    dom.area = area
    dom.material = material //special case, object instance is returned, rather than the dom
    dom.score = score

    document.querySelector('#editor').appendChild(dom)

    return dom
}

function MaterialSelect(wall, _scoreDom, _report) {
    this.options = wall.materialOptions;
    this.optionDoms = null;
    this.wallEditing = wall;
    this.scoreDom = _scoreDom;
    this.report = _report;

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
        this.report.updateReport()
    }
    this.dom.addEventListener('change', this.selectOnChange.bind(this))
}