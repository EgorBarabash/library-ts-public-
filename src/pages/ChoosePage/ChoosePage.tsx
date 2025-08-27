import cross from "../../assets/cross.png";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ChoosePage.module.scss";

function ChoosePage() {
  // const dispatchFunction = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  return (
    <div className={styles.choosePage}>
      <div className={styles.title}>
        <div></div>
        <div className={styles.titleText}>Choose Page</div>
        <button
          onClick={() => navigate(from, { replace: true })}
          className={styles.cross}
        >
          <img height="50%" src={cross} />
        </button>
      </div>
      <div className={styles.navBar}>
        {/* <NavLink to='/' className={styles.btn}>
                    <div className={styles.btnContent}>
                        <div className={styles.sideImg}>
                            <img height='100%' src={icon}/>
                        </div>
                        <div className={styles.btnText}>Top Books</div>
                    </div>
                </NavLink> */}
        <button onClick={navigateToHome} className={styles.btn}>
          <div className={styles.navBtn}>Home</div>
        </button>
        <button onClick={navigateToCategories} className={styles.btn}>
          <div className={styles.navBtn}>Categories</div>
        </button>
        <button onClick={navigateToLastBooks} className={styles.btn}>
          <div className={styles.navBtn}>Last Books</div>
        </button>
      </div>
    </div>
  );
  function navigateToHome() {   
    navigate("/", { replace: true });
  }
  function navigateToCategories() {
    navigate("/categories", { replace: true });
  }
  function navigateToLastBooks() {
    navigate("/last-books", { replace: true });
  }
}
export default ChoosePage;
