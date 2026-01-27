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

   const clicar = () =>{
    navigate('/')
   }

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
        <div className={styles.container}>
            <div className={styles.registrar}>
                <h1 className={styles.titulo}>Faça Seu Cadastro</h1>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                <input type="date" value={dataNascimento}  onChange={e => setDataNascimento(e.target.value)}/>
                <input type="number" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
                <input type="text" placeholder="cpf" value={cpf} onChange={e => setCpf(e.target.value)}/>
                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>

                <button type="submit" className={styles.registra}>Cadastrar</button>
                </form>
                
            </div>

            <div className={styles.login}>
                <h1 className={styles.tituloLogin}>Já possui conta?</h1>
                <h2>Utilize ela clicando abaixo!</h2>
                <button className={styles.BotaoLogin} onClick={clicar}>Login</button>
            </div>
        </div>
    );
}

export default Cadastro;