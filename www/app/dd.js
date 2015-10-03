class DragDropClass {
    constructor() {
        this.initEvents();
    }

    initEvents() {
        var dragged;

        document.addEventListener('drag', function(event) {
        }, false);

        //drag start
        document.addEventListener('dragstart', function(event) {
            dragged = event.target;
            window.app.classWorker.addClass(event.target, 'dragged');
            window.app.classWorker.addClass(document.body, 'dragg-active');
        }, false);

        //drag end
        document.addEventListener('dragend', function(event) {
            window.app.classWorker.removeClass(event.target, 'dragged');
            window.app.classWorker.removeClass(document.body, 'dragg-active');
        }, false);

        //drag over
        document.addEventListener('dragover', function(event) {
            event.preventDefault();
        }, false);

        //drag enter
        document.addEventListener('dragenter', function(event) {
            if (window.app.classWorker.hasClass(event.target, 'dropzone')) {
                window.app.classWorker.addClass(event.target, 'drag-enter');
            }
        }, false);

        //drag leave
        document.addEventListener('dragleave', function(event) {
            if (window.app.classWorker.hasClass(event.target, 'dropzone')) {
                window.app.classWorker.removeClass(event.target, 'drag-enter');
            }
        }, false);

        //final drop
        document.addEventListener('drop', function(event) {
            event.preventDefault();
            // move dragged el to the selected drop target
            if (window.app.classWorker.hasClass(event.target, 'dropzone')) {
                window.app.classWorker.addClass(event.target, 'changed');
                dragged.parentNode.removeChild(dragged);
                event.target.appendChild(dragged);
            }
        }, false);
    }
};

module.exports = DragDropClass;