/* eslint-disable linebreak-style */
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      Orgulhosamente desenvolvido por
      <a href="https://github.com/Lu-Pereira">Luciana Pereira</a>
      {' '}
      e
      <a href="https://github.com/karinesouza">Karine Souza</a>
      .
    </p>
  </footer>
);

export default Footer;
