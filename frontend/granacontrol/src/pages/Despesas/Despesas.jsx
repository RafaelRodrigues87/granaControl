import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { AdicionarDespesa, ListarDespesaUsuario, deletarDespesa, atualizarDespesa } from "../../service/DespesasService";
import { ListarConta } from "../../service/ContaService";
import { PlusCircle, Trash2, Calendar, Hash, ArrowDownCircle, CheckCircle, Clock, Pencil } from "lucide-react";

function Despesas() {
  const [despesas, setDespesas] = useState([]);
  const [contas, setContas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [novaDespesa, setNovaDespesa] = useState({ valor: "", data: "", descricao: "", status: "PENDENTE", contaId: "" });
  const [formEdicao, setFormEdicao] = useState({ valor: "", data: "", descricao: "", status: "" });

  useEffect(() => {
    document.title = "GranaControl - Despesas";
    carregarDespesas();
    ListarConta().then(setContas).catch(console.error);
  }, []);

  const carregarDespesas = async () => {
    try {
      const data = await ListarDespesaUsuario();
      setDespesas(data.sort((a, b) => new Date(b.data) - new Date(a.data)));
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

  function handleAbrirEdicao(e, desp) {
    e.stopPropagation();
    setDespesaEditando(desp);
    setFormEdicao({
      valor: desp.valor,
      data: desp.data,
      descricao: desp.descricao,
      status: desp.status
    });
    setShowEditModal(true);
  }

  async function handleAtualizar(e) {
    e.preventDefault();
    try {
      await atualizarDespesa(despesaEditando.id, formEdicao);
      setShowEditModal(false);
      setDespesaEditando(null);
      carregarDespesas();
    } catch (err) {
      console.error("Erro ao atualizar despesa:", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdicionarDespesa(novaDespesa.contaId, {
        valor: Number(novaDespesa.valor),
        data: novaDespesa.data,
        descricao: novaDespesa.descricao,
        status: novaDespesa.status,
        conta: { id: Number(novaDespesa.contaId) }
      });
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

    {/* CORRIGIDO - sem marginLeft */}
    <div style={{ padding: "60px 32px 32px" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1
            className="fw-bold mb-1"
            style={{
              color: "#1e293b",
              fontFamily: "'Oswald', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
          >
            Gestão de Despesas
          </h1>
          <p className="text-muted small mb-0">
            Controle todos os seus gastos e saídas financeiras
          </p>
        </div>

        <button
          className="btn d-flex align-items-center gap-2 fw-bold text-white shadow"
          style={{
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            borderRadius: 12,
            padding: "12px 24px",
            border: "none"
          }}
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
            <ArrowDownCircle
              size={48}
              className="text-light mb-3 mx-auto"
            />
            <p className="text-muted fw-medium">
              Nenhuma despesa registrada no momento.
            </p>
          </div>
        ) : (
          despesas.map((desp) => {
            const statusStyle = getStatusStyle(desp.status);

            return (
              <div key={desp.id} className="col-12 col-md-6 col-xxl-4">
                <div
                  className="card border-0 rounded-4 p-4 shadow-sm h-100"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* restante do card continua igual */}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>

    {/* MODAIS continuam iguais */}
  </div>
);
}

export default Despesas;        