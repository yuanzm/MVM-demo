
function Todo(title, index, done) {
    this.attributes = {};
    this.init(title, index, done);
}

Todo.prototype = {
    constructor: Todo,

    _set: function(key, value) {
        this.attributes[key] = value;
    },

    _get: function(key) {
        return this.attributes[key];
    },

    init: function(title, index, done) {
        var done  = (  done
                      ? done
                      : false  );
        
        this._set('title', title);
        this._set('done',  done);
        this._set('index', index);
    },

    toggle: function() {
        this.done = !this._get('done');
    }
}

Todo = eventify(Todo);

function Model() {
    this.todos = [];
    this.index = 0;

    // for debug
    this.todos.push(new Todo('研讨会!!', this.index));
    this.index = 1;
}

Model.prototype = {
    constructor: Model,

    add: function(title) {
        var todo = new Todo(title, this.index);

        this.todos.push(todo);
        this.index++;

        this.emit('todo_add_success');
    },

    remove: function(index) {
        var temp = null;

        if (index < 0 || index > this.todos.length - 1) {
            return;
        }

        for (var i = i, il = this.todos.length;i < il;i++) {
            temp = this.todos[i];

            if (temp.attributes.index === index){
                this.todos.splice(i, 0);
                break;  
            }
        }

        this.emit('todo_remove_success');
    },

    getTodos: function() {
        return this.todos;
    },

    getNewTodo: function() {
        if (!this.todos.length) {
            return 0;
        }

        return this.todos[this.todos.length - 1];
    }
}

Model = eventify(Model);
