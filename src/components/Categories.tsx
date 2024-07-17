import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, SelectFilter } from "../redux/Slices/filterSlice";

const categoriesList = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories = () => {
  const filterIndex: number = useSelector(SelectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item, index: number) => (
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
