// import { Header, Sidebar } from "../index.js";
import Header from "../Header/Header";
import Sidebar  from '../Sidebar/Sidebar';
import { Outlet } from "react-router-dom";

function Page() {

  return (
    <>
      <Header />
      <Sidebar />
      {/* <div style={{display: "flex"}}> */}
        <Outlet />
        {/* {friendsListVisible && <FriendList />} */}
      {/* </div> */}
      
    </>
  );
}

export default Page;
