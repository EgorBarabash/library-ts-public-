import { useSelector } from "react-redux";
import { RootState } from "../../store/index.js";
import Friend from "./Friend.jsx";

function FriendList() {
  // const friends = useSelector((state: RootState) => state.friend.items);
  // const friend = friends.map((x) => {
  //   return Friend({ x });
  // });

  return (
    <div style={{backgroundColor: '#F2F3F4'}}>
      <div>YOUR FRIENDS</div>
      {/* {friend} */}
    </div>
  );
}

export default FriendList;
