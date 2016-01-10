
function Controller(model) {
    this.model = model;
}

Controller.prototype = {
    constructor: Controller,

    onCreateOne: function(elem) {
        var e = window.event;
        if ( e.which === 13 && elem.value !== '' ) {
            this.model.add(elem.value);
            elem.value = '';
        }
    },

    onRemove: function(elem) {
        console.log(this);
    }
}
