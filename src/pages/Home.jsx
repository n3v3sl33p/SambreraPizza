import React from "react";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Sort from "../components/Sort";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { changePage } from "../redux/Slices/paginationSlice";
import { changeCategory } from "../redux/Slices/filterSlice";
import { changeSort, setDirection } from "../redux/Slices/sortSlice";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/Slices/pizzasSlice";

import ErrorPage from "./ErrorPage";

const itemOnPage = 4;

function Home() {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);
  const { items, status } = useSelector((state) => state.pizzas);
  const filterIndex = useSelector((state) => state.filter.index);
  const sortIndex = useSelector((state) => state.sort.index);
  const direction = useSelector((state) => state.sort.direction);
  const currentPage = useSelector((state) => state.pagination.page);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      dispatch(changeCategory(params.filterIndex));
      dispatch(setDirection(params.direction));
      dispatch(changePage(params.currentPage));
      dispatch(changeSort(params.sortIndex));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      console.log("вызов");
      dispatch(fetchPizzas({ currentPage, sortIndex, direction, filterIndex }));
    }
    isSearch.current = false;
  }, [sortIndex, filterIndex, direction, currentPage]);

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
