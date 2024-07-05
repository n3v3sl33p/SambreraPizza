import React from "react";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Sort from "../components/Sort";
import axios from "axios";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";

const sorts = ["rating", "price", "title"];

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { searchValue } = React.useContext(SearchContext);

  const filterIndex = useSelector((state) => state.filter.index);
  const sortIndex = useSelector((state) => state.sort.index);
  const direction = useSelector((state) => state.sort.direction);

  const url = new URL("https://6682f2364102471fa4c8bd7a.mockapi.io/items");

  url.searchParams.append("sortBy", sorts[sortIndex]);
  url.searchParams.append("order", direction ? "desc" : "asc");
  if (filterIndex) {
    url.searchParams.append("category", filterIndex);
  }

  React.useEffect(() => {
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
    fetchPizzas();
  }, [sortIndex, filterIndex, direction]);

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
    </div>
  );
}

export default Home;
