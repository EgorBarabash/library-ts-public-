import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import { UseSelector } from "react-redux";
import sun1 from '../../assets/sun-sunrise-svgrepo-com.svg'
import sun2 from '../../assets/earth-moon-svgrepo-com.svg'
import moon1 from '../../assets/moon-full-moon-svgrepo-com.svg'
import moon2 from '../../assets/moon-svgrepo-com.svg'
import styles from './ChangeTheme.module.scss'

interface IProps {
    theme: boolean;
}

function ChangeTheme({theme} : IProps) {
    const dispatchFunction = useDispatch();
    
    return (
        <button onClick={() => dispatchFunction(loginActions.setUserTheme())} className={!theme ? styles.theme: styles.themeDark}>
            <img height='100%' src={!theme ? sun2 : moon1} />
        </button>
    )
}

export default ChangeTheme