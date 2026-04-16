import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

 const handleLogin = async (e) =>{
    e.preventDefault();

    try{
      const usuario = await LoginUsuario(email, senha);
      

       localStorage.setItem("token", usuario.token);
      localStorage.setItem("usuario", JSON.stringify(usuario.usuario));
      alert("login realizado");
      navigate("/");
    }catch(err){
      alert("email ou senha incorretos");
    }
  }
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContainer}>
        
        {/* LADO ESQUERDO: BRANDING & WELCOME */}
        <div className={styles.brandSide}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoIcon}>$</span>
            <h2 className={styles.brandName}>Grana<span>Control</span></h2>
          </div>
          
          <div className={styles.welcomeText}>
            <h1>Bem-vindo de volta!</h1>
            <p>Sua saúde financeira começa com um clique. Acesse sua conta agora.</p>
          </div>

          <button className={styles.btnGhost} onClick={() => navigate('/cadastro')}>
            Não tenho conta. Criar agora
          </button>
        </div>

        {/* LADO DIREITO: FORMULÁRIO */}
        <div className={styles.formSide}>
          <div className={styles.formHeader}>
            <h2>Login</h2>
            <p>Insira suas credenciais abaixo</p>
          </div>

          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input 
                type="email" 
                placeholder="exemplo@email.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={senha} 
                onChange={e => setSenha(e.target.value)} 
                required
              />
            </div>

            <div className={styles.formOptions}>
              <span className={styles.forgotPass}>Esqueceu a senha?</span>
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Entrar no Sistema
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;