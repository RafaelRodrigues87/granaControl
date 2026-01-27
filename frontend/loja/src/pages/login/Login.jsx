import styles from "./Login.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUsuario } from "../../service/UsuarioService";

function Login() {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [senha, setSenha] =useState("");

  const handleLogin = async (e) =>{
    e.preventDefault();

    try{
      const usuario = await LoginUsuario(email, senha);
      Local.Storage.setItem("usuario", JSON.stringify(usuario));

      alert("login realizado");
      navigate("/cadastro");
    }catch(err){
      alert("email ou senha incorretos");
    }
  }

  const clicar = () => {
    navigate('/cadastro')
  }

  return (
    
    <div className={styles.container}>
      <div className={styles.bemvindo}>
          <h1 className={styles.titulobemvindo}>Seja Bem Vindo</h1>
          <h2>Ainda não tem conta? Cadastra-se agora</h2>
          <button type="submit" className={styles.registra} onClick={clicar}>Registrar-se</button>

      </div>


      <div className={styles.login}>
       <h1 className={styles.tituloLogin}>Entrar</h1> 
       <form onSubmit={handleLogin}>
         <input className={styles.inputEmail} type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input className={styles.inputSenha} type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}></input><br></br>
       
     
      <h3>Esqueceu sua senha?</h3><h3>Clique aqui!</h3>
      <button type="submit" className={styles.logar} > Entrar</button>
      </form>
      </div>

    </div>
  );
}

export default Login;