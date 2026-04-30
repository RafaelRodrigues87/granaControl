import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { ListarConta, CadastrarConta } from "../../service/ContaService";
import { PlusCircle, Wallet, Trash2 } from "lucide-react";

function Conta() {
  const [contas, setContas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  
  useEffect(() => {
    document.title = "GranaControl";
    carregarContas();
  }, []);

  async function carregarContas() {
    try {
      const data = await ListarConta();
      setContas(data);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    }
  }

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

  return (
    <div style={{ backgroundColor: "#f1f4f8", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ marginLeft: "260px", padding: "40px 32px", minHeight: "100vh", backgroundColor: "#f1f4f8" }}>

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold mb-0" style={{ color: "#1e293b", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Minhas Contas
          </h1>
          <button
            className="btn d-flex align-items-center gap-2 fw-bold text-white"
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
            <div className="col-12">
              <div className="card border-0 rounded-4 p-5 text-center" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}>
                <Wallet size={40} className="mx-auto mb-3 text-muted" />
                <p className="text-muted fst-italic">Nenhuma conta cadastrada</p>
              </div>
            </div>
          ) : (
            contas.map((conta) => (
              <div key={conta.id} className="col-12 col-md-6 col-xl-4">
                <div className="card border-0 rounded-4 p-4" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{ width: 44, height: 44, background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
                    >
                      <Wallet size={20} color="white" />
                    </div>
                  </div>
                  <p className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "1rem" }}>{conta.nome}</p>
                  <p className="fw-bold mb-0" style={{ color: "#10b981", fontSize: "1.3rem" }}>
                    R$ {parseFloat(conta.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-muted mt-1 mb-0" style={{ fontSize: "0.75rem" }}>ID: #{conta.id}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL CADASTRO */}
      {modalAberto && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}
          onClick={(e) => e.target === e.currentTarget && setModalAberto(false)}
        >
          <div className="card border-0 rounded-4 p-4" style={{ width: "100%", maxWidth: 420, boxShadow: "0 25px 60px rgba(0,0,0,0.3)", position: "relative" }}>
            <button
              className="btn-close position-absolute"
              style={{ top: 16, right: 16 }}
              onClick={() => setModalAberto(false)}
            />

            <h2 className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "1.4rem" }}>Nova Conta</h2>
            <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>Preencha os dados da sua conta</p>

            <form onSubmit={handleCadastrar}>
              <div className="mb-3">
                <label className="fw-bold text-muted mb-1" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Nome da conta
                </label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Ex: Nubank, Bradesco..."
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  style={{ padding: "12px 16px", border: "2px solid transparent", backgroundColor: "#f1f5f9" }}
                />
              </div>

              <div className="mb-3">
                <label className="fw-bold text-muted mb-1" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Saldo inicial
                </label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  placeholder="0,00"
                  value={saldo}
                  onChange={(e) => setSaldo(e.target.value)}
                  required
                  step="0.01"
                  style={{ padding: "12px 16px", border: "2px solid transparent", backgroundColor: "#f1f5f9" }}
                />
              </div>

              {erro && <p className="text-danger fw-bold mb-3" style={{ fontSize: "0.82rem" }}>{erro}</p>}

              <button
                type="submit"
                className="btn w-100 fw-bold text-white"
                disabled={loading}
                style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", padding: "14px", borderRadius: 12, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}
              >
                {loading ? "Cadastrando..." : "Cadastrar Conta"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Conta;