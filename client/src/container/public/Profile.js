import React, { useState, useEffect } from "react";
import HeaderProfile from "./HeaderProfile";
import { img } from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { apiUpdateUser, apiPassword } from "../../services/user";
import { apiUpLoadImages } from "../../services/post";

//style
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

const Profile = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("personal-info");
  const [avatar, setAvatar] = useState(null);
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passnew, setPassnew] = useState("");
  const [passold, setPassold] = useState("");
  const [payload, setPayload] = useState({
    phone: "",
    email: "",
    image: "",
    name: "",
  });

  useEffect(() => {
    if (currentData?.phone && currentData.name && currentData.email) {
      setPhone(currentData.phone);
      setName(currentData.name);
      setEmail(currentData.email);
    }
  }, [currentData]);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);

    try {
      // Gửi file đến API upload
      const response = await apiUpLoadImages(formData);
      if (response.status === 200) {
        const imageUrl = response.data?.secure_url;
        setAvatar(imageUrl); // Hiển thị ảnh vừa upload
        handleInputChange("image", imageUrl); // Cập nhật vào payload
      }
    } catch (error) {
      console.error("Lỗi upload ảnh:", error); // Chỉ log lỗi trong console
    }
  };

  const handleInputChange = (field, value) => {
    setPayload((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    let finalPayload = {
      phone: payload.phone || currentData.phone,
      email: payload.email || currentData.email,
      name: payload.name || currentData.name,
      image: payload.image || currentData.avatar,
      userid: currentData.id, // ID người dùng
    };

    try {
      // Gọi API cập nhật thông tin người dùng
      const response = await apiUpdateUser(finalPayload);

      // Hiển thị thông báo thành công
      Swal.fire({
        icon: "success",
        title: "Cập nhật thông tin thành công!",
        text: "Thông tin của bạn đã được cập nhật.",
      });
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có sự cố
      Swal.fire({
        icon: "error",
        title: "Lỗi cập nhật!",
        text:
          error?.response?.data?.msg || "Đã xảy ra lỗi khi cập nhật thông tin.",
      });
    }
  };

  const handlePassword = async () => {
    if (!passold || !passnew) {
      Swal.fire({
        icon: "error",
        title: "Thiếu mật khẩu!",
        text: "Vui lòng nhập mật khẩu cũ và mật khẩu mới!",
      });
      return;
    }

    const payload = {
      passwordOld: passold,
      passwordNew: passnew,
    };

    try {
      const response = await apiPassword(payload);

      // Kiểm tra lỗi từ server
      if (response.err === -1) {
        // Nếu mật khẩu cũ không đúng
        Swal.fire({
          icon: "error",
          title: "Lỗi đổi mật khẩu!",
          text: response.msg || "Mật khẩu cũ không đúng.",
        });
      } else {
        // Nếu đổi mật khẩu thành công
        Swal.fire({
          icon: "success",
          title: "Đổi mật khẩu thành công!",
          text: "Mật khẩu của bạn đã được cập nhật.",
        }).then(() => {
          // Làm mới trang sau khi đổi mật khẩu thành công
          window.location.reload(); // Refresh lại trang
        });
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      Swal.fire({
        icon: "error",
        title: "Lỗi đổi mật khẩu!",
        text: error?.response?.data?.msg || "Đã xảy ra lỗi khi đổi mật khẩu.",
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal-info":
        return (
          <div className={cx("profile-section")}>
            <form className={cx("form")}>
              <div className={cx("avatar-wrapper")}>
                <img
                  src={
                    avatar ||
                    (currentData?.avatar ? currentData.avatar : img.avt)
                  }
                  alt="Avatar"
                  className={cx("avatar")}
                />
                <label className={cx("avatar-change-label")}>
                  Đổi ảnh đại diện
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className={cx("avatar-input")}
                    multiple={false}
                  />
                </label>
              </div>
              <div className={cx("form-group")}>
                <label>Số điện thoại</label>
                <input
                  type="number"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    handleInputChange("phone", e.target.value);
                  }}
                  className={cx("input")}
                />
              </div>
              <div className={cx("form-group")}>
                <label>Tên liên hệ</label>
                <input
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleInputChange("name", e.target.value);
                  }}
                  className={cx("input")}
                />
              </div>
              <div className={cx("form-group")}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange("email", e.target.value);
                  }}
                  className={cx("input")}
                />
              </div>
              <p onClick={handleSubmit} className={cx("update-button")}>
                Cập nhật
              </p>
            </form>
          </div>
        );
      case "change-password":
        return (
          <div className={cx("change-password-section")}>
            <form className={cx("form")}>
              <div className={cx("form-group")}>
                <label>Mật khẩu cũ</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  className={cx("input")}
                  onChange={(e) => setPassold(e.target.value)}
                  value={passold || ""}
                />
              </div>
              <div className={cx("form-group")}>
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  onChange={(e) => setPassnew(e.target.value)}
                  value={passnew || ""}
                  placeholder="Nhập mật khẩu mới"
                  className={cx("input")}
                />
              </div>
              <p onClick={handlePassword} className={cx("update-button")}>
                Cập nhật
              </p>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderProfile>
        <div className={cx("container")}>
          <h3 className={cx("title")}>Quản lý tài khoản</h3>
          <div className={cx("tabs")}>
            <button
              className={cx("tab", { active: activeTab === "personal-info" })}
              onClick={() => setActiveTab("personal-info")}
            >
              Thông tin cá nhân
            </button>

            <button
              className={cx("tab", { active: activeTab === "change-password" })}
              onClick={() => setActiveTab("change-password")}
            >
              Đổi mật khẩu
            </button>
          </div>
          <div className={cx("content")}>{renderContent()}</div>
        </div>
      </HeaderProfile>
    </div>
  );
};

export default Profile;
