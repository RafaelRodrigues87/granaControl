import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Importando o objeto styles
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {

        const navigate = useNavigate();

        function handleLogout(){
            localStorage.removeItem("token");
            navigate("/login")
        }
    
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>$</span>
        <span className={styles.logoText}>GranaControl</span>
      </div>

      <nav className={styles.navMenu}>
        <ul>
          <li className={styles.navItem}>
           <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                Dashboard
              </NavLink>
            <ul className={styles.submenu}>
              <li>
                <NavLink
                  to="/resumo"
                  className={({isActive})=>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                    Resumo
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/receita"
                className={({isActive})=>
                isActive ? `${styles.navLink} ${styles.active}`: styles.navLink}>Receita</NavLink>
              </li>
              <li>
             <NavLink
             to="/despesas"
             className={({isActive})=>
            isActive ? `${styles.navLink} ${styles.active}`: styles.navLink}>Despesas</NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.navItem}>
            <NavLink
            to="/conta"
            className={({isActive})=>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Conta</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
            to="/despesas"
            className={({isActive})=>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Despesas</NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.metasCard}>
        <div className={styles.metasHeader}>
          <span>💰 Poupança</span>
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: '65%' }}></div>
        </div>
        <div className={styles.metasValues}>
          <span className={styles.current}>R$ 3.200</span>
          <span className={styles.total}>/ R$ 5.000</span>
        </div>
      </div>

      <button className={styles.btnLogout}
      onClick={handleLogout}>
        Sair
      </button>
    </aside>
  );
};

export default Sidebar;