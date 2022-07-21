import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import InsertList from "./InsertList";
import InsertTask from "./InsertTask";
import Task from "./Task";

import "./styles.css";
import { Container, Grid } from "@material-ui/core";
import { insertList, insertTask, showTaskGroup } from "../../services";

export default function Lists() {
  const [taskList, setTaskList] = useState([]);
  const [listId, setListId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getTaskGroup = async () => {
        const response = await showTaskGroup();
        setTaskList(response.data);
      };
      getTaskGroup();
    } catch (err) {
      alert(err);
    }
  }, [setTaskList]);

  async function onInsertList(data) {
    try {
      const response = await insertList(data);
      if (response.status && response.status === (401 || 498)) {
        localStorage.clear();
        navigate("/");
      }
      setTaskList([...taskList, response.data]);
    } catch (err) {
      alert("Erro ao inserir uma lista de tarefas");
    }
  }

  async function onInsertTask(data) {
    try {
      const response = await insertTask(data);
      if (response.data.status && response.status === (401 || 498)) {
        localStorage.clear();
        navigate("/");
      }
      setListId([...listId, response.data.list_id]);
    } catch (err) {
      alert("Erro ao criar a tarefa");
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={3}>
            <InsertList onInsertList={onInsertList} />
            <InsertTask onInsertTask={onInsertTask} taskList={taskList} />
          </Grid>

          <Grid item xs={8}>
            <Container maxWidth="xl">
              <Grid container>
                {taskList.length > 0
                  ? taskList.map((list) => (
                      <Grid item xs={4} key={list.id}>
                        <div className="ListContainer">
                          <div className="ListHeader">
                            {list.status === "À Fazer" ? (
                              <h3 className="ListTitle">{list.title}</h3>
                            ) : (
                              <h3 className="ListTitle">
                                {list.title} - Finalizado
                              </h3>
                            )}
                          </div>
                          <div className="Taks">
                            <div className="TaskItem">
                              <Container maxWidth="xl">
                                <Task list={list.id} listId={listId} />
                              </Container>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
