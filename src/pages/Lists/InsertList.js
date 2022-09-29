import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useTaskGroup } from "../../contexts/TaskGroupContext";

export default function InsertList() {
  const [listName, setListName] = useState("");
  const { handleInsertList } = useTaskGroup();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await handleInsertList({
      title: listName,
    });

    setListName("");
  };

  return (
    <div className="form">
      <strong>Cadastrar lista</strong>
      <form onSubmit={handleSubmit}>
        <TextField
          name="listName"
          id="listName"
          label="Titulo da Lista de Tarefas"
          className="TextFieldBlock"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
