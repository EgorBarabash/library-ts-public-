import {useState, useEffect} from 'react'
import { Book } from "../../components";
import styles from "./Home.module.scss";
import { useMounted } from "../../hooks";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader/Loader';

function Home() {

  const [booksList, setBooksList] =  useState<any[]>([]); 
  const [loader, setLoader] = useState<any>(true);
  const theme = useSelector((state: RootState) => state.login.darkTheme)
  let bookNull = 0
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/books");
      const books = await res.json();
      
      setBooksList(books);
      setLoader(false)
     
    }
    fetchData();

  }, [bookNull]);

  const books = booksList.map((x) => {
    return <Book key={x[0]} data={x[1]} id={x[0]} theme={theme}/>;
  });

  return (
    <>
      {loader && (<Loader/>)}
      {!loader && (
        <div className={!theme ? styles.main : styles.mainDark}>
        <h1>Home</h1>
        <div className={styles.mainContent}>{books}</div>
      </div>)}
    </>
  );
  // const [booksList, setBooksList] = useState([]);
  // const mountedRef = useMounted()

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("/api/books");
  //       const books = await res.json();

  //       console.log(books);
  //       if (mountedRef.current) {
  //         setBooksList(books);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // const books = bookslist.map((x) => {
  //   return Book({ x });
  // });

  // return (
  //   <div className={styles.main}>
  //     <h1>Last books</h1>
  //     <div className={styles.mainContent}>{books}</div>
  //   </div>
  // );
}

export default Home;
