import styles from "./Search.module.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchActions } from "../../store/search-slice";
function Search <T>() {

  const searchRef = useRef(null)
  const navigate = useNavigate()
  const dispatchFunction = useDispatch();

  return (
    <div className={styles.search}>
      <input onChange={searchHandler} ref={searchRef} className={styles.searchInput} />
    </div>
  );

  function searchHandler() {
    // dispatchFunction(searchActions.setSearch(searchRef.current.value.toString()));
    navigate(`/search-page/?q=${searchRef.current.value}`, { replace: true })
  }
}

export default Search;
