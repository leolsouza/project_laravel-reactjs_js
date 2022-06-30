import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import api from "../../services/api";

export default function Logon(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
    
        const fetchLogin = async () => {
            try {
                const response = await api.get('/api/login', { email, password });
                localStorage.setItem('token', response.data.token);
        
                navigate('/lists', {replace: true});
            } catch (err) {
                alert('Falha no login, tente novamente.');
            }
        };
        fetchLogin();
    }

    return (
        <div className="logon-container">
            <div className="content">
            <section className="form">
                <form onSubmit={handleLogin}>
                    
                    <input  
                    placeholder="Seu e-mail"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                    placeholder="Sua senha" 
                    value={password}
                    type="password"
                    onChange={e=> setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#3498db"/>
                    Não tenho cadastro
                    </Link>
                </form>
            </section>
            </div>
        </div>
    );



}