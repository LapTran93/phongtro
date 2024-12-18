import React, { useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import { apigetPostByid } from "../../services/post";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { formatVietNamtoString, truncateText } from "../../ultils/constants";
import { Link } from "react-router-dom";
//style
import classNames from "classnames/bind";
import styles from "./ManagePost.module.scss";
const cx = classNames.bind(styles);
const ManagePost = () => {
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [data, setData] = useState([]); // State để lưu danh sách bài viết

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        userid: currentData?.id,
      };
      const response = await apigetPostByid(payload);
      setData(response?.data.response || []);
    };

    if (currentData?.id) {
      fetchData();
    }
  }, [currentData]);
  return (
    <div>
      <HeaderProfile>
        <div className={cx("container")}>
          <h3>Danh sách tin đăng (80 bài)</h3>
          <div className={cx("data-table")}>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>STT</th>
                  <th>Tên bài viết</th>
                  <th>Mô tả</th>
                  <th>Giá thuê</th>
                  <th>Diện tích</th>
                  <th>Địa chỉ</th>
                  <th>Ngày đăng</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <Link
                          to={`/chi-tiet/${formatVietNamtoString(row?.title)}/${
                            row?.id
                          }`}
                          className={cx("post-title")}
                        >
                          {row.title}
                        </Link>
                      </td>
                      <td>{truncateText(row.description, 10)}</td>
                      <td>{row.attributes?.price}</td>
                      <td>{row.attributes?.acreage}</td>
                      <td>{row.address}</td>
                      <td>{row.attributes?.published}</td>
                      <td className={cx("tools")}>
                        <button className={cx("btn-edit")}>Sửa</button>
                        <button className={cx("btn-delete")}>Xóa</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </HeaderProfile>
    </div>
  );
};

export default ManagePost;
