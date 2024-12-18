import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
//style
import classNames from "classnames/bind";
import styles from "./ItemSlidebar.module.scss";
const cx = classNames.bind(styles);
const ItemSlidebar = ({ title, text }) => {
  return (
    <div className={cx("container")}>
      <h3>{title}</h3>
      <div className={cx("list-price")}>
        <div>
          <p className={cx("text-price")}>
            <FontAwesomeIcon className={cx("icon")} icon={faAngleRight} />
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemSlidebar);
