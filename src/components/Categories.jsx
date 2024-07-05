import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../redux/Slices/filterSlice";
const categoriesList = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories = () => {
  const filterIndex = useSelector((state) => state.filter.index);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item, index) => (
          <li
            className={filterIndex === index ? "active" : " "}
            key={index}
            onClick={() => dispatch(changeCategory(index))}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
