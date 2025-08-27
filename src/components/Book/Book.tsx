import Rating  from "../Rating/Rating";
import styles from "./Book.module.scss";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import bookmark from '../../assets/bookmark.png'
import like from '../../assets/like.png'
import menu from '../../assets/three-dots.png'
import bookmarkDark from '../../assets/bookmarkDark.png'
import likeDark from '../../assets/likeDark.png'
import menuDark from '../../assets/three-dotsDark.png'
import { RootState } from "../../store";

interface Author {
  first_name: string;
  last_name: string;
}

interface BookData {
  id: string;
  name: string;
  img: string;
  author: Author;
  rating: number;
}

interface IProps {
  data: BookData;
  id: string;
  theme: boolean;
}

function Book({ data, id, theme }: IProps) {
  const rating: number[] = [];
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [clickedMenu, setClickedMenu] = useState(false);
  const [clickedLike, setClickedLike] = useState(false);
  const [clickedBookmark, setClickedBookmark] = useState(false);
  const [messageF, setMessageF] = useState(false);
  const [messageB, setMessageB] = useState(false);
  const uid =  useSelector((state: RootState) => state.login.id);

  useEffect(() => {
    if (messageF) {
      const timer = setTimeout(() => {
        setMessageF(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (messageB) {
      const timer = setTimeout(() => {
        setMessageB(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messageF, messageB]);


  for (let i = 0; i < 5; i++) {
    if (i < data.rating) {
      rating.push(1);
    } else {
      rating.push(0);
    }
  }

  const r = rating.map((y, i) => {
    return <Rating key={i} r={y} i={i} bookId={id} theme={theme} click={true}/>;
  });
  
  return (
   
    <div className={!theme ? styles.book : styles.bookDark} >
        {/* <button className={styles.cardImg}> */}
          {/* <div></div> */}
        {/* <a href={`/api/book/${data.id}`} className={styles.cardImg}> */}
       
        <NavLink to={`/book/${id}`} className={styles.cardImg}>
          <img src={`data:image/jpeg;base64, ${data.img}`} alt={data.name} />
        </NavLink>
        {/* </button> */}
        {/* </a> */}
        <div className={styles.cardContent}>
          <div className={styles.title}>{data.name}</div>
          <div className={styles.autor}>
            {data.author.first_name} {data.author.last_name}
          </div>
          <div className={styles.ratingBar}>
            <div className={styles.rating}>{r}</div>
            <div className={!clickedMenu ? styles.bookMenu : styles.bookMenuClicked} onClick={!clickedMenu ? handleBookMenuClick : () => {return}}>
              {!isVisibleMenu && (
                <>
                <img height={!theme ? '50%' : '100%'}    src={!theme ? menu : menuDark} />
                </>
              )}
              {isVisibleMenu && (
                <>
                  <div className={styles.menuContent} onClick={addFavouriteBook}>
                    {/* aa */}
                    <img height='100%' src={!theme ? like : likeDark}/>
                  </div>
                  {messageF && <div className={styles.message}>Element clicked</div>}
                  <div className={styles.menuContent} onClick={addBookmark}>
                    {/* bb */}
                    <img height='100%' src={!theme ? bookmark : bookmarkDark}/>
                  </div>
                  {messageB && <div className={styles.message}>Element clicked</div>}
                  
                  <div className={styles.menuContent} onClick={handleBookMenuClick}>
                    {/* bb */}
                    <img height={!theme ? '50%' : '100%'} src={!theme ? menu : menuDark}/>
                  </div>
              </>
              
              )}
            </div>
          </div>
         
         
        </div>
      {/* </button> */}
    </div>
    // </NavLink>
  );

  function handleBookMenuClick() {
    setClickedMenu(!clickedMenu);
    
    setIsVisibleMenu(!isVisibleMenu);
    
    
    
  }
  async function addFavouriteBook() {
    if(clickedLike) {
      setMessageF(true);
      return

    }
    setClickedLike(true);
    
    console.log('add');
    const resp = await fetch(
      `/api/add-favouritebook`,
      {
        method: "POST",
        // body: JSON.stringify({ rating: i + 1 }),
        body: JSON.stringify({ bookId:id, uid: uid}),
      }
    );
  }
  async function addBookmark() {
    if(clickedBookmark) {
      setMessageB(true);
      return
    }
    setClickedBookmark(true);
    const resp = await fetch(
      `/api/add-bookmark`,
      {
        method: "POST",
        // body: JSON.stringify({ rating: i + 1 }),
        body: JSON.stringify({ bookId:id, uid:uid}),
      }
    );
    
  }
}

export default Book;