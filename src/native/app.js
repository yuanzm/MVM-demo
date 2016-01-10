
var model = new Model();
var controller = new Controller(model);

function initApp() {
    initInput();
    initList();
}

function initInput() {
    var header = document.getElementById('header');

    var inputView = new InputView(controller, model, header);

    inputView.build();
}

function initList() {
    var list = document.getElementById('todo-list');

    var listView = new ListView(controller, model, list);

    listView.build();
}

initApp();
