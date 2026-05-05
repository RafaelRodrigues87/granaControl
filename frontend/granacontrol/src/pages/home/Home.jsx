import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { buscarUsuario } from "../../service/UsuarioService";
import { ListarReceitaUsuario } from "../../service/ReceitaService";
import { ArrowUpCircle, User } from "lucide-react";

function Home() {
  const [usuario, setUsuario] = useState(null);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    document.title = "GranaControl - Home";
    const carregarDados = async () => {
      try {
        const user = await buscarUsuario();
        setUsuario(user);
        
        const listaReceitas = await ListarReceitaUsuario();
        // Filtra as 3 mais recentes
        const ultimasTres = listaReceitas
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, 3);
        
        setReceitas(ultimasTres);
      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      }
    };
    carregarDados();
  }, []);

  const getInicial = (nome) => nome ? nome.charAt(0).toUpperCase() : "U";

  return (
    <div className="d-flex" style={{ backgroundColor: "#f1f4f8", minHeight: "100vh" }}>
      <Sidebar />
      
      <div style={{ marginLeft: "260px", flexGrow: 1, padding: "40px 32px" }}>
        
        <div className="mb-4">
          <h1 className="fw-bold mb-0" style={{ color: "#1e293b", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>Dashboard</h1>
          <p className="text-muted small">Resumo da sua atividade financeira</p>
        </div>

        <div className="row g-4">
          {/* CARD PERFIL - VOLTOU A SER MENOR (col-lg-3) */}
          <div className="col-12 col-md-4 col-lg-3">
            <div className="card border-0 rounded-4 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div 
                    className="d-flex align-items-center justify-content-center text-white fw-bold rounded-3 shadow-sm"
                    style={{ width: 50, height: 50, fontSize: "1.2rem", background: "linear-gradient(135deg, #6366f1, #4f46e5)", flexShrink: 0 }}
                  >
                    {usuario ? getInicial(usuario.nome) : <User size={24} />}
                  </div>
                  <div className="overflow-hidden">
                    <p className="fw-bold mb-0 text-truncate" style={{ color: "#1e293b" }}>
                      {usuario?.nome || "Usuário"}
                    </p>
                    <small className="text-muted text-truncate d-block">{usuario?.email}</small>
                  </div>
                </div>
                
                <hr className="my-3" style={{ opacity: 0.1 }} />
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">ID da conta:</span>
                  <span className="fw-bold px-2 py-1 rounded-2" style={{ backgroundColor: "#f1f5f9", color: "#475569", fontSize: "0.75rem" }}>
                    #{usuario?.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD RECEITAS - OCUPA O RESTANTE DA LARGURA */}
          <div className="col-12 col-md-8 col-lg-9">
            <div className="card border-0 rounded-4 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
              <div className="card-body p-4">
                <h5 className="text-uppercase fw-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", color: "#1e293b", letterSpacing: "0.5px" }}>
                  Minhas Receitas <span className="text-muted fw-normal ms-2" style={{ fontSize: "0.8rem" }}>(Top 3)</span>
                </h5>

                {receitas.length === 0 ? (
                  <p className="text-center text-muted fst-italic py-4">Nenhuma receita encontrada</p>
                ) : (
                  receitas.map((receita) => (
                    <div
                      key={receita.id}
                      className="d-flex align-items-center p-3 rounded-3 mb-2"
                      style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <div className="d-flex align-items-center justify-content-center rounded-3 me-3" style={{ background: "rgba(16,185,129,0.1)", width: 40, height: 40 }}>
                        <ArrowUpCircle size={18} color="#10b981" />
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="fw-bold mb-0 text-truncate" style={{ color: "#334155", fontSize: "0.9rem" }}>
                          {receita.descricao}
                        </p>
                        <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                          {new Date(receita.data).toLocaleDateString('pt-BR')}
                        </small>
                      </div>
                      <span className="fw-bold ms-3" style={{ color: "#10b981", fontSize: "0.95rem" }}>
                        + R$ {Number(receita.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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