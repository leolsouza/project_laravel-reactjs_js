import { withStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid,
} from "@material-ui/core";

import { useEffect, useState } from "react";
import { changeCompletedTask, deletedTask, taskGroups } from "../../services";

import { green } from "@material-ui/core/colors";
import { FiTrash } from "react-icons/fi";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Task({ list, listId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, [list]);

  useEffect(() => {
    if (list === listId) {
      getTasks();
    }
  }, [listId]);

  const getTasks = async (list_id = "") => {
    const getList = list_id === "" ? list : list_id;
    const response = await taskGroups(getList);
    if (response.data) {
      return setTasks(response.data);
    }
    setTasks([]);
  };
  const handleChange = async (event) => {
    event.preventDefault();
    const taskId = parseInt(event.target.value);
    const response = await changeCompletedTask(taskId);
    getTasks(response.data.list_id);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await deletedTask(taskId);
      getTasks(response.data.list_id);
    } catch (err) {
      alert("Erro ao apagar a task");
    }
  };

  return (
    <>
      {tasks.length > 0
        ? tasks.map((task) => (
            <Grid container key={task.id}>
              <Grid item xs={10}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value={task.id}
                      control={
                        <GreenCheckbox
                          checked={task.completed === true}
                          onChange={handleChange}
                        />
                      }
                      label={task.title}
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FiTrash
                  className="floatRight deleteIcon"
                  onClick={() => handleDelete(task.id)}
                  size={18}
                />
              </Grid>
            </Grid>
          ))
        : null}
    </>
  );
}
