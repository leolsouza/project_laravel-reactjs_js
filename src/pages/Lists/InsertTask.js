import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";

export default function InsertTask({ onInsertTask, taskList }) {
  const [lists, setLists] = useState([]);
  const [selectList, setSelectList] = useState("");
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (taskList.length > 0) {
      setLists(taskList);
    }
  }, [taskList]);

  const handleChangeSelect = (event) =>{
    setSelectList(event?.targe.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onInsertTask({
      "list_id": selectList,
      "title": taskName,
      "status": 0,
    });

    setTaskName("");
    setSelectList("");
  };

  return (
    <div>
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
              {lists.length > 0
                ? lists.map((list) => (
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
