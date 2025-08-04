export const homeSelector = {
    main: 'main',
    todoAllToggle: 'toggle-all',
    createdToDoLists: 'todo-item',

    //Inside each todo item
    todoToggle: 'todo-item-toggle',
    todoLabel: 'todo-item-label',
    deleteTodo: 'todo-item-button',
    completedTodo: '[data-testid="todo-item-toggle"]:checked',
    activeTodos: ' [data-testid="todo-item"]:not(.completed)',
    todoCount: '.todo-count',
    
    //When editing
    editInput: 'text-input',

    //Containers
    todoListContainer: 'todo-list',
    header: 'header',
    title: 'header h1',
    newToDo: 'text-input',
    footer: 'footer',
    filters: 'footer-navigation',
    noOfItem: '//*[@class="todo-count"]',
    clearCompletedBtn: '.clear-completed',

    //Filters
    filterAll: '[data-testid="footer-navigation"] a[href="#/"]',
    filterActive: '[data-testid="footer-navigation"] a[href="#/active"]',
    filterCompleted: '[data-testid="footer-navigation"] a[href="#/completed"]',
};

