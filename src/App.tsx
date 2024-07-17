import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
export type SearchContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};
export const SearchContext = React.createContext<SearchContextType | null>(
  null
);

const App: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content"></div>

          <Outlet />
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default App;
