import { configureStore } from "@reduxjs/toolkit";
// import friendReducer from "./friend-slice";
// import bookReducer from "./book-slice";
import loginReducer from "./login-slice";
import searchReducer from "./search-slice";

const store = configureStore({
  reducer: {
    // book: bookReducer,
    // friend: friendReducer,
    login: loginReducer,
    search: searchReducer
  },
});

// export const friendsAction = friendsActions
// export const bookAction = bookActions
export type RootState = ReturnType<typeof store.getState>
export default store;
