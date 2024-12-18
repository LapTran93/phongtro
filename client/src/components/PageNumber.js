import React, { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./InputForm.module.scss";
const cx = classNames.bind(styles);

const PageNumber = ({ number, currentPage, changePage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangPage = () => {
    changePage(+number); // Gọi hàm changePage được truyền từ Pagenation

    // Tạo đối tượng params từ query hiện tại
    const searchParamsObject = {};
    const params = new URLSearchParams(window.location.search);
    for (let [key, value] of params.entries()) {
      searchParamsObject[key] = value;
    }

    // Thêm trang vào các tham số tìm kiếm hiện tại
    searchParamsObject.page = +number;

    // Điều hướng tới URL mới với các tham số tìm kiếm kết hợp
    navigate({
      pathname: location.pathname,
      search: new URLSearchParams(searchParamsObject).toString(),
    });
  };
  return (
    <div className={cx("pagination")}>
      <button
        className={
          +number === currentPage
            ? cx("pagination-buttonactive")
            : cx("pagination-button")
        }
        onClick={handleChangPage}
      >
        {number}
      </button>
    </div>
  );
};

export default memo(PageNumber);
