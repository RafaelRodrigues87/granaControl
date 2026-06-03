import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { buscarUsuario, atualizarUsuario } from "../../service/UsuarioService";
import { ListarConta } from "../../service/ContaService";
import { ListarReceitaUsuario } from "../../service/ReceitaService";
import { ListarDespesaUsuario } from "../../service/DespesasService";
import { UserCircle, Mail, Phone, CreditCard, Calendar, Lock, Save, Edit3, Wallet, TrendingUp, TrendingDown, BarChart2, Target, Pencil } from "lucide-react";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [stats, setStats] = useState({ contas: 0, receitas: 0, despesas: 0, saldoTotal: 0 });
  const [form, setForm] = useState({ nome: "", telefone: "", dataNascimento: "", email: "", cpf: "", senha: "" });

  // META
  const [meta, setMeta] = useState(() => Number(localStorage.getItem("metaSaldo")) || 15000);
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [novaMetaInput, setNovaMetaInput] = useState("");

  useEffect(() => {
    document.title = "GranaControl - Perfil";
    carregarTudo();
  }, []);

  async function carregarTudo() {
    try {
      const [user, contas, receitas, despesas] = await Promise.all([
        buscarUsuario(), ListarConta(), ListarReceitaUsuario(), ListarDespesaUsuario()
      ]);
      setUsuario(user);
      setForm({ nome: user.nome || "", telefone: user.telefone || "", dataNascimento: user.dataNascimento || "", email: user.email || "", cpf: user.cpf || "", senha: "" });
      const totalReceitas = receitas.reduce((acc, r) => acc + Number(r.valor), 0);
      const totalDespesas = despesas.reduce((acc, d) => acc + Number(d.valor), 0);
      const saldoTotal = contas.reduce((acc, c) => acc + Number(c.saldo), 0);
      setStats({ contas: contas.length, receitas: totalReceitas, despesas: totalDespesas, saldoTotal });
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    }
  }

  async function handleSalvar(e) {
    e.preventDefault();
    setErro(""); setSucesso(""); setLoading(true);
    try {
      const dados = { ...form };
      if (!dados.senha) delete dados.senha;
      await atualizarUsuario(dados);
      setSucesso("Perfil atualizado com sucesso!");
      setEditando(false);
      carregarTudo();
    } catch (err) {
      setErro(err.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  }

  function handleSalvarMeta(e) {
    e.preventDefault();
    const valor = Number(novaMetaInput);
    if (!valor || valor <= 0) return;
    localStorage.setItem("metaSaldo", valor);
    setMeta(valor);
    setEditandoMeta(false);
    setNovaMetaInput("");
    // dispara evento para a sidebar atualizar
    window.dispatchEvent(new Event("metaAtualizada"));
  }

  const porcentagem = Math.min((stats.saldoTotal / meta) * 100, 100).toFixed(0);

  const getBarColor = () => {
    if (porcentagem >= 75) return "linear-gradient(90deg, #10b981, #059669)";
    if (porcentagem >= 40) return "linear-gradient(90deg, #f59e0b, #d97706)";
    return "linear-gradient(90deg, #ef4444, #dc2626)";
  };

  const getInicial = (nome) => nome ? nome.charAt(0).toUpperCase() : "U";

  const InfoItem = ({ icon, label, value, iconBg }) => (
    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: "#f8fafc", marginBottom: 12 }}>
      <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 40, height: 40, background: iconBg, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <small className="text-muted fw-bold text-uppercase d-block" style={{ fontSize: "0.7rem", letterSpacing: "0.8px" }}>{label}</small>
        <span className="fw-semibold" style={{ color: "#1e293b", fontSize: "0.95rem" }}>{value || "—"}</span>
      </div>
    </div>
  );

  const StatCard = ({ icon, label, value, bg, color }) => (
    <div className="card border-0 rounded-4 shadow-sm p-3" style={{ backgroundColor: "#ffffff" }}>
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: 48, height: 48, background: bg, flexShrink: 0 }}>
          {icon}
        </div>
        <div>
          <small className="text-muted fw-bold text-uppercase d-block" style={{ fontSize: "0.7rem", letterSpacing: "0.8px" }}>{label}</small>
          <span className="fw-bold" style={{ color, fontSize: "1.1rem" }}>{value}</span>
        </div>
      </div>
    </div>
  );

  return (
   <div style={{ backgroundColor: "#f1f4f8", minHeight: "100vh" }}>
    <Sidebar />

    {/* CONTAINER PRINCIPAL - IGUAL AO HOME */}
    <div style={{ padding: "60px 32px 32px" }}>

        <div className="mb-4">
          <h1 className="fw-bold mb-0" style={{ color: "#1e293b", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>Meu Perfil</h1>
          <p className="text-muted small mb-0">Gerencie suas informações pessoais</p>
        </div>

        <div className="row g-3">

          {/* STATS */}
          <div className="col-12">
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <StatCard icon={<Wallet size={22} color="#6366f1" />} label="Contas" value={stats.contas} bg="rgba(99,102,241,0.1)" color="#6366f1" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard icon={<TrendingUp size={22} color="#10b981" />} label="Total Receitas" value={`R$ ${stats.receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} bg="rgba(16,185,129,0.1)" color="#10b981" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard icon={<TrendingDown size={22} color="#ef4444" />} label="Total Despesas" value={`R$ ${stats.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} bg="rgba(239,68,68,0.1)" color="#ef4444" />
              </div>
              <div className="col-6 col-md-3">
                <StatCard icon={<BarChart2 size={22} color="#f59e0b" />} label="Saldo Total" value={`R$ ${stats.saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} bg="rgba(245,158,11,0.1)" color="#f59e0b" />
              </div>
            </div>
          </div>

          {/* CARD AVATAR */}
          <div className="col-12 col-lg-3">
            <div className="card border-0 rounded-4 shadow-sm text-center" style={{ backgroundColor: "#ffffff" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-center text-white fw-bold rounded-4 mx-auto mb-3"
                  style={{ width: 90, height: 90, fontSize: "2.2rem", background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 8px 24px rgba(99,102,241,0.35)" }}>
                  {usuario ? getInicial(usuario.nome) : <UserCircle size={40} />}
                </div>
                <h5 className="fw-bold mb-1" style={{ color: "#1e293b" }}>{usuario?.nome || "..."}</h5>
                <small className="text-muted d-block mb-3">{usuario?.email}</small>
                <span className="badge px-3 py-2 rounded-3" style={{ backgroundColor: "#f0fdf4", color: "#065f46", fontWeight: 600, fontSize: "0.75rem" }}>✓ Conta ativa</span>
                <hr style={{ opacity: 0.1 }} />
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Membro desde:</small>
                  <small className="fw-bold" style={{ color: "#475569" }}>
                    {usuario?.dataCriacao ? new Date(usuario.dataCriacao).toLocaleDateString('pt-BR', { month: "short", year: "numeric" }) : "—"}
                  </small>
                </div>
              </div>
            </div>

            {/* CARD META ✅ */}
            <div className="card border-0 rounded-4 shadow-sm mt-3" style={{ backgroundColor: "#ffffff" }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center justify-content-center rounded-3"
                      style={{ width: 36, height: 36, background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                      <Target size={18} color="white" />
                    </div>
                    <span className="fw-bold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.8px", color: "#64748b" }}>
                      Meta de Saldo
                    </span>
                  </div>
                  <button
                    onClick={() => { setEditandoMeta(!editandoMeta); setNovaMetaInput(meta); }}
                    className="btn btn-sm d-flex align-items-center justify-content-center border-0"
                    style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: "#f1f5f9", color: "#64748b" }}
                  >
                    <Pencil size={13} />
                  </button>
                </div>

                {editandoMeta ? (
                  <form onSubmit={handleSalvarMeta}>
                    <input
                      type="number"
                      className="form-control rounded-3 border-0 mb-2"
                      placeholder="Ex: 15000"
                      value={novaMetaInput}
                      onChange={(e) => setNovaMetaInput(e.target.value)}
                      required
                      style={{ padding: "10px 14px", backgroundColor: "#f1f5f9", fontSize: "0.9rem" }}
                    />
                    <div className="d-flex gap-2">
                      <button type="button" className="btn w-100 fw-bold rounded-3 py-2"
                        onClick={() => setEditandoMeta(false)}
                        style={{ backgroundColor: "#f1f5f9", color: "#64748b", border: "none", fontSize: "0.8rem" }}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn w-100 fw-bold text-white rounded-3 py-2"
                        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", fontSize: "0.8rem" }}>
                        Salvar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "1.1rem" }}>
                      R$ {meta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>

                    {/* BARRA */}
                    <div style={{ width: "100%", height: 8, backgroundColor: "#f1f5f9", borderRadius: 10, overflow: "hidden", margin: "10px 0" }}>
                      <div style={{ width: `${porcentagem}%`, height: "100%", background: getBarColor(), borderRadius: 10, transition: "width 0.8s ease" }} />
                    </div>

                    <div className="d-flex justify-content-between">
                      <small style={{ color: "#64748b", fontWeight: 600, fontSize: "0.72rem" }}>{porcentagem}% atingido</small>
                      <small style={{ color: "#64748b", fontSize: "0.72rem" }}>
                        R$ {stats.saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} atual
                      </small>
                    </div>

                    {stats.saldoTotal < meta ? (
                      <div className="mt-2 p-2 rounded-3 d-flex align-items-center gap-2"
                        style={{ backgroundColor: "#f8fafc", fontSize: "0.72rem", color: "#64748b" }}>
                        <Wallet size={12} />
                        Faltam R$ {(meta - stats.saldoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    ) : (
                      <div className="mt-2 p-2 rounded-3 d-flex align-items-center gap-2"
                        style={{ backgroundColor: "rgba(16,185,129,0.1)", fontSize: "0.72rem", color: "#10b981", fontWeight: 600 }}>
                        🎉 Meta atingida!
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* CARD INFORMAÇÕES */}
          <div className="col-12 col-lg-9">
            <div className="card border-0 rounded-4 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0 text-uppercase" style={{ fontFamily: "'Oswald', sans-serif", color: "#1e293b", letterSpacing: "0.5px" }}>
                    Informações Pessoais
                  </h5>
                  {!editando && (
                    <button className="btn d-flex align-items-center gap-2 fw-bold"
                      onClick={() => { setEditando(true); setErro(""); setSucesso(""); }}
                      style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", borderRadius: 10, padding: "8px 18px", border: "none", fontSize: "0.85rem" }}>
                      <Edit3 size={16} />
                      Editar
                    </button>
                  )}
                </div>

                {!editando && usuario && (
                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <InfoItem icon={<UserCircle size={18} color="white" />} label="Nome completo" value={usuario.nome} iconBg="linear-gradient(135deg, #6366f1, #4f46e5)" />
                    </div>
                    <div className="col-12 col-md-6">
                      <InfoItem icon={<Mail size={18} color="white" />} label="E-mail" value={usuario.email} iconBg="linear-gradient(135deg, #3b82f6, #2563eb)" />
                    </div>
                    <div className="col-12 col-md-6">
                      <InfoItem icon={<Phone size={18} color="white" />} label="Telefone" value={usuario.telefone} iconBg="linear-gradient(135deg, #10b981, #059669)" />
                    </div>
                    <div className="col-12 col-md-6">
                      <InfoItem icon={<CreditCard size={18} color="white" />} label="CPF" value={usuario.cpf} iconBg="linear-gradient(135deg, #f59e0b, #d97706)" />
                    </div>
                    <div className="col-12 col-md-6">
                      <InfoItem icon={<Calendar size={18} color="white" />} label="Data de nascimento"
                        value={usuario.dataNascimento ? new Date(usuario.dataNascimento + 'T00:00:00').toLocaleDateString('pt-BR') : "—"}
                        iconBg="linear-gradient(135deg, #8b5cf6, #7c3aed)" />
                    </div>
                    <div className="col-12 col-md-6">
                      <InfoItem icon={<Lock size={18} color="white" />} label="Senha" value="••••••••" iconBg="linear-gradient(135deg, #64748b, #475569)" />
                    </div>
                  </div>
                )}

                {editando && (
                  <form onSubmit={handleSalvar}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label className="fw-bold text-muted mb-1 d-block small text-uppercase">Nome completo</label>
                        <input type="text" className="form-control rounded-3 border-0" value={form.nome}
                          onChange={(e) => setForm({ ...form, nome: e.target.value })}
                          style={{ padding: "12px 16px", backgroundColor: "#f1f5f9" }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="fw-bold text-muted mb-1 d-block small text-uppercase">E-mail</label>
                        <input type="email" className="form-control rounded-3 border-0" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          style={{ padding: "12px 16px", backgroundColor: "#f1f5f9" }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="fw-bold text-muted mb-1 d-block small text-uppercase">Telefone</label>
                        <input type="text" className="form-control rounded-3 border-0" value={form.telefone}
                          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                          style={{ padding: "12px 16px", backgroundColor: "#f1f5f9" }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="fw-bold text-muted mb-1 d-block small text-uppercase">CPF</label>
                        <input type="text" className="form-control rounded-3 border-0" value={form.cpf}
                          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                          style={{ padding: "12px 16px", backgroundColor: "#f1f5f9" }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="fw-bold text-muted mb-1 d-block small text-uppercase">Data de nascimento</label>
                        <input type="date" className="form-control rounded-3 border-0" value={form.dataNascimento}
                          onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                          style={{ padding: "12px 16px", backgroundColor: "#f1f5f9" }} />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="fw-bold text-muted mb-1 d-block small text-uppercase">Nova senha <span className="fw-normal">(opcional)</span></label>
                        <input type="password" className="form-control rounded-3 border-0" placeholder="Deixe em branco para manter"
                          value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })}
                          style={{ padding: "12px 16px", backgroundColor: "#f1f5f9" }} />
                      </div>
                    </div>
                    {erro && <p className="text-danger fw-bold mt-3 mb-0" style={{ fontSize: "0.85rem" }}>⚠ {erro}</p>}
                    <div className="d-flex gap-3 mt-4">
                      <button type="button" className="btn fw-bold rounded-3 py-2 px-4"
                        onClick={() => { setEditando(false); setErro(""); }}
                        style={{ backgroundColor: "#f1f5f9", color: "#64748b", border: "none" }}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn fw-bold text-white rounded-3 py-2 px-4 d-flex align-items-center gap-2"
                        disabled={loading} style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "none" }}>
                        <Save size={16} />
                        {loading ? "Salvando..." : "Salvar alterações"}
                      </button>
                    </div>
                  </form>
                )}

                {sucesso && !editando && (
                  <div className="mt-3 p-3 rounded-3 d-flex align-items-center gap-2" style={{ backgroundColor: "#f0fdf4", color: "#065f46" }}>
                    <span>✓</span>
                    <span className="fw-bold" style={{ fontSize: "0.85rem" }}>{sucesso}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Perfil;