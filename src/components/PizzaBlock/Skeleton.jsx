import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={268}
    height={466}
    viewBox="0 0 268 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="275" rx="5" ry="5" width="268" height="15" />
    <rect x="0" y="309" rx="10" ry="10" width="268" height="88" />
    <rect x="0" y="419" rx="10" ry="10" width="91" height="27" />
    <rect x="114" y="410" rx="10" ry="10" width="150" height="45" />
    <rect x="160" y="445" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
);

export default Skeleton;
