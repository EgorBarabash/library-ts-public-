import logo from "../../assets/logo.png";
import logoDark from "../../assets/libraryDark.png"
import styles from "./Logo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Logo() {
  const theme = useSelector((state: RootState)  => state.login.darkTheme)

  return (
    <div className={styles.logo}>
      <div className={styles.logoImg}>
        <img  height="100%" src={!theme ? logo : logoDark} />
      </div>
    </div>
  );
}

export default Logo;
