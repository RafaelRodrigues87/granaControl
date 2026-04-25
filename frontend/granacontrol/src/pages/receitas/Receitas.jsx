import { useEffect, useState } from "react";
import styles from "./Receita.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { buscarUsuario } from "../../service/UsuarioService"; // Importe o serviço

function Receita() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    document.title = "Receitas - GranaControl";

    const carregarDados = async () => {
      try {
        const data = await buscarUsuario();
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar usuario={usuario} />
      
      <main className={styles.content}>
        {/* Aqui entrará o card de receitas que estilizamos antes */}
        <div className={styles.pageHeader}>
          <h1 className={styles.titulo}>Gerenciar Receitas</h1>
          <p className={styles.subtitulo}>Acompanhe suas entradas financeiras</p>
        </div>

        {/* Exemplo de onde colocar o Card de Receitas */}
        <div className={styles.cardReceitas}>
           {/* Conteúdo das receitas aqui... */}
        </div>
      </main>
    </div>
  );
}

export default Receita;