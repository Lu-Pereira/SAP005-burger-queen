/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import React from 'react';
import { Link } from 'react-router-dom';
import Sair from '../../Assets/sair.svg';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <nav className={`${styles.nav} container`}>
      <Link className={styles.link_home} to="/">
        <img className={styles.img_home} src={Sair} alt="Icone para sair" />
      </Link>
      {'  '}
      <Link className={styles.link_Pedidos} to="/PedidosPronto">
        Pedidos Prontos ✅
      </Link>
      {'  '}
      <Link className={styles.link_Pedidos} to="/historicoPedidos">
        Histórico de Pedidos 📝
      </Link>
    </nav>
  </header>
);
export default Header;
