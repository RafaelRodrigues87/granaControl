import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowUpCircle,
  ArrowDownCircle,
  UserCircle,
  LogOut,
  Wallet,
  CreditCard,
  Target,
  Menu,
  X
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { buscarSaldoTotal } from "../../service/ContaService";

const Sidebar = () => {
  const [aberta, setAberta] = useState(false);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [meta, setMeta] = useState(() => Number(localStorage.getItem("metaSaldo")) || 15000);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    const carregarDados = () => {
      buscarSaldoTotal()
        .then((data) => setSaldoTotal(data))
        .catch(console.error);
      const metaSalva = Number(localStorage.getItem("metaSaldo")) || 15000;
      setMeta(metaSalva);
    };

    carregarDados();
    window.addEventListener("metaAtualizada", carregarDados);
    return () => window.removeEventListener("metaAtualizada", carregarDados);
  }, []);

  const porcentagem = Math.min((saldoTotal / meta) * 100, 100).toFixed(0);

  const getBarColor = () => {
    if (porcentagem >= 75) return "linear-gradient(90deg, #10b981, #059669)";
    if (porcentagem >= 40) return "linear-gradient(90deg, #f59e0b, #d97706)";
    return "linear-gradient(90deg, #ef4444, #dc2626)";
  };

  return (
    <>
      {/* BOTÃO HAMBURGUER — sempre visível */}
      <button
        onClick={() => setAberta(!aberta)}
        style={{
          position: "fixed",
          top: 16,
          left: aberta ? 272 : 16,
          zIndex: 1100,
          width: 40,
          height: 40,
          borderRadius: 10,
          border: "none",
          background: aberta ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #1c1c1c, #0e0e0e)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "left 0.3s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        {aberta ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* OVERLAY — fundo escuro ao abrir */}
      {aberta && (
        <div
          onClick={() => setAberta(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 999,
            backdropFilter: "blur(2px)"
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          position: "fixed",
          left: aberta ? 0 : -260,
          top: 0,
          width: 260,
          height: "100vh",
          background: "linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 60%, #000000 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          flexDirection: "column",
          padding: 24,
          zIndex: 1000,
          transition: "left 0.3s ease",
          fontFamily: "'Inter', sans-serif",
          overflowY: "auto"
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40, marginTop: 8 }}>
          <span style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
            width: 48, height: 48,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 14, color: "#c1c8d3", fontWeight: 800, fontSize: "1.5rem",
            border: "2px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 16px -4px rgba(0,0,0,0.6)"
          }}>$</span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.4rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#f8fafc" }}>
            <strong>GRANA</strong>CONTROL
          </span>
        </div>

        {/* NAV */}
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { to: "/", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
              { to: "/receita", icon: <ArrowUpCircle size={18} />, label: "Receitas" },
              { to: "/despesas", icon: <ArrowDownCircle size={18} />, label: "Despesas" },
              { to: "/conta", icon: <CreditCard size={18} />, label: "Contas" },
              { to: "/perfil", icon: <UserCircle size={18} />, label: "Perfil" },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={() => setAberta(false)}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    marginBottom: 4,
                    color: isActive ? "#ffffff" : "#5a6a7e",
                    backgroundColor: isActive ? "rgba(100,140,180,0.06)" : "transparent",
                    borderLeft: isActive ? "3px solid #4a7a9b" : "3px solid transparent",
                    transition: "all 0.2s"
                  })}
                >
                  {icon}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* CARD META */}
        <div style={{
          background: "rgba(45,45,45,0.4)",
          padding: 20,
          borderRadius: 16,
          marginBottom: 20,
          border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(255,255,255,0.08)", color: "#a0a0b0"
            }}>
              <Target size={14} />
            </div>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", color: "#5a6a7e" }}>
              Meta de Saldo
            </span>
          </div>

          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f8fafc", marginBottom: 12, letterSpacing: "0.5px" }}>
            R$ {Number(saldoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: "0.68rem", color: "#5a6a7e" }}>Saldo atual</span>
            <span style={{ fontSize: "0.68rem", color: "#5a6a7e" }}>
              Meta: R$ {meta.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </span>
          </div>

          <div style={{ width: "100%", height: 8, backgroundColor: "#0a0a0a", borderRadius: 10, overflow: "hidden" }}>
            <div style={{
              width: `${porcentagem}%`, height: "100%",
              background: getBarColor(),
              borderRadius: 10,
              transition: "width 0.8s ease",
              boxShadow: porcentagem >= 75 ? "0 0 8px rgba(16,185,129,0.4)" : porcentagem >= 40 ? "0 0 8px rgba(245,158,11,0.4)" : "0 0 8px rgba(239,68,68,0.4)"
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: "0.68rem", color: "#5a6a7e", fontWeight: 600 }}>{porcentagem}% atingido</span>
            <span style={{ fontSize: "0.68rem", color: "#5a6a7e" }}>
              {porcentagem >= 100 ? "✓ Completo" : `Faltam ${(100 - porcentagem)}%`}
            </span>
          </div>

          {saldoTotal < meta ? (
            <div style={{
              marginTop: 10, padding: "7px 10px", borderRadius: 8,
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontSize: "0.68rem", color: "#5a6a7e",
              display: "flex", alignItems: "center", gap: 6
            }}>
              <Wallet size={11} />
              Faltam R$ {(meta - saldoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          ) : (
            <div style={{
              marginTop: 10, padding: "7px 10px", borderRadius: 8,
              backgroundColor: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.2)",
              fontSize: "0.68rem", color: "#10b981", fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6
            }}>
              🎉 Meta atingida!
            </div>
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "none", border: "none",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 10px 0",
            color: "#5a6a7e", cursor: "pointer",
            fontSize: "0.95rem", fontWeight: 600,
            transition: "color 0.3s", width: "100%"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
          onMouseLeave={e => e.currentTarget.style.color = "#5a6a7e"}
        >
          <LogOut size={18} />
          Sair
        </button>
      </aside>
    </>
  );
};

export default Sidebar;