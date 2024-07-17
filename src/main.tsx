import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/index";
import Home from "./pages/Home.tsx";
import Sort from "./components/Sort.tsx";
import Cart from "./pages/Cart";
import { store } from "./redux/store";
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
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
