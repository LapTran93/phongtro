import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import * as actions from "../../store/actions";
const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
