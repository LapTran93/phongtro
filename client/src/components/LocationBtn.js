import React, { memo } from 'react'
//style
import classNames from "classnames/bind";
import styles from "./LocationBtn.module.scss";
const cx = classNames.bind(styles);
const LocationBtn = ({name, img}) => {
  return (
    <div className={cx("location")}>
        <img src= {img} alt={name}/>
        <div className={cx("text-location")}>{name}</div>
    </div>
  )
}

export default memo(LocationBtn)
