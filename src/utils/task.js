export const changeTaskInTaskGroup = (task, taskList) =>
  taskList.map((list) => {
    if (task.task_group_id === list.id) {
      return {
        ...list,
        tasks: list.tasks.map((listTask) =>
          task.id === listTask.id ? task : listTask
        ),
      };
    }
    return list;
  });
