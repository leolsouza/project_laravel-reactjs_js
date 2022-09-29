import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useTaskGroup } from "../../contexts/TaskGroupContext";

export default function InsertTask() {
  const [selectList, setSelectList] = useState("");
  const [taskName, setTaskName] = useState("");
  const { handleInsertTask, taskList } = useTaskGroup();

  const handleChangeSelect = (event) => {
    setSelectList(event?.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await handleInsertTask({
      title: taskName,
      completed: false,
      task_group_id: selectList,
    });

    setTaskName("");
    setSelectList("");
  };

  return (
    <div className="form">
      <strong>Cadastrar Tarefa</strong>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <TextField
            name="taskName"
            id="taskName"
            label="Titulo da Tarefa"
            className="TextFieldBlock"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="selectBox">
          <FormControl className="fullWidth">
            <InputLabel id="select-list-label">Selecionar Lista</InputLabel>
            <Select
              labelId="select-list-label"
              id="select-list"
              name="taskList"
              value={selectList}
              onChange={handleChangeSelect}
            >
              {taskList.length > 0
                ? taskList.map((list) => (
                    <MenuItem key={list.id} value={list.id}>
                      {list.title}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
