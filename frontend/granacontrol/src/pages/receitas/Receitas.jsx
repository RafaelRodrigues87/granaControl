import { useEffect, useState } from "react";
import { AdicionarReceita, deletarReceita, ListarReceitaUsuario } from "../../service/ReceitaService";
import { ListarConta } from "../../service/ContaService";
import Sidebar from "../../components/sidebar/Sidebar";
import { PlusCircle, Wallet, Trash2, Calendar, Hash, ArrowUpCircle } from "lucide-react";

function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [contas, setContas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novaReceita, setNovaReceita] = useState({
    valor: "",
    data: "",
    descricao: "",
    contaId: ""
  });

  useEffect(() => {
    document.title = "GranaControl - Receitas";
    carregarReceitas();
    ListarConta().then(setContas).catch(console.error);
  }, []);

  const carregarReceitas = async () => {
    try {
      const data = await ListarReceitaUsuario();
      const ordenadas = data.sort((a, b) => new Date(b.data) - new Date(a.data));
      setReceitas(ordenadas);
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
    }
  };

  async function handleDeletar(e, id) {
    e.stopPropagation();
    if (!window.confirm("Tem certeza que deseja excluir esta receita?")) return;
    try {
      await deletarReceita(id);
      carregarReceitas();
    } catch (err) {
      console.error("Erro ao deletar receita:", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dadosParaEnviar = {
        valor: Number(novaReceita.valor),
        data: novaReceita.data,
        descricao: novaReceita.descricao,
        conta: { id: Number(novaReceita.contaId) }
      };
      await AdicionarReceita(novaReceita.contaId, dadosParaEnviar);
      setShowModal(false);
      setNovaReceita({ valor: "", data: "", descricao: "", contaId: "" });
      carregarReceitas();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ marginLeft: "260px", flexGrow: 1, padding: "40px 32px" }}>

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: "#1e293b", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "1px" }}>
              Gestão de Receitas
            </h1>
            <p className="text-muted small mb-0">Acompanhe todos os seus ganhos e entradas financeiras</p>
          </div>
          <button
            className="btn d-flex align-items-center gap-2 fw-bold text-white shadow"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: 12, padding: "12px 24px", border: "none" }}
            onClick={() => setShowModal(true)}
          >
            <PlusCircle size={20} />
            Nova Receita
          </button>
        </div>

        {/* LISTA DE CARDS */}
        <div className="row g-4">
          {receitas.length === 0 ? (
            <div className="col-12 text-center py-5 card border-0 rounded-4 shadow-sm">
              <ArrowUpCircle size={48} className="text-light mb-3 mx-auto" />
              <p className="text-muted fw-medium">Nenhuma receita registrada no momento.</p>
            </div>
          ) : (
            receitas.map((rec) => (
              <div key={rec.id} className="col-12 col-md-6 col-xxl-4">
                <div className="card border-0 rounded-4 p-4 shadow-sm h-100" style={{ backgroundColor: "#ffffff", transition: "transform 0.2s" }}>

                  {/* TOPO DO CARD */}
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                      style={{ width: 50, height: 50, background: "linear-gradient(135deg, #ecfdf5, #d1fae5)" }}
                    >
                      <Wallet size={24} color="#10b981" />
                    </div>
                    <button
                      onClick={(e) => handleDeletar(e, rec.id)}
                      className="btn btn-sm d-flex align-items-center justify-content-center border-0"
                      style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#fff1f2", color: "#e11d48" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* INFO PRINCIPAL */}
                  <div className="mb-4">
                    <h5 className="fw-bold text-dark mb-2 text-truncate" title={rec.descricao}>
                      {rec.descricao}
                    </h5>
                    <span className="badge" style={{ backgroundColor: "#f1f5f9", color: "#64748b", fontWeight: 500 }}>
                      {rec.conta?.nome || `Conta #${rec.conta?.id}`}
                    </span>
                  </div>

                  {/* VALOR */}
                  <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid #10b981" }}>
                    <span className="text-muted small d-block mb-1 fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Valor Recebido</span>
                    <h3 className="fw-bold mb-0" style={{ color: "#065f46" }}>
                      R$ {Number(rec.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h3>
                  </div>

                  {/* RODAPÉ DO CARD */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <Calendar size={14} />
                      {new Date(rec.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </div>
                    <div className="d-flex align-items-center gap-1 text-muted small">
                      <Hash size={14} />
                      Ref: {rec.id}
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050 }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="card border-0 rounded-4 p-4 shadow-lg" style={{ width: "95%", maxWidth: 480, backgroundColor: "#fff" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0" style={{ color: "#1e293b", fontSize: "1.5rem" }}>Nova Receita</h2>
              <button className="btn-close shadow-none" onClick={() => setShowModal(false)}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Descrição do Ganho</label>
                <input
                  type="text"
                  className="form-control rounded-3 border-0"
                  placeholder="Ex: Salário Mensal"
                  value={novaReceita.descricao}
                  onChange={(e) => setNovaReceita({ ...novaReceita, descricao: e.target.value })}
                  required
                  style={{ padding: "14px", backgroundColor: "#f1f5f9" }}
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control rounded-3 border-0"
                    placeholder="0,00"
                    value={novaReceita.valor}
                    onChange={(e) => setNovaReceita({ ...novaReceita, valor: e.target.value })}
                    required
                    style={{ padding: "14px", backgroundColor: "#f1f5f9" }}
                  />
                </div>
                <div className="col-6">
                  <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Data</label>
                  <input
                    type="date"
                    className="form-control rounded-3 border-0"
                    value={novaReceita.data}
                    onChange={(e) => setNovaReceita({ ...novaReceita, data: e.target.value })}
                    required
                    style={{ padding: "14px", backgroundColor: "#f1f5f9" }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Vincular à Conta</label>
                <select
                  className="form-select rounded-3 border-0"
                  value={novaReceita.contaId}
                  onChange={(e) => setNovaReceita({ ...novaReceita, contaId: e.target.value })}
                  required
                  style={{ padding: "14px", backgroundColor: "#f1f5f9" }}
                >
                  <option value="">Selecione uma conta</option>
                  {contas.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex gap-3 mt-2">
                <button type="button" className="btn w-100 fw-bold rounded-3 py-3" onClick={() => setShowModal(false)} style={{ backgroundColor: "#f1f5f9", color: "#64748b", border: "none" }}>
                  Cancelar
                </button>
                <button type="submit" className="btn w-100 fw-bold text-white rounded-3 py-3 shadow-sm" style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "none" }}>
                  Salvar Receita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Receitas;