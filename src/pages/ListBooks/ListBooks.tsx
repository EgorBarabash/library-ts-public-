import {useState, useEffect} from 'react'
import { Book } from "../../components";
import styles from "./ListBooks.module.scss";
import { useMounted } from "../../hooks";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader/Loader';

function ListBooks() {
  const [booksList, setBooksList] =  useState<any[]>([]); 
  const [loader, setLoader] = useState<any>(true);
  const theme = useSelector((state: RootState) => state.login.darkTheme)
  const uid = useSelector((state: RootState) => state.login.id)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/book-list", {
        method: "POST",
        body: JSON.stringify({
          uid: uid
        })
      });
      const books = await res.json();
      
      
      
      setBooksList(books);
      setLoader(false)
     
    }
    fetchData();

  }, []);

  const books = booksList.map((x) => {
    return <Book key={x[0]} data={x[1]} id={x[0]} theme={theme}/>;
  });

  return (
    <>
      {loader && (<Loader/>)}
      {!loader && (
        <div className={!theme ? styles.main : styles.mainDark}>
        <h1>Your books list</h1>
        <div className={styles.mainContent}>{books}</div>
      </div>)}
    </>
  );
}

export default ListBooks