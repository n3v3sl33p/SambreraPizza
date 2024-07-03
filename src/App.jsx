import "./scss/app.scss";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content"></div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
