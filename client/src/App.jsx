import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./actions/actionUser";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user ? dispatch(setUser(user)) : "";
  }, []);
  return <RouterProvider router={router}></RouterProvider>;
}
