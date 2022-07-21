import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";
import { useState } from "react";

import { register } from "../../services";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    try {
      await register(data);
      alert("Sua conta foi cadastrada com sucesso");
      navigate("/", { replace: true });
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro</h1>
          <p>
            Faça já seu cadastro, entre na plataforma e organize suas finanças
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#3498db" />
            Já possuo cadastro
          </Link>
        </section>
        <section>
          <form onSubmit={handleRegister}>
            <input
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Digite sua senha"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              placeholder="Confirme sua senha"
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="button">Cadastrar</button>
          </form>
        </section>
      </div>
    </div>
  );
}
