import React from 'react';
import { Book } from "../../components";
import { useEffect, useState } from "react";
import styles from "./Categories.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loader from "../../components/Loader/Loader";

function Categories() {
  const [genre, setGenre] = useState<string[]>(["child_adv"]);
  const [genreList, setGenreList] = useState<string[][]>([[]]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]); 
  const [genreBtnVisible, setGenreBtnFindVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState([]);
  const [loader, setLoader] = useState<any>(true);
  const [nothingFound, setNothingFound] = useState<boolean>(false);

  const theme = useSelector((state: RootState) => state.login.darkTheme);
  console.log('checked-1', checked);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(genre),
      });
      const arr = await res.json();
      console.log("arr", arr);
      setGenreList(arr.genreList);
      // setGenreList(['sf',          'det_classic',
      // 'det_classic', 'det_classic',
      // 'det_classic', 'det_classic',
      // 'detective',   'child_sf',
      // 'child_sf',    'child_sf',
      // 'child_sf',    'child_sf',
      // 'sf_fantasy',  'sf_fantasy'])

      if(arr.books.length === 0) {
        setNothingFound(true);
      } else {
        setNothingFound(false)
      }

      setFilteredBooks(arr.books);
      setLoader(false)
    }
    fetchData();
  }, [genre]);



  let arrGenres = genreList.map((x: string) => (
    <li key={x}>
      <button
        className={styles.genreBtn}
        onClick={() => setGenre(x.split(" "))}
      >
        {genresFn(x)}
      </button>
      <input type="checkbox" onChange={(e) => handleChange(e, x)}/>
    </li>
  ));

 

  const books = filteredBooks.map((x: any) => (
    <Book key={x[0]} data={x[1]} id={x[0]} theme={theme} />
  ));



  return (
    <>
     {loader && (<Loader/>)}
     {!loader && (
        <div className={!theme ? styles.main : styles.mainDark}>
        <h1>Categories</h1>
        {genreBtnVisible && (<div className={styles.btnFind}><button id='genre-btn' className={styles.genreBtnN} onClick={() => setGenreListFn()}>Find in selected categories</button></div>)}
        <ul className={styles.genres}>{arrGenres}</ul>
        <h2>{getAllGenresTitie()}</h2>
        {!nothingFound && (<div className={styles.mainContent}>{books}</div>)}
        {nothingFound && (<div className={styles.mainContent}>Nothing found</div>)}
      </div> 
     )}
    </>
     
  );


    function genresFn(genre: string) {
      if(genre === 'child_sf') {
        return 'Детская фантастика'
      }
      if(genre === 'det_classic') {
        return 'Классика'
      }
      if(genre === 'sf_fantasy') {
        return 'Научная фантастика'
      }
      if(genre === 'sf') {
        return 'Фантастика'
      }
      if(genre === 'detective') {
        return 'Детектив'
      } else {
        return genre
      }
    }
    function setGenreListFn() {
      let newGenreList: any[] = []
      checked.forEach((x) => {
        newGenreList.push(x.genre)
      })
      console.log('newGenreList', newGenreList, checked);
      
      setGenre(newGenreList)
      
    }

    function handleChange(e, x) {
      if (e.target.checked) {
        if (checked.length === 0) {
          setGenreBtnFindVisible(true);
        }
        setChecked([...checked, { checked: true, genre: x }]);
        
      } else {
        const newChecked = checked.filter((c) => c.genre !== x);
        setChecked(newChecked);
        if (newChecked.length === 0) {
          setGenreBtnFindVisible(false);
        }
      }
    }
    function getAllGenresTitie() {
      let arr = []
      for(let i = 0; i < genre.length; i++) {
        arr.push(genresFn(genre[i]));
      }
      if(genre.length > 2 ) {
        return arr.join(',')
      } else {
        return arr.join(' and ')
      }
      
    }
}

export default Categories;
