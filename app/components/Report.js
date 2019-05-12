function Report(_room) {
    this.room = _room;
    this.totalVolume = this.room.volume;
    this.totalScore = this.room.getRoomScore();
    this.renderDom = function(_vol, _score) {
        var dom = document.createElement('table')
        dom.classList.add('table')
        dom.classList.add('table-striped')
        var volume = document.createElement('tr')
        volume.innerHTML = '<td>总体积：'+_vol+'立方米</td>';
        var score = document.createElement('tr')
        score.innerHTML = '<td>总得分：'+_score+'</td>'

        dom.appendChild(volume)
        dom.appendChild(score)
        dom.volume = volume;
        dom.score = score;

        document.querySelector('#report').appendChild(dom);
        return dom
    }

    this.dom = this.renderDom(this.totalVolume, this.totalScore);

    this.updateReport = function(){
        this.totalScore = this.room.getRoomScore()
        this.dom.score.innerHTML = '<td>总得分：'+this.totalScore+'</td>'
    }

    this.updateReport.bind(this)
}