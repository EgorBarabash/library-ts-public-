import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from './Profile.module.scss'
import Loader from "../../components/Loader/Loader";
// import avatar from '../../assets/base64img/avatar.js'
import avatar from '../../assets/base64img/avatar.js'
import edit from '../../assets/edit.png'
import ChangeTheme from "../../components/ChangeTheme/ChangeTheme";

function Profile() {
  const theme = useSelector((state: any) => state.login.darkTheme);
  const {email, id, ...loginData} = useSelector((state: any) => state.login);
  const [loader, setLoader] = useState<any>(true);
  const noInfoObj: object = {name: '---', surname: '---', img: avatar, age: '---'};
  const [userData, setUserData] = useState<any>('');
  const [userInfo, setUserInfo] = useState<any>(noInfoObj);
  const [editField,setEditField] = useState<any>({name: false, surname: false, age: false});
  const nameRef = useRef()
  const surnameRef = useRef()
  const ageRef = useRef()

  console.log(userInfo);
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/user-data", {
        method: "POST",
        body: JSON.stringify({
          uid: id
        })
      });
      const data = await res.json();

      setUserData(data)
      if(data.userInfo) {
        setUserInfo(data.userInfo)
      }
      setLoader(false)
     
    }
    fetchData();

  }, []);
  // console.log(userData);
  

  return (
    <div className={styles.size}>
    {loader && (<Loader/>)}
    {!loader && (
      <div className={!theme ? styles.profilePage : styles.profilePageDark}>
       
        <div className={!theme ? styles.profileCart : styles.profileCartDark}>
          <main>  
          <div className={!theme ? styles.imagePart : styles.imagePartDark}>  
            <div>
              
                <div className={styles.image}>
                  <img className={styles.img} src={userInfo.img == undefined || '' ? `data:image/jpeg;base64,${avatar}` : `data:image/jpeg;base64, ${userInfo.img}`}/>
                </div>
                <div className={styles.changeImg}>
                  <button onClick={changePhoto} className={styles.button}>Change photo</button>
                </div>
           </div>
            
          </div>
          <div className={!theme ? styles.userInfo:  styles.userInfoDark}> 
            <div className={styles.title}>
              <h1>My profile</h1>
              <div><strong>{email}</strong></div>
            </div>
            <div>
              <div className={styles.info}>
                <div>
                  <p>Name</p>
                  {!editField.name && (<div className={styles.userData}>
                    {userInfo.name === '' ? '---' : userInfo.name}
                    <button onClick={editData} className={styles.edit}>
                        <img id='name' height="100%" src={edit}/>
                    </button>
                    </div>)}
                    {editField.name && (<div className={styles.userDataInput}>
                      <input ref={nameRef}  type="text" placeholder="Enter new name"/>
                      <button onClick={saveData} className={styles.edit}>
                        <img id='name' height="100%" src={edit}/>
                    </button>
                    </div>)}
                </div>
                <div>
                  <p>Surname</p>
                  {!editField.surname && (<div className={styles.userData}>
                    {userInfo.surname === '' ? '---' : userInfo.surname}
                    <button onClick={editData} className={styles.edit}>
                        <img id='surname' height="100%" src={edit}/>
                    </button>
                  </div>)}
                {editField.surname && (<div className={styles.userDataInput}>
                      <input ref={surnameRef}  type="text" placeholder="Enter new surname"/>
                      <button onClick={saveData} className={styles.edit}>
                        <img id='surname' height="100%" src={edit}/>
                    </button>
                    </div>)}
                    </div>
              </div>
              <div className={styles.info}>
                <div>
                  <p>Age</p>
                  {!editField.age && (<div className={styles.userData}>
                    {userInfo.age == '' ? '---' : userInfo.age}
                    <button onClick={editData} className={styles.edit}>
                          <img id="age" height="100%" src={edit}/>
                      </button>
                  </div>)}
                  {editField.age && (<div className={styles.userDataInput}>
                      <input ref={ageRef}  type="text" placeholder="Enter new age"/>
                      <button onClick={saveData} className={styles.edit}>
                        <img id='age' height="100%" src={edit}/>
                    </button>
                    </div>)}
                </div>
              </div>

            </div>
            
          </div>
          </main>
          <footer>
            <NavLink className={styles.back} to="/">back</NavLink>
            <ChangeTheme theme={theme} />
          </footer>
        </div>
        
      </div>
    )}
    </div>)
    function changePhoto() {
      console.log('beta');
      
    }
    function editData(e) {
      setEditField({...editField, [e.target.id]: true})
      
    }
    async function saveData(e) {
      const field = e.target.id
      let ref = getRef(field)
      
      console.log('saveData', field, ref?.current?.value);
      if(ref?.current?.value === '') {
        setUserInfo({...userInfo, [field]: userInfo[field]})
      } else {
        console.log('aaa');
        
        const resp = await fetch('/api/change-userData', {
          method: 'POST',
          body: JSON.stringify({
            uid: id,
            data: ref?.current?.value,
            field: field
          })
        })
        setUserInfo({...userInfo, [field]: ref?.current?.value})
        
      }

      setEditField({...editField, [field]: false})

     
    }
    function getRef(data) {
      switch (data) {
        case 'name':
          return nameRef
        case 'surname':
          return surnameRef
        case 'age':
          return ageRef
      }
    }
}

export default Profile;
