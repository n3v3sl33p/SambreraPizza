import React from "react";
import Categories from "../components/Categories.tsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index";
import Sort from "../components/Sort.jsx";
import { SearchContext, SearchContextType } from "../App.tsx";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import {
  changePage,
  SelectPagination,
} from "../redux/Slices/paginationSlice.ts";
import { changeCategory, SelectFilter } from "../redux/Slices/filterSlice.ts";
import {
  changeSort,
  SelectSort,
  setDirection,
} from "../redux/Slices/sortSlice.ts";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, SelectPizza } from "../redux/Slices/pizzasSlice.ts";
import ErrorPage from "./ErrorPage/index.tsx";
import { useAppDispatch } from "../redux/store.ts";

function Home() {
  const [flag, setFlag] = React.useState(0);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const itemOnPage = 4;
  const context = React.useContext<SearchContextType | null>(SearchContext);
  if (!context) {
    throw new Error("Search must be used within a SearchProvider");
  }

  const { searchValue } = context;
  const { items, status } = useSelector(SelectPizza);
  const filterIndex = useSelector(SelectFilter);
  const { sortIndex, direction } = useSelector(SelectSort);
  const currentPage = useSelector(SelectPagination);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        currentPage,
        sortIndex,
        direction,
        filterIndex,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [sortIndex, filterIndex, direction, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      setFlag(1);
      dispatch(changeCategory(Number(params.filterIndex)));
      dispatch(setDirection(Number(params.direction)));
      dispatch(changePage(Number(params.currentPage)));
      dispatch(changeSort(Number(params.sortIndex)));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas({ currentPage, sortIndex, direction, filterIndex }));
    }
    isSearch.current = false;
  }, [sortIndex, filterIndex, direction, currentPage, flag]);

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading"
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : items
              .filter((obj) =>
                obj.title
                  .toLocaleLowerCase()
                  .includes((searchValue || "").toLocaleLowerCase())
              )
              .map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
      <Pagination
        innerClass={"pagination"}
        pageRangeDisplayed={5}
        activePage={currentPage}
        totalItemsCount={10}
        itemsCountPerPage={itemOnPage}
        onChange={(page) => dispatch(changePage(page))}
        activeClass="active_page"
      />
    </div>
  );
}

export default Home;
