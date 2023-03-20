import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/root";
import Login from "./components/login";
import Register from "./components/register";
import Book from "./components/book";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Root />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="book" element={<Book />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
