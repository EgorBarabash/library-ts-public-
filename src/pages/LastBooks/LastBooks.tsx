import { Book } from "../../components";
import { useEffect, useState } from "react";
import styles from "./LastBooks.module.scss";
import { useMounted } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function LastBooks() {
  const [lastBooks, setLastBooks] =  useState<any[]>([]); 
  const mountedRef = useMounted()
  const theme = useSelector((state: RootState) => state.login.darkTheme)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/last-books");
        const filteredBooks = await res.json();

        console.log(filteredBooks);
        if (mountedRef.current) {
          setLastBooks(filteredBooks);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  const books = lastBooks.map((x) => {
    return <Book key={x[0]} data={x[1]} id={x[0]} theme={theme}/>;
  });

  return (
    <div className={!theme ? styles.main : styles.mainDark}>
      <h1>Last books</h1>
      <div className={styles.mainContent}>{books}</div>
    </div>
  );
}

export default LastBooks;
