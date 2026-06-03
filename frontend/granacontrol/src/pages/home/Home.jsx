import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { buscarUsuario } from "../../service/UsuarioService";
import { ListarConta } from "../../service/ContaService";
import { buscarUltimasMovimentacoes } from "../../service/MovimentacaoService";
import { ListarReceitaUsuario } from "../../service/ReceitaService";
import { ListarDespesaUsuario } from "../../service/DespesasService";
import { ArrowUpCircle, ArrowDownCircle, User, Wallet, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Home() {
  const [usuario, setUsuario] = useState(null);
  const [contaPrincipal, setContaPrincipal] = useState(null);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    document.title = "GranaControl - Home";
    const carregarDados = async () => {
      try {
        const user = await buscarUsuario();
        setUsuario(user);

        const movs = await buscarUltimasMovimentacoes();
        setMovimentacoes(movs);

        const contas = await ListarConta();
        if (contas.length > 0) {
          const maior = contas.reduce((prev, curr) =>
            Number(curr.saldo) > Number(prev.saldo) ? curr : prev
          );
          setContaPrincipal(maior);
        }

        const receitas = await ListarReceitaUsuario();
        const despesas = await ListarDespesaUsuario();
        setDadosGrafico(montarDadosGrafico(receitas, despesas));

      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      }
    };
    carregarDados();
  }, []);

  function montarDadosGrafico(receitas, despesas) {
    const hoje = new Date();
    const dias = {};

    for (let i = 29; i >= 0; i--) {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() - i);
      const chave = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString('pt-BR', { day: "2-digit", month: "2-digit" });
      dias[chave] = { data: label, receitas: 0, despesas: 0 };
    }

    receitas.forEach(r => {
      const chave = r.data?.split("T")[0] || r.data;
      if (dias[chave]) dias[chave].receitas += Number(r.valor);
    });

    despesas.forEach(d => {
      const chave = d.data?.split("T")[0] || d.data;
      if (dias[chave]) dias[chave].despesas += Number(d.valor);
    });

    return Object.values(dias);
  }

  const getInicial = (nome) => nome ? nome.charAt(0).toUpperCase() : "U";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: "#fff", border: "1px solid #f1f5f9", borderRadius: 12, padding: "12px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          <p className="fw-bold mb-2" style={{ color: "#1e293b", fontSize: "0.85rem" }}>{label}</p>
          {payload.map((p, i) => (
            <p key={i} className="mb-0" style={{ color: p.color, fontSize: "0.82rem", fontWeight: 600 }}>
              {p.name}: R$ {Number(p.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ backgroundColor: "#f1f4f8", minHeight: "100vh" }}>
      <Sidebar />

      {/* ✅ apenas um container, sem margin-left */}
      <div style={{ padding: "60px 32px 32px" }}>

        <div className="mb-3">
          <h1 className="fw-bold mb-0" style={{ color: "#1e293b", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>Dashboard</h1>
          <p className="text-muted small mb-0">Resumo da sua atividade financeira</p>
        </div>

        <div className="row g-3">

          {/* CARD PERFIL + CONTA PRINCIPAL */}
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

            {contaPrincipal && (
              <div className="card border-0 rounded-4 shadow-sm mt-3" style={{ backgroundColor: "#ffffff" }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{ width: 36, height: 36, background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
                    >
                      <Wallet size={18} color="white" />
                    </div>
                    <span className="fw-bold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.8px", color: "#64748b" }}>
                      Maior Saldo
                    </span>
                  </div>
                  <p className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "0.95rem" }}>
                    {contaPrincipal.nome}
                  </p>
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f0fdf4", borderLeft: "4px solid #10b981" }}>
                    <div className="d-flex align-items-center gap-2">
                      <TrendingUp size={16} color="#10b981" />
                      <span className="fw-bold" style={{ color: "#065f46", fontSize: "1.2rem" }}>
                        R$ {Number(contaPrincipal.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CARD MOVIMENTAÇÕES */}
          <div className="col-12 col-md-8 col-lg-9">
            <div className="card border-0 rounded-4 shadow-sm h-100" style={{ backgroundColor: "#ffffff" }}>
              <div className="card-body p-3">
                <h5 className="text-uppercase fw-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", color: "#1e293b", letterSpacing: "0.5px" }}>
                  Últimas Movimentações <span className="text-muted fw-normal ms-2" style={{ fontSize: "0.8rem" }}>(Top 3)</span>
                </h5>

                {movimentacoes.length === 0 ? (
                  <p className="text-center text-muted fst-italic py-4">Nenhuma movimentação encontrada</p>
                ) : (
                  movimentacoes.map((mov, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center p-3 rounded-3 mb-2"
                      style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3 me-3"
                        style={{
                          background: mov.tipo === "RECEITA" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                          width: 40, height: 40, flexShrink: 0
                        }}
                      >
                        {mov.tipo === "RECEITA"
                          ? <ArrowUpCircle size={18} color="#10b981" />
                          : <ArrowDownCircle size={18} color="#ef4444" />
                        }
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="fw-bold mb-0 text-truncate" style={{ color: "#334155", fontSize: "0.9rem" }}>
                          {mov.descricao}
                        </p>
                        <small className="text-muted">
                          {mov.contaNome} · {new Date(mov.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </small>
                      </div>
                      <span className="fw-bold ms-3" style={{ color: mov.tipo === "RECEITA" ? "#10b981" : "#ef4444", fontSize: "0.95rem", whiteSpace: "nowrap" }}>
                        {mov.tipo === "RECEITA" ? "+ " : "- "}
                        R$ {Number(mov.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className="col-12">
            <div className="card border-0 rounded-4 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
              <div className="card-body p-3">
                <h5 className="text-uppercase fw-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", color: "#1e293b", letterSpacing: "0.5px" }}>
                  Receitas vs Despesas <span className="text-muted fw-normal ms-2" style={{ fontSize: "0.8rem" }}>(Últimos 30 dias)</span>
                </h5>

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dadosGrafico} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="data" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} interval={4} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "0.85rem", paddingTop: 8 }} formatter={(value) => value === "receitas" ? "Receitas" : "Despesas"} />
                    <Line type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#10b981" }} />
                    <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#ef4444" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;