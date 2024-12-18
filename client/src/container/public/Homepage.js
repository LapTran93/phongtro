import React from "react";
import Search from "./Search";
import { title } from "../../ultils/constants";
import ProviderBtn from "./ProviderBtn";
import ListPost from "./ListPost";
import Info from "./Info";
//style
import classNames from "classnames/bind";
import styles from "./Homepage.module.scss";
const cx = classNames.bind(styles);

const Homepage = () => {
  return (
    <div className={cx("container")}>
      <Search />
      <div className={cx("title")}>
        <h1 style={{ color: "#000", fontSize: "30px", marginTop: "20px" }}>
          {title.HOME_TITLE}
        </h1>
        <p>{title.SUB_TITLE}</p>
      </div>
      <ProviderBtn />
      <ListPost />
      <Info />
    </div>
  );
};

export default Homepage;
