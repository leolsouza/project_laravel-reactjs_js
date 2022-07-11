import { TextField } from "@material-ui/core";
import { useState } from "react";


export default function InsertList({onInsertList}){
    const [listName, setListName] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();

        await onInsertList({
            "title": listName, 
            "user_id": 1
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
          onChange={e => setListName(e.target.value)}
          required
        />
            <button type="submit">Salvar</button>
        </form>
       </div>
    );
}