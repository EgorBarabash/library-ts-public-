import graystar from "../../assets/graystar.png";
import start from "../../assets/start.png";
// import { Button } from "@/components";
import styles from "./Rating.module.scss";

interface IProps {
  r: number;
  i: number;
  bookId: string;
  theme: boolean;
  click: boolean;
}

//TODO: добавить в бз к каждой книге количество оцениваний и средний показатель и на основе этого показывать рейтинг как тто так.

function Rating({ r, i, bookId, theme, click }: IProps) {

  
  return (
    <>
      {click &&(<button onClick={changeRating} className={!theme ? styles.starBtn : styles.starDarkBtn}>
        <img
          key={i + 5}
          id={String(i + 1)}
          height="100%"
          src={r === 1 ? start : graystar}
          alt={r === 1 ? "Filled Star" : "Empty Star"}
        />
      </button>)}
      {!click && (
        <div className={!theme ? styles.star : styles.starDark}>
          <img
          key={i + 5}
          id={String(i + 1)}
          height="100%"
          src={r === 1 ? start : graystar}
          alt={r === 1 ? "Filled Star" : "Empty Star"}
      />
      </div>
      )}
    </>
  );

  async function changeRating() {
    
    const resp = await fetch(
      `/api/change-rating`,
      {
        method: "POST",
        // body: JSON.stringify({ rating: i + 1 }),
        body: JSON.stringify({ rating: i + 1, id: bookId }),
      }
    );
  };
}

export default Rating;