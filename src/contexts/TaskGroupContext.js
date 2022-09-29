import { createContext, useCallback, useContext, useState } from "react";
import {
  changeCompletedTask,
  deletedTask,
  insertList,
  insertTask,
  showTaskGroup,
} from "../services/services";
import { changeTaskInTaskGroup } from "../utils/task";

export const TaskGroupContext = createContext();

export const TaskGroupProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  const fetchTaskGroup = useCallback(async () => {
    try {
      const response = await showTaskGroup();
      setTaskList(response.data);
    } catch (err) {
      alert(err);
    }
  }, []);

  const handleInsertList = useCallback(
    async (data) => {
      try {
        const response = await insertList(data);
        setTaskList([...taskList, { tasks: [], ...response.data }]);
      } catch (err) {
        alert("Erro ao inserir uma lista de tarefas");
      }
    },
    [taskList]
  );

  const handleInsertTask = useCallback(
    async (data) => {
      try {
        const response = await insertTask(data);

        setTaskList(
          taskList.map((list) => {
            if (response.data.task_group_id === list.id) {
              return { ...list, tasks: [...list.tasks, response.data] };
            }
            return list;
          })
        );
      } catch (err) {
        alert("Erro ao criar a tarefa");
      }
    },
    [taskList]
  );

  const handleChangeTask = useCallback(
    async (taskId) => {
      const response = await changeCompletedTask(taskId);
      setTaskList(changeTaskInTaskGroup(response.data, taskList));
    },
    [taskList]
  );

  const handleDeleteTask = useCallback(
    async (taskId) => {
      try {
        const response = await deletedTask(taskId);
        setTaskList(
          taskList.map((list) => {
            if (response.data.task_group_id === list.id) {
              return {
                ...list,
                tasks: list.tasks.filter(
                  (task) => response.data.id !== task.id
                ),
              };
            }
            return list;
          })
        );
      } catch (err) {
        alert("Erro ao apagar a task");
      }
    },
    [taskList]
  );

  return (
    <TaskGroupContext.Provider
      value={{
        taskList,
        setTaskList,
        handleInsertList,
        handleInsertTask,
        fetchTaskGroup,
        handleDeleteTask,
        handleChangeTask,
      }}
    >
      {children}
    </TaskGroupContext.Provider>
  );
};

export const useTaskGroup = () => useContext(TaskGroupContext);

export default TaskGroupProvider;
