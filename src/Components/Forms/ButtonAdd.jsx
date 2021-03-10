/* eslint-disable react/prop-types *//* eslint-disable linebreak-style */
import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import styles from './ButtonAdd.module.css';

export default function DisableElevation({
  typeButton,
  onClickBtn,
}) {
  return (
    <ButtonGroup disableElevation variant="contained" color="white">
      <Button type={typeButton} onClick={onClickBtn} className={styles.button}> ➕ </Button>
    </ButtonGroup>
  );
}
