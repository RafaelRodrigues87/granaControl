import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  UserCircle,
  LogOut,
  Wallet,
  CreditCard
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { buscarSaldoTotal } from "../../service/ContaService";

const Sidebar = () => {
  const [saldoTotal, setSaldoTotal] = useState(0);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    buscarSaldoTotal()
      .then((data) => setSaldoTotal(data))
      .catch(console.error);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>$</span>
        <span className={styles.logoText}>
          <strong>GRANA</strong>CONTROL
        </span>
      </div>

      <nav className={styles.navMenu}>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/receita" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              <ArrowUpCircle size={20} />
              Receitas
            </NavLink>
          </li>
          <li>
            <NavLink to="/despesas" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              <ArrowDownCircle size={20} />
              Despesas
            </NavLink>
          </li>
          <li>
            <NavLink to="/conta" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              <CreditCard size={20} /> {/* ✅ novo ícone de conta */}
              Contas
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              <UserCircle size={20} /> {/* ✅ perfil */}
              Perfil
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* CARD SALDO TOTAL */}
      <div className={styles.metasCard}>
        <div className={styles.saldoHeader}>
          <div className={styles.saldoIcone}>
            <Wallet size={16} />
          </div>
          <span className={styles.saldoLabel}>Saldo Total</span>
        </div>
        <div className={styles.saldoValor}>
          R$ {Number(saldoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: '64%' }}></div>
        </div>
      </div>

      <button className={styles.btnLogout} onClick={handleLogout}>
        <LogOut size={20} />
        Sair
      </button>
    </aside>
  );
};

export default Sidebar;