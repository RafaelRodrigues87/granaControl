import { useEffect, useState } from "react";
import { AdicionarReceita, deletarReceita, ListarReceitaUsuario, atualizarReceita } from "../../service/ReceitaService";
import { ListarConta } from "../../service/ContaService";
import Sidebar from "../../components/sidebar/Sidebar";
import { PlusCircle, Wallet, Trash2, Calendar, Hash, ArrowUpCircle, Pencil } from "lucide-react";

function Receitas() {
  const [receitas, setReceitas] = useState([]);
  const [contas, setContas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [receitaEditando, setReceitaEditando] = useState(null);
  const [novaReceita, setNovaReceita] = useState({ valor: "", data: "", descricao: "", contaId: "" });
  const [formEdicao, setFormEdicao] = useState({ valor: "", data: "", descricao: "" });

  useEffect(() => {
    document.title = "GranaControl - Receitas";
    carregarReceitas();
    ListarConta().then(setContas).catch(console.error);
  }, []);

  const carregarReceitas = async () => {
    try {
      const data = await ListarReceitaUsuario();
      setReceitas(data.sort((a, b) => new Date(b.data) - new Date(a.data)));
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

  function handleAbrirEdicao(e, rec) {
    e.stopPropagation();
    setReceitaEditando(rec);
    setFormEdicao({
      valor: rec.valor,
      data: rec.data,
      descricao: rec.descricao
    });
    setShowEditModal(true);
  }

  async function handleAtualizar(e) {
    e.preventDefault();
    try {
      await atualizarReceita(receitaEditando.id, formEdicao);
      setShowEditModal(false);
      setReceitaEditando(null);
      carregarReceitas();
    } catch (err) {
      console.error("Erro ao atualizar receita:", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdicionarReceita(novaReceita.contaId, {
        valor: Number(novaReceita.valor),
        data: novaReceita.data,
        descricao: novaReceita.descricao,
        conta: { id: Number(novaReceita.contaId) }
      });
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

    {/* CONTEÚDO PRINCIPAL */}
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
            Gestão de Receitas
          </h1>

          <p className="text-muted small mb-0">
            Acompanhe todos os seus ganhos e entradas financeiras
          </p>
        </div>

        <button
          className="btn d-flex align-items-center gap-2 fw-bold text-white shadow"
          style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            borderRadius: 12,
            padding: "12px 24px",
            border: "none"
          }}
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
            <ArrowUpCircle
              size={48}
              className="text-light mb-3 mx-auto"
            />
            <p className="text-muted fw-medium">
              Nenhuma receita registrada no momento.
            </p>
          </div>
        ) : (
          receitas.map((rec) => (
            <div
              key={rec.id}
              className="col-12 col-md-6 col-xxl-4"
            >
              <div
                className="card border-0 rounded-4 p-4 shadow-sm h-100"
                style={{ backgroundColor: "#ffffff" }}
              >

                {/* TOPO DO CARD */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                    style={{
                      width: 50,
                      height: 50,
                      background:
                        "linear-gradient(135deg, #ecfdf5, #d1fae5)"
                    }}
                  >
                    <Wallet size={24} color="#10b981" />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      onClick={(e) => handleAbrirEdicao(e, rec)}
                      className="btn btn-sm d-flex align-items-center justify-content-center border-0"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        backgroundColor: "#eff6ff",
                        color: "#3b82f6"
                      }}
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={(e) => handleDeletar(e, rec.id)}
                      className="btn btn-sm d-flex align-items-center justify-content-center border-0"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        backgroundColor: "#fff1f2",
                        color: "#e11d48"
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* INFO PRINCIPAL */}
                <div className="mb-4">
                  <h5
                    className="fw-bold text-dark mb-2 text-truncate"
                    title={rec.descricao}
                  >
                    {rec.descricao}
                  </h5>

                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#f1f5f9",
                      color: "#64748b",
                      fontWeight: 500
                    }}
                  >
                    {rec.conta?.nome || `Conta #${rec.conta?.id}`}
                  </span>
                </div>

                {/* VALOR */}
                <div
                  className="p-3 rounded-3 mb-4"
                  style={{
                    backgroundColor: "#f0fdf4",
                    borderLeft: "4px solid #10b981"
                  }}
                >
                  <span
                    className="text-muted small d-block mb-1 fw-bold text-uppercase"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    Valor Recebido
                  </span>

                  <h3
                    className="fw-bold mb-0"
                    style={{ color: "#065f46" }}
                  >
                    R${" "}
                    {Number(rec.valor).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2
                    })}
                  </h3>
                </div>

                {/* RODAPÉ */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                  <div className="d-flex align-items-center gap-2 text-muted small">
                    <Calendar size={14} />
                    {new Date(
                      rec.data + "T00:00:00"
                    ).toLocaleDateString("pt-BR")}
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
  </div>
);
}

export default Receitas;