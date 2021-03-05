/* eslint-disable react/prop-types */
import React from 'react';
import styles from './Input.module.css';

export default function Input({
  labelText,
  typeInput,
  nameInput,
  valueInput,
  onChangeInput,
  name,
  onBlur,
}) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <input
        id={name}
        name={nameInput}
        className={styles.input}
        type={typeInput}
        value={valueInput}
        onChange={onChangeInput}
        onBlur={onBlur}
      />
    </div>
  );
}
