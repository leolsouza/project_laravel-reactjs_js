import { AppBar,Toolbar} from '@material-ui/core';
import { useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){

    const[token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    if(token === '' || token === null){
        navigate('/');
    }

    function handleLogout(){
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="header">
            <AppBar className="menu" position="static">
                <Toolbar >
                    <Link to='/' className="menuTitle">
                        <h1>ToDo List</h1>
                    </Link>
                    <button className="menuButton" onClick={handleLogout} type="button">
                        <FiPower size={18} color="#fff"/>
                    </button>
                </Toolbar>
            </AppBar>
        </div>
    );
}