
function ListView(controller, model, el) {
    this.controller = controller;
    this.model      = model;
    this.el         = el;
    this.template   = document.getElementById('todo__list-item-tpl').innerHTML;
}

ListView.prototype = {
    constructor: ListView,

    build: function() {
        this.listen();
        this._render();
    },

    listen: function() {
        this._listenModel();
        this._listenEvent.call(this);
    },

    _listenModel: function() {
        this.model.on('todo_add_success', this.appendOne.bind(this));
    },

    _listenEvent: function() {
        var that = this;
        var allTodos = document.getElementsByClassName('destroy');

        for (var i = 0, il = allTodos.length;i < allTodos;i++) {
            (function(index) {
                allTodos[index].addEventListener('click', function() {
                    that.controller.onRemove.call(that.controller, allTodos[index]);
                }, false);                
            })(i)
        }
    },

    appendOne: function() {
        var newTodo = this.model.getNewTodo();

        var htmlStr = _.template(this.template)(newTodo.attributes);

        insertHTML(this.el, 'beforeend', htmlStr);
    },

    _render: function() {
        var todos = this.model.getTodos();

        var htmlStr = '',
            htmlArr = [];

        for (var i = 0, il = todos.length;i < il;i++) {
            htmlStr = _.template(this.template)(todos[i].attributes);
            htmlArr.push(htmlStr);
        }

        this.el.innerHTML = htmlArr.join('');
    }
}

ListView = eventify(ListView);
