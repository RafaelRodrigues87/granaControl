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
  Target
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { buscarSaldoTotal } from "../../service/ContaService";

const Sidebar = () => {
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
    <aside className={styles.sidebar}>

      {/* LOGO */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}>$</span>
        <span className={styles.logoText}>
          <strong>GRANA</strong>CONTROL
        </span>
      </div>

      {/* NAV */}
      <nav className={styles.navMenu}>
        <ul>
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
                className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* CARD META */}
      <div className={styles.metasCard}>

        <div className={styles.saldoHeader}>
          <div className={styles.saldoIcone}>
            <Target size={14} />
          </div>
          <span className={styles.saldoLabel}>Meta de Saldo</span>
        </div>

        {/* SALDO ATUAL */}
        <div className={styles.saldoValor}>
          R$ {Number(saldoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>

        {/* MINI INFO */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.68rem", color: "#5a6a7e" }}>Saldo atual</span>
          <span style={{ fontSize: "0.68rem", color: "#5a6a7e" }}>
            Meta: R$ {meta.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
          </span>
        </div>

        {/* BARRA */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${porcentagem}%`,
              background: getBarColor(),
              transition: "width 0.8s ease",
              boxShadow: porcentagem >= 75
                ? "0 0 8px rgba(16,185,129,0.4)"
                : porcentagem >= 40
                  ? "0 0 8px rgba(245,158,11,0.4)"
                  : "0 0 8px rgba(239,68,68,0.4)"
            }}
          />
        </div>

        {/* PORCENTAGEM */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: "0.68rem", color: "#5a6a7e", fontWeight: 600 }}>
            {porcentagem}% atingido
          </span>
          <span style={{ fontSize: "0.68rem", color: "#5a6a7e" }}>
            {porcentagem >= 100 ? "✓ Completo" : `Faltam ${(100 - porcentagem)}%`}
          </span>
        </div>

        {/* STATUS */}
        {saldoTotal < meta ? (
          <div style={{
            marginTop: 10,
            padding: "7px 10px",
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: "0.68rem",
            color: "#5a6a7e",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <Wallet size={11} />
            Faltam R$ {(meta - saldoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        ) : (
          <div style={{
            marginTop: 10,
            padding: "7px 10px",
            borderRadius: 8,
            backgroundColor: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.2)",
            fontSize: "0.68rem",
            color: "#10b981",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            🎉 Meta atingida!
          </div>
        )}

      </div>

      {/* LOGOUT */}
      <button className={styles.btnLogout} onClick={handleLogout}>
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  );
};

export default Sidebar;