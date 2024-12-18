import React, { useState, useEffect } from "react";
import Search from "./Search";
import { titleCTPT } from "../../ultils/constants";
import ProviderBtn from "./ProviderBtn";
import ListPostCategory from "./ListPostCategory";
import Info from "./Info";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatVietNamtoString } from "../../ultils/constants";
//style
import classNames from "classnames/bind";
import styles from "./NCT.module.scss";
const cx = classNames.bind(styles);

const CTPT = () => {
  const location = useLocation();
  const categories = useSelector((state) => state.app.category);
  const [categorycode, setCategoryCode] = useState("none");
  useEffect(() => {
    let category = categories?.find(
      (item) => `/${formatVietNamtoString(item.value)}` === location.pathname
    );
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location]);
  return (
    <div className={cx("container")}>
      <Search />
      <div className={cx("title")}>
        <h1 style={{ color: "#000", fontSize: "30px", marginTop: "20px" }}>
          {titleCTPT.HOME_TITLE}
        </h1>
        <p>{titleCTPT.SUB_TITLE}</p>
      </div>
      <ProviderBtn />
      <ListPostCategory categorycode={categorycode} />
      <Info />
    </div>
  );
};

export default CTPT;
