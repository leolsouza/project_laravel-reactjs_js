import { Routes, Route } from "react-router-dom";
import Lists from "./pages/Lists";
import Logon from "./pages/Logon";
import Register from "./pages/Register";

export default function RoutesPrimary(){
    return (
        <Routes>
            <Route path='/' element={ <Logon/>}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/lists' element={<Lists/>}/>
        </Routes>
    );
}