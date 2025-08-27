import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "./store";

interface IProps<T> {
  children: T
}


function RequireAuth<T extends IProps<any>>(props: T) {
  const auth = useSelector((state: RootState) => state.login);
  const location = useLocation();

  function getCookie(name: string) {
    if(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    return 
    
  }

  if (!getCookie('user') && !auth.isAuth) {
    return (
      // <></>
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }


  return props.children;
}

export default RequireAuth;
