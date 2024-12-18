import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faAngleRight,
  faDeleteLeft,
  faLocationDot,
  faTag,
  faCrop,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { PopupPrice, SearchItem } from "../../components";
import Popup from "../../components/Popup";
import PopupFilter from "../../components/PopupFilter";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";
import { getPostsLimit } from "../../store/actions/post";

//style
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
const cx = classNames.bind(styles);

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isPricePopupOpen, setIsPricePopupOpen] = useState(false);
  const [isAreaPopupOpen, setIsAreaPopupOpen] = useState(false); // Thêm trạng thái cho popup diện tích
  const [popupContent, setPopupContent] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    label: "Toàn quốc",
    value: "all",
  });
  const [selectedPrice, setSelectedPrice] = useState({
    label: "Chọn giá",
    value: "all",
  });
  const [selectedArea, setSelectedArea] = useState({
    label: "Chọn diện tích",
    value: "all",
  });
  const [selectedCategory, setSelectedCategory] = useState({
    label: "Tất cả",
    value: "all",
  });
  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.app.province);
  const categories = useSelector((state) => state.app.category);
  const prices = useSelector((state) => state.app.price);
  const areas = useSelector((state) => state.app.area);
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(action.getProvince());
  }, [dispatch]);

  // Hàm mở popup
  const handleOpenPopup = (type) => {
    let popupTitle = "";
    let popupOptions = [];

    switch (type) {
      case "province":
        popupTitle = "Chọn tỉnh thành";
        popupOptions = [
          { label: "Toàn quốc", value: "all" },
          ...provinces.map((item) => ({ label: item.name, value: item.code })),
        ];
        setIsPopupOpen(true); // Mở popup
        break;
      case "category":
        popupTitle = "Chọn danh mục";
        popupOptions = categories.map((item) => ({
          label: item.value,
          value: item.code,
        }));
        setIsCategoryPopupOpen(true); // Mở popup category
        break;
      case "price":
        popupTitle = "Chọn giá";
        popupOptions = prices.map((item) => ({
          label: item.value,
          value: item.code,
        }));
        setIsPricePopupOpen(true); // Mở popup price
        break;
      case "area":
        popupTitle = "Chọn diện tích";
        popupOptions = areas.map((item) => ({
          label: item.value,
          value: item.code,
        }));
        setIsAreaPopupOpen(true); // Mở popup diện tích
        break;
      default:
        break;
    }

    setPopupContent(popupTitle); // Đặt tiêu đề cho popup
    setOptions(popupOptions); // Cập nhật các options
  };

  // Hàm đóng popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupContent("");
    setOptions([]);
  };

  const handleCloseCategoryPopup = () => {
    setIsCategoryPopupOpen(false);
    setOptions([]);
  };

  const handleClosePricePopup = () => {
    setIsPricePopupOpen(false);
    setOptions([]);
  };

  const handleCloseAreaPopup = () => {
    // Thêm hàm đóng popup diện tích
    setIsAreaPopupOpen(false);
    setOptions([]);
  };

  // Hàm xử lý chọn tỉnh thành
  const handleSelectProvince = (value) => {
    const selected = options.find((option) => option.value === value);
    setSelectedProvince(selected || { label: "Toàn quốc", value: "all" });
    handleClosePopup();
  };

  // Hàm xử lý chọn Category, Price, Area
  const handleSelectCategory = (value) => {
    const selected = options.find((option) => option.value === value);
    setSelectedCategory(selected || { label: "Tất cả", value: "all" });
    handleCloseCategoryPopup();
  };

  const handleSelectPrice = (value) => {
    const selected = options.find((option) => option.value === value);
    setSelectedPrice(selected || { label: "Tất cả", value: "all" });
    handleClosePricePopup();
  };

  const handleSelectArea = (value) => {
    const selected = options.find((option) => option.value === value);
    setSelectedArea(selected || { label: "Tất cả", value: "all" });
    handleCloseAreaPopup(); // Đóng popup diện tích
  };

  // Render tên các lựa chọn
  const selectedOption = selectedProvince.label;
  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    let param = [];
    for (let entry of params.entries()) {
      param.push(entry);
    }
    let searchParamsObject = {};
    param?.forEach((i) => {
      searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] };
    });
    dispatch(getPostsLimit(searchParamsObject));
  }, [params]);

  const handlefilterposts = (
    priceCode,
    areaCode,
    categoryCode,
    provinceCode
  ) => {
    // Lấy các tham số hiện tại
    const currentParams = Object.fromEntries(params.entries());

    // Cập nhật tham số dựa trên giá trị được chọn
    const updatedParams = {
      ...currentParams,
      ...(provinceCode &&
        provinceCode !== "all" && { provincecode: provinceCode }),
      ...(priceCode && priceCode !== "all" && { pricecode: priceCode }),
      ...(areaCode && areaCode !== "all" && { areacode: areaCode }),
      ...(categoryCode &&
        categoryCode !== "all" && { categorycode: categoryCode }),
      page: 1, // Reset trang về 1
    };

    // Điều hướng tới URL mới với các tham số cập nhật
    navigate({
      pathname: "/search",
      search: createSearchParams(updatedParams).toString(),
    });
  };

  return (
    <div className={cx("search-bar")}>
      {/* Danh mục */}
      <SearchItem
        text={selectedCategory.label}
        IconBefore={<FontAwesomeIcon icon={faBuilding} className="icon" />}
        IconAfter={<FontAwesomeIcon icon={faDeleteLeft} />}
        onClick={() => handleOpenPopup("category")}
      />
      {/* Địa điểm */}
      <SearchItem
        text={truncateText(selectedOption, 4)}
        IconBefore={<FontAwesomeIcon icon={faLocationDot} />}
        IconAfter={<FontAwesomeIcon icon={faAngleRight} />}
        onClick={() => handleOpenPopup("province")}
      />
      {/* Giá */}
      <SearchItem
        text={selectedPrice.label}
        IconBefore={<FontAwesomeIcon icon={faTag} />}
        IconAfter={<FontAwesomeIcon icon={faAngleRight} />}
        onClick={() => handleOpenPopup("price")}
      />
      {/* Diện tích */}
      <SearchItem
        text={selectedArea.label}
        IconBefore={<FontAwesomeIcon icon={faCrop} />}
        IconAfter={<FontAwesomeIcon icon={faAngleRight} />}
        onClick={() => handleOpenPopup("area")}
      />
      <button
        onClick={() =>
          handlefilterposts(
            selectedPrice.value,
            selectedArea.value,
            selectedCategory.value,
            selectedProvince.value
          )
        }
        className={cx("search-option")}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span>Tìm kiếm</span>
      </button>
      {/* Popup */}
      {isPopupOpen && (
        <Popup
          title={popupContent}
          options={options}
          selectedOption={selectedProvince.value}
          onClose={handleClosePopup}
          onSelect={handleSelectProvince}
        />
      )}
      {isCategoryPopupOpen && (
        <PopupFilter
          options={options}
          selectedOption={selectedCategory.value}
          onClose={handleCloseCategoryPopup}
          onSelect={handleSelectCategory}
        />
      )}
      {isPricePopupOpen && (
        <PopupPrice
          options={options}
          selectedOption={selectedPrice.value}
          onClose={handleClosePricePopup}
          onSelect={handleSelectPrice}
        />
      )}
      {isAreaPopupOpen && ( // Sửa lại điều kiện hiển thị Popup diện tích
        <PopupPrice
          options={options}
          selectedOption={selectedArea.value}
          onClose={handleCloseAreaPopup} // Đổi tên hàm đóng
          onSelect={handleSelectArea}
        />
      )}
    </div>
  );
};

export default Search;
