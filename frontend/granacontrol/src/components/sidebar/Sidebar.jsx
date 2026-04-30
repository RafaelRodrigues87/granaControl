import React, { useState, useEffect } from 'react'; // ✅ aqui
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ removeu useState daqui
import { 
  LayoutDashboard, 
  PieChart, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  User, 
  LogOut 
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
      .then(setSaldoTotal)
      .catch(console.error);
  }, []); // ✅ removeu dependência de "usuario" que não existe aqui

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
            <NavLink to="/resumo" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              <PieChart size={20} />
              Resumo
            </NavLink>
          </li>
          <li>
            <NavLink to="/receita" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
              <ArrowUpCircle size={20} />
              Receita
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
              <User size={20} />
              Conta
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.metasCard}>
        <div className={styles.metasHeader}>
          <span>💰 Poupança</span>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: '64%' }}></div>
        </div>
        <div className={styles.metasValues}>
          <span>R$ {saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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