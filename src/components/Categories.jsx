import React from "react";
const categoriesList = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item, index) => (
          <li
            className={activeIndex === index ? "active" : " "}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
