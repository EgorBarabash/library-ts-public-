import icon from "../../assets/icon.png";
// import { Button } from "@/components";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Sidebar() {
  const theme = useSelector((state: RootState) => state.login.darkTheme)


  return (
    <div className={!theme ? styles.sidebar : styles.sidebarDark}>
      <div className={styles.navPanel}>
        <div className={styles.title}>Browse</div>
        <NavLink to="/" className={styles.btn}>
          <div className={styles.btnContent}>
            <div className={styles.sideImg}>
              <img height="100%" src={icon} />
            </div>
            <div className={styles.btnText}>Home</div>
          </div>
        </NavLink>
        <NavLink to="/last-books" className={styles.btn}>
          <div className={styles.btnContent}>
            <div className={styles.sideImg}>
              <img height="100%" src={icon} />
            </div>
            <div className={styles.btnText}>Last books</div>
          </div>
        </NavLink>
        <NavLink to="/categories" className={styles.btn}>
          <div className={styles.btnContent}>
            <div className={styles.sideImg}>
              <img height="100%" src={icon} />
            </div>
            <div className={styles.btnText}>Categories</div>
          </div>
        </NavLink>
      </div>
      <div className={styles.navPanel}>
        <div className={styles.title}>Your Books</div>
        <NavLink to="/list-books" className={styles.btn}>
          <div className={styles.btnContent}>
            <div className={styles.sideImg}>
              <img height="100%" src={icon} />
            </div>
            <div className={styles.btnText}>Books list</div>
          </div>
        </NavLink>
        <NavLink to="/favourite-books" className={styles.btn}>
          <div className={styles.btnContent}>
            <div className={styles.sideImg}>
              <img height="100%" src={icon} />
            </div>
            <div className={styles.btnText}>Favourite books</div>
          </div>
        </NavLink>
        <NavLink to="/home/history" className={styles.btn}>
          <div className={styles.btnContent}>
            <div className={styles.sideImg}>
              <img height="100%" src={icon} />
            </div>
            <div className={styles.btnText}>History</div>
          </div>
        </NavLink>
      </div>
      <div className={styles.navPanel}>
      <div className={styles.title}>Converter</div>
        <NavLink to="/converter" className={styles.btn}>
            <div className={styles.btnContent}>
              <div className={styles.sideImg}>
                <img height="100%" src={icon} />
              </div>
              <div className={styles.btnText}>Converter</div>
            </div>
          </NavLink>
      </div>
      <div className={styles.navPanel}>
        <div className={styles.title}>Shelves</div>
        <NavLink to="/home/your-shelves" className={styles.btn}>
          <div className={styles.btnContent}>
            <div className={styles.sideImg}>
              <img height="100%" src={icon} />
            </div>
            <div className={styles.btnText}>Your Shelves</div>
          </div>
        </NavLink>
        <button
          onClick={() => {
            ("created");
          }}
          className={styles.btnCreate}
        >
          Create a Shelf
        </button>
        
      </div>
      
    </div>
  );

  function btnCLick() {
    console.log("clicked");
  }
}

export default Sidebar;
