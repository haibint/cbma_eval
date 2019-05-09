function ControlledInput(_name, _type='text', _placeholder='') {
    this.name = _name;
    this.myValue = '';
    this.type = _type;
    this.placeholder = _placeholder;
    this.pattern = /^(0|[1-9][0-9]*)$/

    this.typeHandler = function (event){
        if(this.pattern.test(this.dom.value)){ //if contains only numbers
            //update my Value
            this.myValue = this.dom.value
        } else {
            if (this.dom.value == '') {this.myValue = ''}
            this.dom.value = this.myValue
        }
    }

    this.dom = document.createElement('INPUT');
    this.dom.setAttribute('name', this.name);
    this.dom.setAttribute('type', this.type);
    this.dom.setAttribute('placeholder', this.placeholder);
    this.dom.classList.add("form-control")

    this.dom.addEventListener('keyup', this.typeHandler.bind(this));
}