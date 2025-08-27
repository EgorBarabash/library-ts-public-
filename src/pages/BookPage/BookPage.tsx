import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './BookPage.module.scss'
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import  { Rating }  from "../../components";


//TODO: add epub install with converter

function BookPage() {
  const { id } = useParams();
  
//   console.log(id);
    const theme = useSelector((state: RootState) => state.login.darkTheme)
  const [book, setBook] = useState<any[]>([]);
  const navigate = useNavigate()
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const rating: number[] = [];
  const format = book.format

  for (let i = 0; i < 5; i++) {
    if (i < book.rating) {
      rating.push(1);
    } else {
      rating.push(0);
    }
  }

  const r = rating.map((y, i) => {
    return <Rating key={i} r={y} i={i} bookId={id} theme={theme} click={false}/>;
  });
  useEffect(() => {
    async function fetchData() {
      // console.log('aaaa');

      const res = await fetch("/api/book-page", {
        method: "POST",
        body: JSON.stringify(id),
      });
      const book = await res.json();
      setBook(book[1]);
    }
    fetchData();
  }, []);
  console.log(book);

  return (
    <div className={!theme ? styles.main : styles.mainDark}>
    <div>
        <button onClick={() => navigate(from, { replace: true })} className={styles.back}>back</button>
    </div>
    <h2 className={styles.name}>{ book.name}</h2>
    <div className={styles.author}>
            {book.author?.first_name} {book.author?.middle_name ? book.author.middle_name : ''} {book.author?.last_name}
    </div>
    {book.rating && (<div className={styles.rating}>
      Rating: {r}
    </div>)}
     <div className={styles.download}>
        <img height='80%' src={`data:image/jpeg;base64, ${book.img}`} alt={book.name} />
        <div>Download Book:</div>
        {format === 'fb2' && (
          <>
            <a href={`/api/book/${book.id}`}>Fb2</a>
            <a href="#">epub(beta)</a>
          </>
        )} 
        {format === 'epub' && (
          <>
            <a href="#">epub</a>
          </>
        )} 
        
        
     </div>
     <div className={styles.description}>
        <div>Description: {book.description ? book.description : 'No description'}</div>
     </div>
    </div>
  );
}

export default BookPage;
