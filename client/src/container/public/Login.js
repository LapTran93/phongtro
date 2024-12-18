import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as action from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

//style
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    name: "",
    password: "",
    email: "",
  });
  useEffect(() => {
    setRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    if (msg) {
      Swal.fire("Thất bại !", msg, "error");
    } else if (isLoggedIn) {
      Swal.fire("Thành công!", "Bạn đã đăng nhập thành công!", "success").then(
        () => {
          navigate("/");
        }
      );
    }
  }, [msg, isLoggedIn, update, navigate]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalid = validate(finalPayload);
    if (invalid === 0)
      isRegister
        ? dispatch(action.resgister(payload))
        : dispatch(action.login(payload));
  };
  const validate = (payload) => {
    let invalid = 0;
    let field = Object.entries(payload);
    field.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "* Vui lòng nhập đầy đủ thông tin !!!",
          },
        ]);
        invalid++;
      }
    });
    field.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối đa 6 ký tự",
              },
            ]);
            invalid++;
          }
          break;
        case "phone":
          // Kiểm tra nếu không phải là số hoặc số điện thoại không bắt đầu bằng '0' và có độ dài không bằng 10
          if (!/^[0]\d{9}$/.test(item[1])) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message:
                  "Số điện thoại không hợp lệ. Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.",
              },
            ]);
            invalid++;
          }
          break;
        default:
          break;
      }
    });
    return invalid;
  };

  return (
    <div className={cx("login-container")}>
      <div className={cx("login-box")}>
        <h2 style={{ color: "#000" }}>
          {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
        </h2>
        <form>
          {isRegister && (
            <InputForm
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              label={"Họ và tên"}
              value={payload.name}
              setValue={setPayload}
              type={"name"}
            />
          )}
          {isRegister && (
            <InputForm
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              label={"Email"}
              value={payload.email}
              setValue={setPayload}
              type={"email"}
            />
          )}
          <InputForm
            label={"Số điện thoại"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.phone}
            setValue={setPayload}
            type={"phone"}
          />
          <InputForm
            label={"Mật khẩu"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.password}
            setValue={setPayload}
            type={"password"}
            types={"password"}
          />
          <Button
            text={isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
            onclick={handleSubmit}
          />
        </form>
        <div className={cx("login-links")}>
          {isRegister ? (
            <small style={{ color: "#000" }}>
              {" "}
              Bạn đã có tài khoản ?
              <a
                onClick={() => {
                  setRegister(false);
                  setPayload({
                    phone: "",
                    name: "",
                    password: "",
                  });
                }}
              >
                Đăng nhập ngay
              </a>
            </small>
          ) : (
            <>
              <a href="#">Bạn quên mật khẩu?</a>
              <a
                onClick={() => {
                  setRegister(true);
                  setPayload({
                    phone: "",
                    name: "",
                    password: "",
                  });
                }}
              >
                Tạo tài khoản mới
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
