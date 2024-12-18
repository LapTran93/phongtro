import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faPlus,
  faRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import { useNavigate, Link, NavLink, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constants";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions";
import { formatVietNamtoString } from "../../ultils/constants";
import menuDropdown from "../../ultils/menuDropdown";
import { img } from "../../assets";
//style
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const category = useSelector((state) => state.app.category);
  const { currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState();
  const headerRef = useRef();
  const isLogin = useCallback(
    (flag) => {
      navigate(path.login, { state: { flag } });
    },
    [navigate]
  );
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page" || "chi-tiet")]);
  useEffect(() => {
    dispatch(action.getCategorys());
  }, [dispatch]);

  return (
    <div>
      <div ref={headerRef} className={cx("container")}>
        <Link to={"/"}>
          <div className={cx("logo")}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className={cx("icons")}>
          {!isLoggedIn && (
            <div className={cx("icons")}>
              <span onClick={() => isLogin(false)}>
                <FontAwesomeIcon icon={faUser} /> <p>Đăng nhập</p>
              </span>
              <span onClick={() => isLogin(true)}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <p>Đăng ký</p>
              </span>
            </div>
          )}
          {isLoggedIn && (
            <div className={cx("icons")}>
              <Link
                to={"quan-ly/thong-tin-ca-nhan"}
                className={cx("profile-user")}
              >
                <img src={currentData.avatar || img.avt} />
                <div className={cx("user-name")}>
                  <p>{`Xin chào : ${currentData.name}`}</p>
                  <p>TK Chính : 0 VNĐ</p>
                </div>
              </Link>
              <span onClick={() => setIsShowMenu((prev) => !prev)}>
                <FontAwesomeIcon icon={faGear} /> <p>Quản lý tài khoản</p>
              </span>
              {isShowMenu && (
                <div className={cx("dropdown-user")}>
                  {menuDropdown.map((item) => {
                    return (
                      <Link
                        className={cx("dropdown")}
                        to={item?.path}
                        key={item.id}
                      >
                        {item.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    onClick={() => {
                      dispatch(action.logout());
                      setIsShowMenu(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          <span>
            {isLoggedIn && (
              <Link to={"/quan-ly/dang-tin-moi"}>
                {" "}
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
                {" "}
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
      <div className={cx("menu-container")}>
        <ul className={cx("menu")}>
          <NavLink
            to={"/"}
            className={({ isActive }) => cx("category", { active: isActive })}
          >
            Trang chủ
          </NavLink>
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
          <NavLink
            className={({ isActive }) => cx("menu-item", { active: isActive })}
          >
            Tìm người ở ghép
          </NavLink>
          <NavLink
            className={({ isActive }) => cx("menu-item", { active: isActive })}
          >
            Tin tức
          </NavLink>
          <NavLink
            className={({ isActive }) => cx("menu-item", { active: isActive })}
          >
            Bảng giá dịch vụ
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Header;
