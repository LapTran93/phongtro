import React from "react";
import { img } from "../../assets";
//style
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("profile")}>
        <h1>Về phongtro123.com</h1>
        <p>Copyright © 2024 phongtro123.com</p>
        <p>
          CSKH: 0839202123 <br /> Email: phongtro123123@gmail.com
        </p>
        <p>
          02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, Phường An
          Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam
        </p>
        <p>
          Giấy phép đăng ký kinh doanh số 0313588502 do Sở kế hoạch và Đầu tư
          thành phố Hồ Chí Minh cấp ngày 24/12/2015.
        </p>
        <div className={cx("img")}>
          <img className={cx("img-bct")} src={img.bocongthuong} />
          <img className={cx("img-dmca")} src={img.dmca} />
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("content-row")}>
          <h1>Hỗ trợ khách hàng</h1>
          <ul>
            <li>Câu hỏi thường gặp</li>
            <li>Hướng dẫn đăng tin</li>
            <li>Bảng giá dịch vụ</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className={cx("content-row")}>
          <h1>Phương thức thanh toán</h1>
          <img className={cx("img-pay")} src={img.pay} />
        </div>
        <div className={cx("content-row")}>
          <h1>Theo dõi chúng tôi</h1>
          <img className={cx("img-pay")} src={img.contact} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
