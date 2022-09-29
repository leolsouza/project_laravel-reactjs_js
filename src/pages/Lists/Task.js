import { withStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid,
} from "@material-ui/core";

import { green } from "@material-ui/core/colors";
import { FiTrash } from "react-icons/fi";
import { useTaskGroup } from "../../contexts/TaskGroupContext";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Task({ list }) {
  const { tasks } = list;
  const { handleChangeTask, handleDeleteTask } = useTaskGroup();

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
                          onChange={() => handleChangeTask(task.id)}
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
                  onClick={() => handleDeleteTask(task.id)}
                  size={18}
                />
              </Grid>
            </Grid>
          ))
        : null}
    </>
  );
}
