import React, { useState, useEffect } from "react";
import HeaderProfile from "./HeaderProfile";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { priceRanges, areaRanges } from "../../ultils/getCode";
import { apicreatePost } from "../../services/post";
import Swal from "sweetalert2";
import { apiUpLoadImages } from "../../services/post";
//style
import classNames from "classnames/bind";
import styles from "./CreaterPost.module.scss";
const cx = classNames.bind(styles);
const CreaterPost = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.app.province);
  const districts = useSelector((state) => state.app.districts);
  const wards = useSelector((state) => state.app.ward);
  const category = useSelector((state) => state.app.category);
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState();
  const [selectedDistrictCode, setSelectedDistrictCode] = useState();
  const [selectedWardCode, setSelectedWardCode] = useState();
  const [selectedCategoryCode, setSelectedCategoryCode] = useState();
  const [addressDetail, setAddressDetail] = useState("");
  const [addressTotal, setAddress] = useState("");
  const [prices, setPrice] = useState("");
  const [areas, setArea] = useState("");
  const [titles, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  const handleAddressChange = (e) => {
    setAddressDetail(e.target.value);
  };

  const selectedProvince = () => {
    let provinceName = provinces.find(
      (province) => province.code == selectedProvinceCode
    );
    return provinceName ? provinceName.name : "";
  };

  const selectedDistrict = () => {
    if (!selectedDistrictCode) return "";
    let districtName = districts.find(
      (district) => district.code == selectedDistrictCode
    );
    return districtName ? districtName.name : "";
  };

  const selectedWard = () => {
    if (!selectedWardCode) return "";
    let wardName = wards.find((ward) => ward.code == selectedWardCode);
    return wardName ? wardName.name : "";
  };
  useEffect(() => {
    setSelectedDistrictCode(null);
    setSelectedWardCode(null);
  }, [selectedProvinceCode]);

  useEffect(() => {
    setSelectedWardCode(null);
  }, [selectedDistrictCode]);
  useEffect(() => {
    setAddress(
      `${addressDetail}, ${selectedWard()}, ${selectedDistrict()}, ${selectedProvince()}`
    );
  }, [
    selectedProvinceCode,
    selectedDistrictCode,
    selectedWardCode,
    addressDetail,
  ]);
  const filteredDistricts = districts.filter(
    (district) => district.province_code == selectedProvinceCode
  );
  const filteredWards = wards.filter(
    (ward) => ward.district_code == selectedDistrictCode
  );

  useEffect(() => {
    dispatch(actions.getProvince());
    dispatch(actions.getDistricts(selectedProvinceCode));
    dispatch(actions.getWards(selectedDistrictCode));
  }, [selectedProvinceCode, selectedDistrictCode]);
  useEffect(() => {
    dispatch(actions.getCategorys());
    dispatch(actions.getAreas());
  }, [dispatch]);
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    let newImages = [...selectedImages];
    for (let i of files) {
      const formdata = new FormData();
      formdata.append("file", i);
      formdata.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      const response = await apiUpLoadImages(formdata);
      if (response.status === 200) {
        newImages.push(response.data?.secure_url);
      }
    }
    setSelectedImages(newImages);
  };
  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const getPriceCode = () => {
    const priceInput = parseInt(formatPriceSelect(prices));
    if (!isNaN(priceInput)) {
      const range = priceRanges.find(
        (range) => priceInput >= range.min && priceInput <= range.max
      );
      return range ? range.code : null; // Trả về mã code nếu tìm thấy, nếu không trả về null
    }
    return null; // Trả về null nếu giá trị không hợp lệ
  };
  const getAreaCode = () => {
    const areaInput = parseInt(areas);
    if (!isNaN(areaInput)) {
      const range = areaRanges.find(
        (range) => areaInput >= range.min && areaInput <= range.max
      );
      return range ? range.code : null; // Trả về mã code nếu tìm thấy, nếu không trả về null
    }
    return null; // Trả về null nếu giá trị không hợp lệ
  };

  const handleSubmit = async () => {
    if (
      !titles ||
      !descriptions ||
      !prices ||
      !areas ||
      !addressTotal ||
      !selectedCategoryCode ||
      !selectedProvinceCode ||
      !selectedDistrictCode ||
      !selectedWardCode
    ) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ các thông tin bắt buộc.",
        icon: "error",
        confirmButtonText: "Thử lại",
      });
      return;
    }

    if (isNaN(prices) || isNaN(areas)) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng nhập giá và diện tích hợp lệ.",
        icon: "error",
        confirmButtonText: "Thử lại",
      });
      return;
    }

    const payload = {
      priceCode: getPriceCode(),
      areaCode: getAreaCode(),
      provincecode: parseInt(selectedProvinceCode),
      address: addressTotal,
      categorycode: selectedCategoryCode,
      title: titles,
      description: descriptions,
      image: selectedImages,
      userid: currentData.id,
      label: `${
        category?.find((item) => item.code === selectedCategoryCode)?.value
      } ${selectedDistrict()}`,
      price: formatPriceSelect(prices),
      area: areas,
    };

    try {
      const response = await apicreatePost(payload);
      console.log(response);

      // Hiển thị thông báo thành công
      Swal.fire({
        title: "Thành công!",
        text: "Bài viết đã được tạo thành công!",
        icon: "success",
        confirmButtonText: "Quay lại trang chủ",
      }).then(() => {
        // Chuyển hướng về trang chủ
        navigate("/"); // Điều hướng đến trang chủ
      });
    } catch (error) {
      console.error("Error creating post:", error);

      // Hiển thị thông báo lỗi nếu có lỗi
      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra trong quá trình tạo bài viết. Vui lòng thử lại.",
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    }
  };
  const formatPrice = (value) => {
    if (!value) return "";

    // Loại bỏ dấu chấm phân cách nếu có
    const numericValue = value.replace(/\./g, "");

    // Chuyển giá trị thành kiểu số nguyên
    const formattedValue = parseInt(numericValue, 10);

    // Kiểm tra nếu có giá trị hợp lệ và format lại thành chuỗi có dấu chấm phân cách hàng nghìn
    return formattedValue.toLocaleString("vi-VN");
  };
  const formatPriceSelect = (value) => {
    if (!value) return "";

    // Loại bỏ tất cả dấu chấm trong chuỗi nhập vào
    const numericValue = value.replace(/\./g, "");

    // Trả về giá trị mà không có dấu chấm
    return numericValue;
  };

  return (
    <div>
      <HeaderProfile>
        <div className={cx("address-form")}>
          <h2>Khu vực</h2>
          <form>
            {/* Hàng đầu tiên: Tỉnh/Thành phố và Quận/Huyện */}
            <div className={cx("form-row")}>
              <div className={cx("form-group")}>
                <label>Tỉnh/Thành phố</label>
                <select
                  onChange={(e) => setSelectedProvinceCode(e.target.value)}
                  defaultValue=""
                >
                  <option>-- Chọn Tỉnh/TP --</option>
                  {provinces &&
                    provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className={cx("form-group")}>
                <label>Quận/Huyện</label>
                <select
                  onChange={(e) => setSelectedDistrictCode(e.target.value)}
                  defaultValue=""
                >
                  <option>-- Chọn quận huyện --</option>
                  {filteredDistricts &&
                    filteredDistricts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Hàng thứ hai: Phường/Xã và Đường/Phố */}
            <div className={cx("form-row")}>
              <div className={cx("form-group")}>
                <label>Phường/Xã</label>
                <select onChange={(e) => setSelectedWardCode(e.target.value)}>
                  <option>-- Chọn phường xã --</option>
                  {filteredWards &&
                    filteredWards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className={cx("form-group")}>
                <label>Địa chỉ chi tiết</label>
                <input
                  type="text"
                  placeholder="Địa chỉ chi tiết"
                  value={addressDetail || ""} // Đảm bảo có giá trị mặc định
                  onChange={handleAddressChange} // Cập nhật state khi giá trị input thay đổi
                />
              </div>
            </div>

            {/* Hàng thứ ba: Địa chỉ chi tiết */}

            <div className={cx("form-group")}>
              <label>Địa chỉ</label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                value={addressTotal || ""} // Đảm bảo có giá trị mặc định
                placeholder="Địa chỉ"
                disabled
              />
            </div>
          </form>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              addressTotal
            )}&output=embed`}
            width="100%"
            height="300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className={cx("description-form")}>
            <h2>Thông tin mô tả</h2>
            <form>
              {/* Loại chuyên mục */}
              <div className={cx("form-group")}>
                <label>Loại chuyên mục</label>
                <select
                  onChange={(e) => setSelectedCategoryCode(e.target.value)}
                  defaultValue=""
                >
                  <option>-- Chọn loại chuyên mục --</option>
                  {category &&
                    category.map((categories) => (
                      <option key={categories.code} value={categories.code}>
                        {categories.value}
                      </option>
                    ))}
                </select>
              </div>

              {/* Tiêu đề */}
              <div className={cx("form-group")}>
                <label>Tiêu đề</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  value={titles || ""}
                  placeholder="Nhập tiêu đề"
                />
              </div>

              {/* Nội dung mô tả */}
              <div className={cx("form-group")}>
                <label>Nội dung mô tả</label>
                <textarea
                  onChange={(e) => setDescriptions(e.target.value)}
                  value={descriptions || ""}
                  placeholder="Nhập nội dung mô tả"
                ></textarea>
              </div>

              {/* Giá cho thuê */}
              <div className={cx("form-row")}>
                <div className={cx("form-group", "price-group")}>
                  <label>Giá cho thuê</label>
                  <input
                    value={formatPrice(prices)}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    type="text"
                    placeholder="Nhập giá cho thuê"
                  />
                  <span>đồng</span>
                </div>
              </div>

              {/* Diện tích */}
              <div className={cx("form-row")}>
                <div className={cx("form-group", "area-group")}>
                  <label>Diện tích</label>
                  <input
                    value={areas}
                    onChange={(e) => {
                      setArea(e.target.value);
                    }}
                    type="text"
                    placeholder="Nhập diện tích"
                  />
                  <span>m²</span>
                </div>
              </div>
            </form>
          </div>
          <div className={cx("container")}>
            <h3>Hình ảnh</h3>
            <div className={cx("upload-box")}>
              <label className={cx("upload-content")}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                  alt="Upload Icon"
                  className={cx("upload-icon")}
                />
                <p>Tải ảnh từ thiết bị</p>
              </label>
            </div>
            {selectedImages.length > 0 && (
              <div className={cx("preview-section")}>
                {selectedImages.map((image, index) => (
                  <div key={index} className={cx("preview-box")}>
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className={cx("image")}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className={cx("remove-btn")}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={cx("contact-form")}>
            <h2>Thông tin liên hệ</h2>
            <form>
              <div className={cx("form-group")}>
                <div className={cx("input-field")}>
                  <label htmlFor="fullName">Họ Tên</label>
                  <input
                    value={currentData.name || ""}
                    type="text"
                    id="fullName"
                    disabled
                  />
                </div>
                <div className={cx("input-field")}>
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <input
                    value={currentData.phone || ""}
                    type="text"
                    id="phoneNumber"
                    disabled
                  />
                </div>
              </div>
              <p
                onClick={() => console.log(handleSubmit())}
                className={cx("submit-btn")}
              >
                Đăng tin
              </p>
            </form>
          </div>
        </div>
      </HeaderProfile>
    </div>
  );
};

export default CreaterPost;
