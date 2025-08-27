import logo from "../../assets/logo.png";
import logoDark from "../../assets/libraryDark.png";
import styles from "./Avatar.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IProps {
  name: string | undefined;
}

function Avatar({ name, theme, img }: IProps) {

  return (
    <div className={styles.avatar}>
      <h3>{name}</h3>
      <div className={styles.avatarImg}>
        {/* <img  src={!theme ? logo : logoDark} alt="Avatar" /> */}
        <img height="100%" src={`data:image/jpeg;base64,${img}`}/>
      </div>
    </div>
  );
}

export default Avatar;