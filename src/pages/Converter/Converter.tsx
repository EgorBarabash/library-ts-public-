import styles from './Converter.module.scss'
import {useState} from 'react'
import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Converter() {

  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  return (
    <>
      <button onClick={() => navigate(from, { replace: true })} className={styles.back}>back</button>
      
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.converterName}>
              Converter
            </div>
            <div className={styles.converterType}>
              fb2 to epub
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.loadFile}>
              <div className={styles.loadFileText}>Load fb2 file or zip</div>
              {!loaded &&( <button onClick={log} className={styles.loadFileBtn}>load file</button>)}
              {loaded &&( <button onClick={log} className={styles.loadFileBtn}>Convert</button>)}

            </div>
          </div>
          <div className={styles.footer}>

          </div>
        </div>
      </div>
    </>
  )

  function log() {
    setLoaded(!loaded)
    console.log('hello world')
  }
}

export default Converter