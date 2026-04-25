import styles from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CadastrarUsuario } from "../../service/UsuarioService";

function Cadastro() {
   const navigate = useNavigate();
   const [nome, setNome] = useState("");
   const [dataNascimento, setDataNascimento] = useState("");
   const [telefone, setTelefone] = useState("");
   const [cpf, setCpf] = useState("");
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = {
        nome,
        dataNascimento,
        telefone,
        cpf,
        email,
        senha,
    };
    try{
        await CadastrarUsuario(usuario);
        alert("cadastro realizado com sucesso");
        navigate("/");
    }catch(erro){
        console.error(erro);
        alert("erro ao cadastrar usuario");
    }
   }

   return (
      <div className={styles.pageWrapper}>
    
         
         <div className={styles.mainContainer}>
        
            {/* FORMULÁRIO À ESQUERDA */}
            <div className={styles.formSide}>
               <div className={styles.formHeader}>
                  <h2>Crie sua conta</h2>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                     <label>Nome</label>
                     <input type="text" placeholder="Nome completo" onChange={e => setNome(e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                     <label>Data de Nascimento</label>
                     <input type="date" onChange={e => setDataNascimento(e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                     <label>Telefone</label>
                     <input type="text" placeholder="(00) 00000-0000" onChange={e => setTelefone(e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                     <label>CPF</label>
                     <input type="text" placeholder="000.000.000-00" onChange={e => setCpf(e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                     <label>E-mail</label>
                     <input type="email" placeholder="email@exemplo.com" onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className={styles.inputGroup}>
                     <label>Senha</label>
                     <input type="password" placeholder="••••••••" onChange={e => setSenha(e.target.value)} />
                  </div>
                  <button type="submit" className={styles.btnSubmit}>Cadastrar</button>
               </form>
            </div>

            {/* CHAMADA LOGIN À DIREITA */}
            <div className={styles.brandSide}>

               <div className={styles.logoWrapper}>
                  <span className={styles.logoIcon}>$</span>
                  <h2 className={styles.brandName}>Grana<span>Control</span></h2>
                </div>
               <h1>Bem-vindo!</h1>
               <p>Já possui uma conta no GranaControl? Entre agora para gerenciar suas finanças.</p>
               <button className={styles.btnGhost} onClick={() => navigate('/')}>Fazer Login</button>
            </div>
         </div>
      </div>
   );
}

export default Cadastro;