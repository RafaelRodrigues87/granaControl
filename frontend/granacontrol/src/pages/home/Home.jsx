import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { buscarUsuario } from "../../service/UsuarioService";

function Home() {
  const [usuario, setUsuario] = useState(null);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    document.title = "GranaControl";

    const carregarUsuario = async () => {
      try {
        const data = await buscarUsuario();
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    carregarUsuario();
  }, []);

  useEffect(() => {
  if (!usuario) return;

  const carregarReceita = async () => {
    try {
      const data = await ListarReceitaUsuario(usuario.id);
      setReceitas(data);
    } catch (error) {
      console.error("Erro ao buscar receita", error);
    }
  };

  carregarReceita();
}, [usuario]);

  // Função simples para pegar a inicial do nome
  const getInicial = (nome) => nome ? nome.charAt(0).toUpperCase() : "U";

  return (
    <div className={styles.container}>
      <Sidebar usuario={usuario} />

      <main className={styles.content}>
        {usuario && (
          <div className={styles.cardUsuario}>
            {/* Topo do Card com Avatar e Nome */}
            <div className={styles.header}>
              <div className={styles.avatar}>
                {getInicial(usuario.nome)}
              </div>
              <div className={styles.infoGroup}>
                <span className={styles.userName}>{usuario.nome}</span>
                <span className={styles.email}>{usuario.email}</span>
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Detalhes Adicionais */}
            <div className={styles.details}>
              <span className={styles.label}>ID da conta:</span>
              <span className={styles.value}>#{usuario.id}</span>
            </div>

          </div>
        )}

          <div className={styles.cardReceitas}>
            <h2 className={styles.h2Receitas}>Minhas Receitas</h2>
            <div className={styles.listaReceitas}>
              {receitas.length === 0 ? (
                <p className={styles.emptyMessage}>Nenhuma receita encontrada</p>
              ) : (
                receitas.map((receita) => (
                  <div key={receita.id} className={styles.itemReceita}>
                    <div className={styles.itemIcon}>
                      <ArrowUpCircle size={20} color="#10b981" /> {/* Ícone verde de entrada */}
                    </div>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemDescricao}>{receita.descricao}</p>
                      <p className={styles.itemData}>Recebido em {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className={styles.itemValor}>
                      + R$ {receita.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
      </main>
    </div>
  );
}

export default Home;