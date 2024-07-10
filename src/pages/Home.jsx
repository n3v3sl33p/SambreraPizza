import React from "react";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Sort from "../components/Sort";
import axios from "axios";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import { changePage } from "../redux/Slices/paginationSlice";
import { changeCategory } from "../redux/Slices/filterSlice";
import { changeSort, setDirection } from "../redux/Slices/sortSlice";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

const sorts = ["rating", "price", "title"];
const itemOnPage = 4;

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);

  const filterIndex = useSelector((state) => state.filter.index);
  const sortIndex = useSelector((state) => state.sort.index);
  const direction = useSelector((state) => state.sort.direction);
  const currentPage = useSelector((state) => state.pagination.page);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = new URL("https://6682f2364102471fa4c8bd7a.mockapi.io/items");

  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      console.log("первый рендер + парсинг", params);
      dispatch(changeCategory(params.filterIndex));
      dispatch(setDirection(params.direction));
      dispatch(changePage(params.currentPage));
      dispatch(changeSort(params.sortIndex));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    url.searchParams.append("page", currentPage);
    url.searchParams.append("limit", itemOnPage);
    url.searchParams.append("sortBy", sorts[sortIndex]);
    url.searchParams.append("order", direction ? "desc" : "asc");
    if (filterIndex) {
      url.searchParams.append("category", filterIndex);
    }
    const fetchPizzas = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        setPizzas(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("fetch");
    if (!isSearch.current) {
      fetchPizzas();
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
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas
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
