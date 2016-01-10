
function InputView(controller, model, el) {
    this.controller = controller;
    this.model      = model;
    this.el         = el;
    this.template   = document.getElementById('todo__input-tpl').innerHTML;
}

InputView.prototype = {
    constructor: InputView,

    build: function() {
        this._render();
        this.listen();
    },

    listen: function() {
        this._listenModel();
    },

    _listenModel: function() {
        this._listenEvent.call(this);
    },

    _listenEvent: function() {
        var that = this;
        var input = document.getElementById('new-todo');

        input.addEventListener('keyup', function() {
            that.controller.onCreateOne.call(that.controller, this);
        }, false);
    },

    _render: function() {
         this.el.innerHTML = _.template(this.template)();
    }
}

InputView = eventify(InputView);
