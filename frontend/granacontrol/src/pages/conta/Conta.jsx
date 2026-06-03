import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { ListarConta, CadastrarConta, deletarConta } from "../../service/ContaService";
import { ListarReceitaUsuario } from "../../service/ReceitaService";
import { PlusCircle, Wallet, Trash2, Calendar, ChevronDown, ChevronUp } from "lucide-react";

function Conta() {
  const [contas, setContas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [contaExpandida, setContaExpandida] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    document.title = "GranaControl - Contas";
    carregarContas();
    carregarReceitas();
  }, []);

  async function carregarContas() {
    try {
      const data = await ListarConta();
      setContas(data);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    }
  }

  async function carregarReceitas() {
    try {
      const data = await ListarReceitaUsuario();
      setReceitas(data);
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
    }
  }

  const obterUltimasReceitas = (contaId) => {
    return receitas
      .filter(r => Number(r.conta?.id) === Number(contaId))
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 3);
  };

  const toggleExpandir = (id) => {
    setContaExpandida(contaExpandida === id ? null : id);
  };

  async function handleCadastrar(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await CadastrarConta({ nome, saldo: parseFloat(saldo) });
      setNome("");
      setSaldo("");
      setModalAberto(false);
      carregarContas();
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletar(e, contaId) {
    e.stopPropagation();
    if (!window.confirm("Tem certeza que deseja excluir esta conta?")) return;
    try {
      await deletarConta(contaId);
      carregarContas();
    } catch (err) {
      console.error("Erro ao deletar conta:", err);
    }
  }

  return (
    <div style={{ backgroundColor: "#f1f4f8", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ padding: "60px 32px 32px" }}> {/* ✅ padding-top para o botão hamburguer */}

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold mb-0" style={{ color: "#1e293b", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Minhas Contas
          </h1>
          <button
            className="btn d-flex align-items-center gap-2 fw-bold text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", borderRadius: 12, padding: "10px 20px", border: "none" }}
            onClick={() => setModalAberto(true)}
          >
            <PlusCircle size={18} />
            Nova Conta
          </button>
        </div>

        {/* LISTA DE CONTAS */}
        <div className="row g-3">
          {contas.length === 0 ? (
            <div className="col-12 text-center py-5">
              <Wallet size={40} className="mx-auto mb-3 text-muted" />
              <p className="text-muted">Nenhuma conta cadastrada</p>
            </div>
          ) : (
            contas.map((conta) => {
              const ultimasRec = obterUltimasReceitas(conta.id);
              const isExpandido = contaExpandida === conta.id;

              return (
                <div key={conta.id} className="col-12 col-md-6 col-xl-4">
                  <div
                    className="card border-0 rounded-4 p-4 shadow-sm"
                    onClick={() => toggleExpandir(conta.id)}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backgroundColor: "#ffffff",
                      transform: isExpandido ? "scale(1.02)" : "scale(1)"
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                        style={{ width: 44, height: 44, background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
                      >
                        <Wallet size={20} color="white" />
                      </div>
                      <button
                        onClick={(e) => handleDeletar(e, conta.id)}
                        className="btn btn-sm d-flex align-items-center justify-content-center border-0"
                        style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#fff1f2", color: "#ef4444" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "1rem" }}>{conta.nome}</p>
                    <h3 className="fw-bold mb-2" style={{ color: "#10b981" }}>
                      R$ {parseFloat(conta.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h3>

                    <div className="d-flex justify-content-between align-items-center text-muted border-top pt-2">
                      <span style={{ fontSize: "0.75rem" }}>ID: #{conta.id}</span>
                      {isExpandido ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {/* ÚLTIMAS RECEITAS */}
                    {isExpandido && (
                      <div className="mt-3 pt-3 border-top">
                        <p className="fw-bold text-muted mb-2 small text-uppercase" style={{ letterSpacing: "0.5px" }}>Últimas Entradas</p>
                        {ultimasRec.length === 0 ? (
                          <p className="text-muted small mb-0 fst-italic">Sem receitas recentes.</p>
                        ) : (
                          ultimasRec.map(rec => (
                            <div key={rec.id} className="d-flex justify-content-between align-items-center p-2 rounded-3 mb-1" style={{ backgroundColor: "#f8fafc" }}>
                              <div>
                                <p className="mb-0 fw-bold small text-dark text-truncate" style={{ maxWidth: "120px" }}>{rec.descricao}</p>
                                <span className="text-muted" style={{ fontSize: "0.65rem" }}>
                                  <Calendar size={10} className="me-1" />
                                  {new Date(rec.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <span className="fw-bold small text-success">
                                + R$ {Number(rec.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalAberto && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050 }}
          onClick={(e) => e.target === e.currentTarget && setModalAberto(false)}
        >
          <div className="card border-0 rounded-4 p-4 shadow-lg" style={{ width: "100%", maxWidth: 420 }}>
            <h2 className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "1.4rem" }}>Nova Conta</h2>
            <p className="text-muted mb-4 small">Preencha os dados da sua conta</p>

            <form onSubmit={handleCadastrar}>
              <div className="mb-3">
                <label className="fw-bold text-muted mb-1 d-block small text-uppercase">Nome da conta</label>
                <input type="text" className="form-control rounded-3 border-0" placeholder="Ex: Nubank, Bradesco..."
                  value={nome} onChange={(e) => setNome(e.target.value)} required
                  style={{ padding: "12px", backgroundColor: "#f1f5f9" }} />
              </div>
              <div className="mb-3">
                <label className="fw-bold text-muted mb-1 d-block small text-uppercase">Saldo inicial</label>
                <input type="number" className="form-control rounded-3 border-0" placeholder="0,00"
                  value={saldo} onChange={(e) => setSaldo(e.target.value)} required step="0.01"
                  style={{ padding: "12px", backgroundColor: "#f1f5f9" }} />
              </div>

              {erro && <p className="text-danger fw-bold mb-3 small">{erro}</p>}

              <div className="d-flex gap-2 mt-4">
                <button type="button" className="btn w-50 fw-bold rounded-3"
                  onClick={() => setModalAberto(false)}
                  style={{ backgroundColor: "#e2e8f0", color: "#475569" }}>
                  Cancelar
                </button>
                <button type="submit" className="btn w-50 fw-bold text-white rounded-3 shadow-sm"
                  disabled={loading} style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
                  {loading ? "Salvando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Conta;