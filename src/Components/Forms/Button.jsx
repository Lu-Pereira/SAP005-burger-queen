/* eslint-disable react/prop-types *//* eslint-disable linebreak-style */

import React from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  typeButton,
  onClickBtn,
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={typeButton} onClick={onClickBtn} className={styles.button}>
      {children}
    </button>
  );
}
