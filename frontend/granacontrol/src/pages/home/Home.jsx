import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { buscarUsuario } from "../../service/UsuarioService";
import { ListarReceitaUsuario } from "../../service/ReceitaService";
import { ArrowUpCircle } from "lucide-react";

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

  const getInicial = (nome) => nome ? nome.charAt(0).toUpperCase() : "U";

  return (
    <div style={{ backgroundColor: "#f1f4f8", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "260px", padding: "40px 32px", minHeight: "100vh", backgroundColor: "#f1f4f8" }}>
        <div className="row g-4">

          {/* CARD USUÁRIO */}
          <div className="col-12 col-lg-3">
            {usuario ? (
              <div className="card border-0 rounded-4 h-100" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center text-white fw-bold rounded-3"
                      style={{ width: 52, height: 52, fontSize: "1.3rem", background: "linear-gradient(135deg, #6366f1, #4f46e5)", flexShrink: 0 }}
                    >
                      {getInicial(usuario.nome)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className="fw-bold mb-0" style={{ color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {usuario.nome}
                      </p>
                      <small className="text-muted" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                        {usuario.email}
                      </small>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted" style={{ fontSize: "0.85rem" }}>ID da conta:</span>
                    <span className="fw-bold px-3 py-1 rounded-2" style={{ backgroundColor: "#f1f5f9", color: "#1e293b", fontSize: "0.85rem" }}>
                      #{usuario.id}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border-0 rounded-4 p-4" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}>
                <p className="text-muted text-center">Carregando...</p>
              </div>
            )}
          </div>

          {/* CARD RECEITAS */}
          <div className="col-12 col-lg-9">
            <div className="card border-0 rounded-4" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}>
              <div className="card-body p-4">
                <h2 className="text-uppercase fw-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", color: "#1e293b", letterSpacing: "0.5px" }}>
                  Minhas Receitas
                </h2>

                {receitas.length === 0 ? (
                  <p className="text-center text-muted fst-italic py-4">Nenhuma receita encontrada</p>
                ) : (
                  receitas.map((receita) => (
                    <div
                      key={receita.id}
                      className="d-flex align-items-center p-3 rounded-3 mb-2"
                      style={{ borderBottom: "1px solid #f8fafc" }}
                    >
                      <div className="d-flex align-items-center justify-content-center rounded-3 me-3" style={{ background: "rgba(16,185,129,0.08)", padding: 10 }}>
                        <ArrowUpCircle size={20} color="#10b981" />
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="fw-semibold mb-0 text-truncate" style={{ color: "#1e293b", fontSize: "0.9rem" }}>
                          {receita.descricao}
                        </p>
                        <small className="text-muted">Recebido em {new Date().toLocaleDateString()}</small>
                      </div>
                      <span className="fw-bold ms-3" style={{ color: "#10b981", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                        + R$ {receita.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;