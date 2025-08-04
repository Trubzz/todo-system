
import { test, expect, Page } from '@playwright/test';
import { homeSelector } from '../../selectors/homeSelectors';
import { toDoData as data } from '../../seeds/testdata';
import { HomePage } from '../../pages/homepage';

const baseURL = 'https://todomvc.com/examples/react/dist/';
let page: Page;
let home: HomePage;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(baseURL);
    home = new HomePage(page);
});

test.afterAll(async () => {
    await page.close();
});

test.describe('Create and Manage Todos', () => {

    test('Verify homepage loaded', async () => {
        await page.waitForSelector(homeSelector.title);
        await expect(page.locator(homeSelector.title)).toHaveText('todos');
    });

    test('Create todo', async () => {
        for (const todo of Object.values(data.todos)) {
            await home.createTodo(todo);
        }
        //Assert created todos
        const labels = await home.todoList.getByTestId(homeSelector.todoLabel).allTextContents();
        expect(labels).toEqual(Object.values(data.todos));
    });

    test('Edit todo', async () => {
        await home.editTodoByLabel(data.todos.todo1, data.updateText);
        await expect(home.todoList.getByText(data.updateText)).toBeVisible();
    });

    test('Mark todo as completed', async () => {
        await home.completeTodoByLabel(data.todos.todo2);
        await home.completeTodoByLabel(data.todos.todo1);
    });

    test('Verify Filter All', async () => {
        await home.applyFilter(data.filters.all);
        const count = await home.todoList.count();
        expect(count).toBe(data.filters.expectedAllCount);
    });

    test('Verify Filter Active', async () => {
        await home.applyFilter(data.filters.active);
        const activeTodos = page.locator(homeSelector.activeTodos);
        await expect(activeTodos).toHaveCount(data.filters.expectedActiveCount);

        //Assert that only uncompleted todos are visible   
        const activeCount = await activeTodos.count();
        for (let i = 0; i < activeCount; i++) {
            await expect(activeTodos.nth(i)).toBeVisible();
        }
    });

    test('Verify Filter Completed', async () => {
        await home.applyFilter(data.filters.completed);
        const completedTodos = page.locator(homeSelector.completedTodo);
        await expect(completedTodos).toHaveCount(data.filters.expectedCompletedCount);

        //Assert each completed todo is visible and checked
        const count = await completedTodos.count();
        for (let i = 0; i < count; i++) {
            const todo = completedTodos.nth(i);
            await expect(todo).toBeVisible();
            await expect(todo).toBeChecked();
        }
    });

    test('Find the active todos count', async () => {
        await home.applyFilter(data.filters.all);
        const count = await home.getActiveTodoCount();
        expect(count).toBe(data.filters.expectedActiveCount);
    });

    test('Mark all todos as completed', async () => {
        await home.markAllTodosAsComplete();
        const count = await home.todoList.count();
        expect(count).toBe(data.expectedMarkedTodos);
    });

    test('Undo completedAll todos', async () => {
        await home.undoMarkAll();
    });

    test('Delete a todo', async () => {
        //Count before deletion
        const noOftodosBefore = (await home.todoList.getByText(data.todos.todo3).all()).length;
        await home.deleteTodoByLabel(data.todos.todo3);

        //Count after deletion
        const todosAfter = await home.todoList.getByText(data.todos.todo3).all();
        const countAfter = todosAfter.length;

        expect(countAfter).toBe(noOftodosBefore - 1);
    });

    test('Clear completed todos', async () => {
        await home.completeTodoByLabel(data.todos.todo5);
        await home.clearCompletedTodos();
        const completedCount = await home.todoList.locator(homeSelector.completedTodo).count();
        expect(completedCount).toBe(0);
    });
});




