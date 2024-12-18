import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faPlus,
  faRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../store/actions";
import logo from "../../assets/logo.png";
import { NavLink, Routes, Route, Link } from "react-router-dom";
import { formatVietNamtoString } from "../../ultils/constants";
import { useSelector, useDispatch } from "react-redux";
import { img } from "../../assets";
import menuDropdown from "../../ultils/menuDropdown";
import { Button } from "../../components";

//style
import classNames from "classnames/bind";
import styles from "./HeaderProfile.module.scss";
const cx = classNames.bind(styles);

const HeaderProfile = (props) => {
  const category = useSelector((state) => state.app.category);
  const dispatch = useDispatch();

  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  useEffect(() => {
    dispatch(actions.getCategorys());
  }, [dispatch]);

  const cutString = (str, length) => {
    if (!str) return ""; // Trả về chuỗi rỗng nếu str là null/undefined
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  // Ví dụ

  return (
    <div className={cx("container")}>
      <div className={cx("header-top")}>
        <div className={cx("logo")}>
          <NavLink to={"/"}>
            <img src={logo} />
          </NavLink>
          <p>
            {category?.length > 0 &&
              category.map((item) => (
                <NavLink
                  key={item.code}
                  to={`/${formatVietNamtoString(item.value)}`}
                  className={({ isActive }) =>
                    cx("category", { active: isActive })
                  }
                >
                  {item.value}
                </NavLink>
              ))}
          </p>
        </div>
        <div className={cx("logo")}>
          <div className={cx("icons")}>
            <div className={cx("profile-user")}>
              <img src={currentData.avatar || img.avt} />
              <div className={cx("user-name")}>
                <p>{`Xin chào : ${currentData.name}`}</p>
                <p>TK Chính : 0 VNĐ</p>
              </div>
            </div>
          </div>
          <span>
            {isLoggedIn && (
              <Link to={"/quan-ly/dang-tin-moi"}>
                <Button
                  text={"Đăng tin miễn phí"}
                  icon={
                    <FontAwesomeIcon
                      className={cx("icon-plus")}
                      icon={faPlus}
                    />
                  }
                />
              </Link>
            )}
            {!isLoggedIn && (
              <Link to={"/login"}>
                <Button
                  text={"Đăng tin miễn phí"}
                  icon={
                    <FontAwesomeIcon
                      className={cx("icon-plus")}
                      icon={faPlus}
                    />
                  }
                />
              </Link>
            )}
          </span>
        </div>
      </div>
      <div className={cx("section")}>
        <div className={cx("sidebar")}>
          <div className={cx("icons")}>
            <div className={cx("profile-user")}>
              <img src={currentData.avatar || img.avt} />
              <div className={cx("user-name")}>
                <p className={cx("name")}> {currentData.name}</p>
                <p>{currentData.phone}</p>
                <small>
                  {currentData?.id
                    ? `Mã tài khoản : ${cutString(currentData.id, 5)}`
                    : "Mã tài khoản: Chưa xác định"}
                </small>
              </div>
            </div>
          </div>
          <div className={cx("account-balance-card")}>
            <div className={cx("balance-info")}>
              <span className={cx("label")}>Số dư tài khoản</span>
              <span className={cx("balance")}>0</span>
            </div>
            <button className={cx("recharge-button")}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077976.png"
                alt="Wallet Icon"
                className={cx("icon")}
              />
              Nạp tiền
            </button>
          </div>
          <div className={cx("list-menu")}>
            {menuDropdown.map((item) => {
              return (
                <Link className={cx("dropdown")} to={item?.path} key={item.id}>
                  {item.icon}
                  {item.text}
                </Link>
              );
            })}
            <Link
              onClick={() => {
                dispatch(actions.logout());
              }}
              className={cx("btn-logout")}
              to={"/"}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Đăng xuất
            </Link>
          </div>
        </div>
        <div className={cx("content")}>{props.children}</div>
      </div>
    </div>
  );
};

export default HeaderProfile;
