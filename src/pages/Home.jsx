import React from "react";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Sort from "../components/Sort";

import axios from "axios";
function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get(
          "https://6682f2364102471fa4c8bd7a.mockapi.io/items"
        );
        setPizzas(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPizzas();
  }, []);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
