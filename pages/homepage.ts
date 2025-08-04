import { Page } from "playwright";
import { homeSelector } from "../selectors/homeSelectors";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //to get todo list items
  get todoList() {
    return this.page.getByTestId(homeSelector.createdToDoLists);
  }

  //to get filter bar
  get filter() {
    return this.page.locator(homeSelector.filters);
  }

  //Create todo
  async createTodo(text: string) {
    await this.page.getByTestId(homeSelector.newToDo).fill(text);
    await this.page.getByTestId(homeSelector.newToDo).press('Enter');
  }

  //Edit todo by label
  async editTodoByLabel(labelText: string, newText: string): Promise<void> {
    const items = this.todoList;
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const label = await items.nth(i).getByTestId(homeSelector.todoLabel).textContent();
      if (label?.trim() === labelText) {
        await items.nth(i).getByTestId(homeSelector.todoLabel).dblclick();
        const input = items.nth(i).getByTestId(homeSelector.editInput);
        await input.fill(newText);
        await input.press('Enter');
        return;
      }
    }
    throw new Error(`Todo with label "${labelText}" not found`);
  }

  //Delete todo
  async deleteTodoByLabel(labelText: string): Promise<void> {
    const items = this.todoList;
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const label = await item.getByTestId(homeSelector.todoLabel).textContent();

      if (label?.trim() === labelText) {
        await item.hover();
        await item.getByTestId(homeSelector.deleteTodo).click();
        return;
      }
    }

    throw new Error(`Todo with label "${labelText}" not found`);
  }

  //Mark as complete
  async completeTodoByLabel(label: string) {
    const todoItem = this.page.getByTestId(homeSelector.createdToDoLists).filter({ hasText: label });
    await todoItem.getByTestId(homeSelector.todoToggle).check();
  }

  //Filter
  async applyFilter(filterName: string): Promise<void> {
    const filterSelectors: { [key: string]: string } = {
      All: homeSelector.filterAll,
      Active: homeSelector.filterActive,
      Completed: homeSelector.filterCompleted,
    };

    const selector = filterSelectors[filterName];
    if (!selector) {
      throw new Error(`Invalid filter name "${filterName}"`);
    }

    await this.page.locator(selector).click();
  }

  //Clear completed todos
  async clearCompletedTodos() {
    if (await this.page.locator(homeSelector.clearCompletedBtn).isVisible()) {
      await this.page.locator(homeSelector.clearCompletedBtn).click();
    }
  }

  //Get count of active todos
  async getActiveTodoCount(): Promise<number> {
    const countText = await this.page.locator(homeSelector.todoCount).textContent();
    const match = countText?.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  //Mark all todos as complete
  async markAllTodosAsComplete() {
    const toggleAll = this.page.getByTestId(homeSelector.todoAllToggle);
    await toggleAll.check();
  }
  
  async undoMarkAll() {
    const toggleAll = this.page.getByTestId(homeSelector.todoAllToggle);
    await toggleAll.click();
  }
}

