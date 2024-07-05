import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home.jsx";
import Sort from "./components/Sort.jsx";
import Cart from "./pages/Cart.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "cart", element: <Cart /> },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  { path: "aboba", element: <Sort /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
