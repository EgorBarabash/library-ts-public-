import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string | null;
  token: string | null;
  id: string | null;
  isAuth: boolean;
}

interface LoginState extends User {
  darkTheme: boolean;
}

const initialLoginState: LoginState = { email: null, token: null, id: null, isAuth: false, darkTheme: false };

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const { email, token, id, isAuth } = action.payload;
      state.email = email;
      state.token = token;
      state.id = id;
      state.isAuth = isAuth;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isAuth = false;
    },
    setUserTheme(state) {
      state.darkTheme = !state.darkTheme;
    }
  },
});


export const loginActions = loginSlice.actions;
export default loginSlice.reducer;