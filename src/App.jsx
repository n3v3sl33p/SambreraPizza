import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

export const SearchContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content"></div>

          <Outlet searchName={searchValue} />
        </div>
      </SearchContext.Provider>
    </>
  );
}

export default App;
