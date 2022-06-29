import { Routes, Route } from "react-router-dom";
import Logon from "./pages/Logon";
import Register from "./pages/Register";

export default function RoutesPrimary(){
    return (
        <Routes>
            <Route path='/' element={ <Logon/>}/>
            <Route path='/register' element={<Register />}/>
        </Routes>
    );
}