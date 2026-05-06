import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { AdicionarDespesa, ListarDespesaUsuario, deletarDespesa } from "../../service/DespesasService";
import { ListarConta } from "../../service/ContaService";
import { PlusCircle, Trash2, Calendar, Hash, ArrowDownCircle, CheckCircle, Clock } from "lucide-react";

function Despesas() {
  const [despesas, setDespesas] = useState([]);
  const [contas, setContas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novaDespesa, setNovaDespesa] = useState({
    valor: "",
    data: "",
    descricao: "",
    status: "PENDENTE",
    contaId: ""
  });

  useEffect(() => {
    document.title = "GranaControl - Despesas";
    carregarDespesas();
    ListarConta().then(setContas).catch(console.error);
  }, []);

  const carregarDespesas = async () => {
    try {
      const data = await ListarDespesaUsuario();
      const ordenadas = data.sort((a, b) => new Date(b.data) - new Date(a.data));
      setDespesas(ordenadas);
    } catch (error) {
      console.error("Erro ao carregar despesas:", error);
    }
  };

  async function handleDeletar(e, id) {
    e.stopPropagation();
    if (!window.confirm("Tem certeza que deseja excluir esta despesa?")) return;
    try {
      await deletarDespesa(id);
      carregarDespesas();
    } catch (err) {
      console.error("Erro ao deletar despesa:", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dadosParaEnviar = {
        valor: Number(novaDespesa.valor),
        data: novaDespesa.data,
        descricao: novaDespesa.descricao,
        status: novaDespesa.status,
        conta: { id: Number(novaDespesa.contaId) }
      };
      await AdicionarDespesa(novaDespesa.contaId, dadosParaEnviar);
      setShowModal(false);
      setNovaDespesa({ valor: "", data: "", descricao: "", status: "PENDENTE", contaId: "" });
      carregarDespesas();
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "PAGO":
        return { bg: "#f0fdf4", color: "#065f46", icon: <CheckCircle size={14} />, label: "Pago" };
      case "PENDENTE":
        return { bg: "#fffbeb", color: "#92400e", icon: <Clock size={14} />, label: "Pendente" };
      default:
        return { bg: "#f1f5f9", color: "#475569", icon: <Clock size={14} />, label: status };
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
              Gestão de Despesas
            </h1>
            <p className="text-muted small mb-0">Controle todos os seus gastos e saídas financeiras</p>
          </div>
          <button
            className="btn d-flex align-items-center gap-2 fw-bold text-white shadow"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", borderRadius: 12, padding: "12px 24px", border: "none" }}
            onClick={() => setShowModal(true)}
          >
            <PlusCircle size={20} />
            Nova Despesa
          </button>
        </div>

        {/* LISTA DE CARDS */}
        <div className="row g-4">
          {despesas.length === 0 ? (
            <div className="col-12 text-center py-5 card border-0 rounded-4 shadow-sm">
              <ArrowDownCircle size={48} className="text-light mb-3 mx-auto" />
              <p className="text-muted fw-medium">Nenhuma despesa registrada no momento.</p>
            </div>
          ) : (
            despesas.map((desp) => {
              const statusStyle = getStatusStyle(desp.status);
              return (
                <div key={desp.id} className="col-12 col-md-6 col-xxl-4">
                  <div className="card border-0 rounded-4 p-4 shadow-sm h-100" style={{ backgroundColor: "#ffffff" }}>

                    {/* TOPO */}
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                        style={{ width: 50, height: 50, background: "linear-gradient(135deg, #fef2f2, #fecaca)" }}
                      >
                        <ArrowDownCircle size={24} color="#ef4444" />
                      </div>
                      <button
                        onClick={(e) => handleDeletar(e, desp.id)}
                        className="btn btn-sm d-flex align-items-center justify-content-center border-0"
                        style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#fff1f2", color: "#e11d48" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* INFO PRINCIPAL */}
                    <div className="mb-4">
                      <h5 className="fw-bold text-dark mb-2 text-truncate" title={desp.descricao}>
                        {desp.descricao}
                      </h5>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="badge d-flex align-items-center gap-1"
                          style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, fontWeight: 500, padding: "6px 10px" }}
                        >
                          {statusStyle.icon}
                          {statusStyle.label}
                        </span>
                        <span className="badge" style={{ backgroundColor: "#f1f5f9", color: "#64748b", fontWeight: 500 }}>
                          {desp.conta?.nome || `Conta #${desp.conta?.id}`}
                        </span>
                      </div>
                    </div>

                    {/* VALOR */}
                    <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: "#fef2f2", borderLeft: "4px solid #ef4444" }}>
                      <span className="text-muted small d-block mb-1 fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>Valor Gasto</span>
                      <h3 className="fw-bold mb-0" style={{ color: "#991b1b" }}>
                        R$ {Number(desp.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </h3>
                    </div>

                    {/* RODAPÉ */}
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <Calendar size={14} />
                        {new Date(desp.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </div>
                      <div className="d-flex align-items-center gap-1 text-muted small">
                        <Hash size={14} />
                        Ref: {desp.id}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
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
              <h2 className="fw-bold mb-0" style={{ color: "#1e293b", fontSize: "1.5rem" }}>Nova Despesa</h2>
              <button className="btn-close shadow-none" onClick={() => setShowModal(false)}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Descrição</label>
                <input
                  type="text"
                  className="form-control rounded-3 border-0"
                  placeholder="Ex: Conta de luz"
                  value={novaDespesa.descricao}
                  onChange={(e) => setNovaDespesa({ ...novaDespesa, descricao: e.target.value })}
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
                    value={novaDespesa.valor}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                    required
                    style={{ padding: "14px", backgroundColor: "#f1f5f9" }}
                  />
                </div>
                <div className="col-6">
                  <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Data</label>
                  <input
                    type="date"
                    className="form-control rounded-3 border-0"
                    value={novaDespesa.data}
                    onChange={(e) => setNovaDespesa({ ...novaDespesa, data: e.target.value })}
                    required
                    style={{ padding: "14px", backgroundColor: "#f1f5f9" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Status</label>
                <select
                  className="form-select rounded-3 border-0"
                  value={novaDespesa.status}
                  onChange={(e) => setNovaDespesa({ ...novaDespesa, status: e.target.value })}
                  style={{ padding: "14px", backgroundColor: "#f1f5f9" }}
                >
                  <option value="PENDENTE">Pendente</option>
                  <option value="PAGO">Pago</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="fw-bold text-muted mb-2 d-block small text-uppercase">Vincular à Conta</label>
                <select
                  className="form-select rounded-3 border-0"
                  value={novaDespesa.contaId}
                  onChange={(e) => setNovaDespesa({ ...novaDespesa, contaId: e.target.value })}
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
                  Salvar Despesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Despesas;