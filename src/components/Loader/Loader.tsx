import React from 'react';
import styles from './Loader.module.scss'
import { useSelector } from 'react-redux';

const Loader = () => {
  const theme = useSelector((state: any) => state.login.darkTheme);
  

  return (
    <div className={!theme ? styles.loaderWrapper : styles.loaderWrapperDark}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;