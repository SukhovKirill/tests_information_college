import {
  addTask,
  renderTasks,
  toggleTaskCompletion,
  editTask,
  deleteTask,
  getTasks,
  saveTasks,
} from "./script.js";

describe("Task Manager", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  //1
  test("Добавить задачу", () => {
    document.body.innerHTML = `
            <input id="taskInput" value="Test task">
            <button id="addTaskBtn">Add Task</button>
            <ul id="taskList"></ul>
        `;
    addTask();
    expect(getTasks()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: "Test task", completed: false }),
      ])
    );
  });

  //2
  test("Не добавдять задачу если пустая форма", () => {
    document.body.innerHTML = `
            <input id="taskInput" value="">
            <button id="addTaskBtn">Add Task</button>
            <ul id="taskList"></ul>
        `;
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    addTask();
    expect(alertMock).toHaveBeenCalledWith("Пожалуйста, введите задачу.");
    expect(getTasks()).toEqual([]);
    alertMock.mockRestore();
  });

  //3
  test("Переключение завершенной задачи", () => {
    document.body.innerHTML = `
            <input id="taskInput" value="Task to toggle">
            <button id="addTaskBtn">Add Task</button>
            <ul id="taskList"></ul>
        `;
    addTask();
    const tasks = getTasks();
    toggleTaskCompletion(tasks[0].id);
    expect(getTasks()[0].completed).toBe(true);
    toggleTaskCompletion(tasks[0].id);
    expect(getTasks()[0].completed).toBe(false);
  });

  //4
  test("Редактирование задачи", () => {
    document.body.innerHTML = `
            <input id="taskInput" value="Task to edit">
            <button id="addTaskBtn">Add Task</button>
            <ul id="taskList"></ul>
        `;
    addTask();
    const tasks = getTasks();
    const promptMock = jest
      .spyOn(window, "prompt")
      .mockReturnValue("Updated task");
    editTask(tasks[0].id);
    expect(getTasks()[0].text).toBe("Updated task");
    promptMock.mockRestore();
  });

  //5
  test("Удаление задачи", () => {
    document.body.innerHTML = `
            <input id="taskInput" value="Task to delete">
            <button id="addTaskBtn">Add Task</button>
            <ul id="taskList"></ul>
        `;
    addTask();
    const tasks = getTasks();
    deleteTask(tasks[0].id);
    expect(getTasks()).toEqual([]);
  });
});
