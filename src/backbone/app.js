/*
 * @author: zimyuan
 * @last-edit-date: 2016-01-09
 */
 
var TodoModel = Backbone.Model.extend({
    defaults: {
        content : '',
        done    : false
    },

    toggle: function() {
        this.set('done', !this.get('done'));
    }
});

var TodoCollection = Backbone.Collection.extend({
    model: TodoModel,

    completed: function() {
        return this.where({done: true});
    },

    remaining: function() {
        return this.where({done: false});
    }
});

// 输入框视图
var TodoInputView = Backbone.View.extend({
    initialize: function(todos) {
        this.render();

        this.todos = todos;
        this.$input = this.$('#new-todo');
    },

    el: '#header', 

    template: _.template($('#todo__input-tpl').html()),

    render: function() {
        this.$el.html(this.template());
    },

    events: {
        'keypress #new-todo': 'createOnEnter'
    },

    createOnEnter: function(e) {
        if ( e.which === 13 && this.$input.val().trim() ) {
            var todo = {
                content : this.$input.val().trim(),
                done    : false
            };
            this.todos.add(todo);
            this.$input.val('');
        }
    }
});

var TodoView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#todo__list-item-tpl').html()),

    events: {
        'click .toggle'  : 'toggledone',
        'click .destroy' : 'clear'
    },

    initialize: function(todo) {
        this.todo = todo;

        this.listenTo(this.todo, 'change', this.render);
        this.listenTo(this.todo, 'destroy', this.remove);
    },

    render: function() {
        this.$el.html(this.template(this.todo.toJSON()));
        this.$el.toggleClass('done', this.todo.get('done'));
        this.$input = this.$('.edit');

        return this;
    },

    clear: function() {
        this.todo.destroy();
    },

    toggledone: function() {
        this.todo.toggle();
    }
});

var TodoListView = Backbone.View.extend({
    el: '#todolist',

    initialize: function(todos) {
        this.todos = todos;

        this.$list = this.$('#todo-list');
        this.listenTo(todos, 'add', this.addOne);
    },

    addOne: function(todo) {
        var view = new TodoView(todo);
        this.$list.append(view.render().el);
    }
});

var TodoAppView = Backbone.View.extend({
    el: '#todoapp',

    initialize: function() {
        this.todoCollection = new TodoCollection();

        this.todoInputView  = new TodoInputView(this.todoCollection);
        this.TodoListView   = new TodoListView(this.todoCollection);
    }
});

var todoAppView   = new TodoAppView();
