import React from "react";
import { locationbtn } from "../../ultils/constants";
import { LocationBtn } from "../../components";
import { Link } from "react-router-dom";
import { formatVietNamtoString } from "../../ultils/constants";
//style
import classNames from "classnames/bind";
import styles from "./Homepage.module.scss";
const cx = classNames.bind(styles);

const ProviderBtn = () => {
  return (
    <div className={cx("location")}>
      <h3>Khu vực nổi bật</h3>
      <div className={cx("btn-location")}>
        {locationbtn.map((item) => (
          <Link
            key={item.id}
            to={`/khu-vuc/${formatVietNamtoString(item.name)}`}
          >
            <LocationBtn img={item.img} name={item.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProviderBtn;
