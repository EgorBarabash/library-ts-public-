import logo from "../../assets/logo.png";
// import { Button } from "@/components";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler } from 'react-hook-form';

interface FormData {
  my_email: string;
  my_password: string;
  checkbox: boolean;
}

const schema = z.object({
  my_email: z.string().email(),
  my_password: z.string().min(6, "invalid password"),
  checkbox: z.boolean()
})

function Login() {
  const { register,  formState: { errors }, handleSubmit} =useForm<FormData>({resolver: zodResolver(schema)});
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatchFunction = useDispatch();
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  // const login = useSelector((state) => state.login.auth)
  // const history = useHistory()

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";


  const loginHandler: SubmitHandler<any> = async (values) => {

    // console.log('loginHandler', values);

    const resp = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username:  values.my_email,
        password:  values.my_password,
      }),
    });
    const auth = await resp.json();

    if (auth.isAuth) {
      if(values.checkbox) {
        document.cookie = `user=${values.email}; expires=` + new Date(Date.now() + 86400e3).toUTCString();
      }
      
      dispatchFunction(loginActions.setUser(auth));
      navigate(from, { replace: true });
    } else {
      setIsMessageVisible(true);
    }
  }
  // console.log('schhema', schema.safeParse(obj));
  return (
    <form onSubmit={handleSubmit(loginHandler)} className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.logo}>
            <img height="100%" src={logo} />
          </div>
          <h1 className={styles.text}>Welcome Back</h1>
          <label>Email Adress</label>
          <div className={styles.email}>
            <input
              className={styles.emailInput}
              // {...register("email", {required: "Email Address is required", pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email"}})}
              {...register("my_email")}
            />
          </div>
          {Boolean(errors?.email) && <div className={styles.invalidInput}>{errors?.email?.message}</div>}
          <label>Password</label>
          <div className={styles.password}>
            <input
              className={styles.passwordInput}
              // {...register("password", {required: "Password is required", minLength: {value: 6, message: "Password must be at least 6 characters"}})}
              {...register("my_password")}
              type="password"
              // placeholder="password"
            />             
          </div>
          {Boolean(errors?.password) && <div className={styles.invalidInput}>{errors?.password?.message}</div>}
          <div className={styles.loginBtns}>
            <div className={styles.loggedBtn}>
              <input type="checkbox"
               {...register("checkbox")} 
               className={styles.radioBtn} />
              <div>Keep in logged in</div>
            </div>
            <div className={styles.forgotPassword}>
              <p>Forgot your password?</p>
            </div>
          </div>
          {isMessageVisible && <div>Неправильный логин или пароль</div>}
          <button
            className={styles.btn}
            type="submit"
          >
            Login
          </button>
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </form>
  );
  
}

export default Login;
