import React, { useEffect, useState } from "react";
import { PageNumber } from "../../components";
import { useSelector } from "react-redux";
import { Button } from "../../components/index";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// styles
import classNames from "classnames/bind";
import styles from "./Pagenation.module.scss";
const cx = classNames.bind(styles);

const Pagenation = ({ page }) => {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POST);
    let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
    let star = currentPage - 2 <= 0 ? 1 : currentPage - 2;
    let temp = [];
    for (let i = star; i <= end; i++) temp.push(i);
    setArrPage(temp);
  }, [count, posts, currentPage]);

  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams]);
  useEffect(() => {
    if (page === 1) {
      setCurrentPage(1); // Khi `page=1` từ URL, focus vào trang 1
    }
  }, [page]);

  const changePage = (newPage) => {
    setCurrentPage(newPage);

    // Tạo đối tượng params từ query hiện tại
    const searchParamsObject = {};
    for (let [key, value] of new URLSearchParams(
      window.location.search
    ).entries()) {
      searchParamsObject[key] = value;
    }

    // Thêm trang vào các tham số tìm kiếm hiện tại
    searchParamsObject.page = newPage;

    // Điều hướng tới URL mới với các tham số tìm kiếm kết hợp
    navigate({
      pathname: window.location.pathname,
      search: createSearchParams(searchParamsObject).toString(),
    });
  };

  const maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POST);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        text={"« Trang trước"}
        onclick={() => currentPage > 1 && changePage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              number={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage || 1}
              changePage={changePage} // Truyền hàm changePage vào PageNumber
            />
          );
        })}
      <Button
        onclick={() => currentPage < maxPage && changePage(currentPage + 1)}
        disabled={currentPage === maxPage}
        text={"Trang sau »"}
      />
    </div>
  );
};

export default Pagenation;
