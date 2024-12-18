import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components";

//style
import classNames from "classnames/bind";
import styles from "./Info.module.scss";
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("container")}>
      <h1>Tại sao lại chọn PhongTro123.com?</h1>
      <p>
        Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào
        là trang web đứng top google về các từ khóa: cho thuê phòng trọ, nhà
        trọ, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép, cho thuê
        mặt bằng...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với
        nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
      </p>
      <div className={cx("row-content")}>
        <div className={cx("box-content")}>
          <h4>130.000+</h4>
          <p>Chủ nhà & Môi giới</p>
        </div>
        <div className={cx("box-content")}>
          <h4>200.000+</h4>
          <p>Tin đăng</p>
        </div>
        <div className={cx("box-content")}>
          <h4>1.000+</h4>
          <p>Tin đăng/ngày</p>
        </div>
        <div className={cx("box-content")}>
          <h4>3.000.000+</h4>
          <p>Lượt xem/tháng</p>
        </div>
      </div>
      <div className={cx("box-section")}>
        <h4>Chi phí thấp, hiệu quả tối đa</h4>
        <div>
          <FontAwesomeIcon className={cx("icon-star")} icon={faStar} />
          <FontAwesomeIcon className={cx("icon-star")} icon={faStar} />
          <FontAwesomeIcon className={cx("icon-star")} icon={faStar} />
          <FontAwesomeIcon className={cx("icon-star")} icon={faStar} />
          <FontAwesomeIcon className={cx("icon-star")} icon={faStar} />
        </div>
        <p>
          Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
          chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và
          đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết
          website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả
          khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống
          kéo dài
        </p>
        <h4>Bạn đang có phòng trọ / căn hộ cho thuê?</h4>
        <p>Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
        <Button
          icon={<FontAwesomeIcon icon={faPenToSquare} />}
          text={"Đăng tin ngay"}
        />
      </div>
    </div>
  );
};

export default Footer;
