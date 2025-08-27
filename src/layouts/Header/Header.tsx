import { Avatar, Notice, Search } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "./Logo";
// import { friendsActions } from "@/store/friend-slice.js";
import { loginActions } from "../../store/login-slice";
import ChangeTheme from "../../components/ChangeTheme/ChangeTheme";
import { RootState } from "../../store";
import defaultImg from '../../assets/base64img/avatar.js'
import { useState, useEffect } from "react";
// import {useStateContext} from "../Context/StateContext.jsx"

function Header() {
  const dispatchFunction = useDispatch();
  const theme = useSelector((state:RootState) => state.login.darkTheme);
  const {email, id} = useSelector((state:RootState) => state.login);
  const [img, setImg] = useState(defaultImg) 
  console.log(img);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/user-img", {
        method: "POST",
        body: JSON.stringify({
          uid: id
        })
      });
      const data = await res.json()
      if(data.img) {
        setImg(data.img)
      }
      
     
    }
    fetchData();

  }, []);

  function getCookie(name: string ) {
    if(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    return undefined
    
  }
  const navigate = useNavigate();
  return (
    <div className={!theme ? styles.header: styles.headerDark } id={!theme ? "light" : "dark"}>
      <div className={styles.headerLeft}>
        <Logo />
        <div className={styles.border}></div>
        <Search />
        <ChangeTheme bgc={'fff'} theme={theme}/>
      </div>
      <div className={styles.headerRight}>
        {/* <Button className={styles.btnHeader} onClick={() => {('aa')}}>Subscribe</Button> */}
        <NavLink to="/profile" className={styles.link} >
          <Avatar name={email} theme={theme} img={img} />
        </NavLink>
        <Notice />
        <button
          className={styles.btnFriendlist}
          onClick={changeIsVisibleHanlder}
        >
          <div className={styles.friendlist}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      {/* <div>Header</div> */}
    </div>
  );
  function changeIsVisibleHanlder() {
    navigate('/choose-page', { replace: true })
  }
}

export default Header;
