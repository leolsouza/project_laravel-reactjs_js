import Header from "./Header";
import InsertList from "./InsertList";
import InsertTask from "./InsertTask";
import Task from "./Task";

import "./styles.css";
import { Container, Grid } from "@material-ui/core";

import { useTaskGroup } from "../../contexts/TaskGroupContext";
import { useEffect } from "react";

export default function Lists() {
  const { taskList, fetchTaskGroup } = useTaskGroup();

  useEffect(() => {
    fetchTaskGroup();
  }, [fetchTaskGroup]);

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={3}>
            <InsertList />
            <InsertTask />
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
                                <Task list={list} />
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
