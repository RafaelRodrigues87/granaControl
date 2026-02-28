import styles from "./Home.module.css";
import { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";// Importando o componente

function Home() {
  useEffect(() => {
    document.title = "GranaControl";
  }, []);

  return (
    <div className={styles.container}>
      {/* Chamada da Sidebar */}
      <Sidebar />

      {/* Conteúdo Principal da Página */}
      
        
        <section className={styles.content}>
           <h1>Olá, João!</h1>
           <p>Bem-vindo ao seu controle financeiro.</p>
           {/* Aqui entrariam seus cards e gráficos */}
        </section>
     
    </div>
  );
}

export default Home;