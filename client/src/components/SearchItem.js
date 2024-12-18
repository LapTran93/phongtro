import React from "react";
import classNames from "classnames/bind";
import styles from "./SearchItem.module.scss";

const cx = classNames.bind(styles);

const SearchItem = ({ IconBefore, IconAfter, text, onClick }) => {
  return (
    <div className={cx("search-option")} onClick={onClick}>
      <div className={cx("search-text")}>
        {IconBefore}
        <span>{text}</span>
      </div>
      {IconAfter}
    </div>
  );
};

export default SearchItem;
