import {
  Categories,
  ChoosePage,
  Home,
  LastBooks,
  Login,
  Profile,
  Converter,
  BookPage,
  SearchPage,
  FavouriteBooks,
  ListBooks
} from "../src/pages";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import RequireAuth from "./RequireAuth";
import Page from "./layouts/Page/Page"
// import RedirectToSearchPage from "./components/Redirect/RedirectToSearchPage";
// import * as firebase from "firebase";
// import StateContextProvider from './components/Context/StateContext'

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Page />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="last-books" element={<LastBooks />} />
        <Route path="/book/:id"  element={<BookPage />}/>
        <Route path="search-page" element={<SearchPage />} />
        <Route path="favourite-books" element={<FavouriteBooks />} />
        <Route path="list-books" element={<ListBooks />} />
        {/* <Route path="/q=:value" element={<RedirectToSearchPage />}/> */}
      </Route>
      
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/converter" element={<Converter />} />
      <Route path="/choose-page" element={<ChoosePage />} />
    </Routes>
  );
}

export default App;
