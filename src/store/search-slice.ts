import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Search {
  value: string;
}

interface SearchState extends Search {

}

const initialSearchState: SearchState = { value: '' };

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setSearch(state, action: PayloadAction<Search>) {
      state.value = action.payload;
    },
  },
});


export const searchActions = searchSlice.actions;
export default searchSlice.reducer;