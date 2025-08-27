import styles from "./Notice.module.scss";
// import notice from '.././assets/notice-active-svgrepo-com.svg'
import notice from "./notice-active-svgrepo-com.svg";
import noticeDark from "../../assets/notification-bell-ecommerce-svgrepo-com.svg"
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Notice<T>() {
  const theme = useSelector((state: RootState) => state.login.darkTheme)

  return (
    <div className={styles.notice}>
      <img height="100%" src={!theme ? notice : noticeDark} />
    </div>
  );
}
export default Notice;
