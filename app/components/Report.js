function Report(_room) {
    this.room = _room;
    this.totalVolume = this.room.volume;
    this.totalScore = this.room.getRoomScore();
    this.renderDom = function(_vol, _score) {
        var dom = document.createElement('div')
        var volume = document.createElement('p')
        volume.innerHTML = '总体积：'+_vol+'立方米';
        var score = document.createElement('p')
        score.innerHTML = '总得分：'+_score

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
        this.dom.score.innerHTML = '总得分：'+this.totalScore
    }

    this.updateReport.bind(this)
}