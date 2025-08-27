import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import styles from './SearchPage.module.scss'
import { Book } from '../../components';
import { useNavigate, useLocation, useParams,  } from 'react-router-dom';

function Search() {
    const theme = useSelector((state: RootState) => state.login.darkTheme)
    // const searchValue = useSelector((state: RootState) => state.search.value)
    const searchValue  = new URLSearchParams(useLocation().search).get('q');
    console.log('search', searchValue);
    
    const navigate = useNavigate()
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [booksList, setBooksList] =  useState<any[]>([]);

    useEffect(() => {
      async function fetchData() {
        const res = await fetch("/api/books-search", {
          method: "POST",
          body: JSON.stringify({
            searchValue: searchValue
          }),
        });
        const books = await res.json();
        
        setBooksList(books);
       
      }
      fetchData();
  
    }, [searchValue]);
    if(booksList.length === 0) {
      navigate(from, { replace: true });
    }
    

    
    const books =  booksList.map((x) => {
      return <Book key={x[0]} data={x[1]} id={x[0]} theme={theme}/>;
    });

    return (
        <div className={!theme ? styles.main : styles.mainDark}>
        <h1>Search Page</h1>
        <div className={styles.mainContent}>{books}</div>
      </div>
    )
}

export default Search