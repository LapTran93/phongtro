import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import {
  useSearchParams,
  useNavigate,
  Link,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { img } from "../../assets";
import { Pagenation, Search } from "./index";
import * as action from "../../store/actions";
import { formatVietNamtoString } from "../../ultils/constants";
import NewPost from "./NewPost";
import { locationbtn } from "../../ultils/constants";
//style
import classNames from "classnames/bind";
import styles from "./Province.module.scss";
const cx = classNames.bind(styles);

const Province = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { posts, count } = useSelector((state) => state.post);
  const price = useSelector((state) => state.app.price);
  const area = useSelector((state) => state.app.area);
  const indexs = [0, 1, 2, 3];
  console.log(location.pathname);
  useEffect(() => {
    dispatch(action.getPrices());
    dispatch(action.getAreas());
    dispatch(action.getCategorys());
  }, []);
  const [provinceCode, setProvinceCode] = useState("none");

  useEffect(() => {
    function catChuoi(url) {
      const parts = url.trim().split("/");
      return parts[parts.length - 1];
    }

    // Ví dụ sử dụng
    const url = location.pathname;
    const ketQua = catChuoi(url);

    let province = locationbtn?.find(
      (item) => `${formatVietNamtoString(item.name)}` === ketQua
    );
    if (province) {
      setProvinceCode(province.value);
    }
  }, [location]);
  console.log(provinceCode);
  useEffect(() => {
    let param = [];
    for (let entry of params.entries()) {
      param.push(entry);
    }
    let searchParamsObject = {};
    param?.forEach((i) => {
      searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] };
    });
    if (provinceCode) searchParamsObject.provincecode = provinceCode;
    dispatch(getPostsLimit(searchParamsObject));
  }, [params, provinceCode]);

  const handlefilterposts = (code, value) => {
    const updatedParams = {
      ...Object.fromEntries(params.entries()),
      pricecode: formatVietNamtoString(code),
      page: 1,
    };

    // Điều hướng tới URL mới với cả pricecode và page
    navigate({
      pathname: location.pathname,
      search: createSearchParams(updatedParams).toString(),
    });
  };

  const handlefilterarea = (code) => {
    const updatedParams = {
      ...Object.fromEntries(params.entries()), // Lấy các tham số hiện tại
      areacode: formatVietNamtoString(code),
      page: 1,
    };

    // Điều hướng tới URL mới với cả pricecode và page
    navigate({
      pathname: location.pathname,
      search: createSearchParams(updatedParams).toString(),
    });
  };

  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const extractDistrictAndCity = (address) => {
    const parts = address.split(",");
    const district = parts[parts.length - 2]?.trim(); // Get second-to-last part
    const city = parts[parts.length - 1]?.trim(); // Get last part
    return `${district}, ${city}`;
  };

  return (
    <div className={cx("container-list")}>
      <Search />
      <div className={cx("list")}>
        <div className={cx("room")}>
          <div className={cx("room-list")}>
            <div className={cx("title")}>
              <h3>Tổng {count.toLocaleString()} kết quả</h3>
              <div className={cx("filter-btn")}>
                <p>Sắp xếp :</p>
                <p>
                  <Button text={"Mặc định"} />
                </p>
                <p>
                  <Button text={"Mới nhất"} />
                </p>
              </div>
            </div>
            {posts.length > 0 &&
              posts.map((item) => {
                let images = item?.images?.image;
                if (typeof images === "string") {
                  try {
                    images = JSON.parse(images); // In case it's a JSON string
                  } catch (error) {
                    images = [images]; // In case it's a single image string
                  }
                }

                return (
                  <div key={item.id} className={cx("room-item")}>
                    <Link
                      to={`/chi-tiet/${formatVietNamtoString(item?.title)}/${
                        item?.id
                      }`}
                      className={cx("room-images")}
                    >
                      {Array.isArray(images) && images.length > 0 ? (
                        indexs.map((index) => {
                          return (
                            images[index] && (
                              <img
                                key={`${item.id}-img-${index}`} // Dùng key duy nhất cho mỗi hình ảnh
                                src={images[index]}
                                alt={`Room ${index}`}
                              />
                            )
                          );
                        })
                      ) : (
                        <img src={img.anh} alt="Placeholder" />
                      )}
                      <span className={cx("total-img")}>
                        {Array.isArray(images)
                          ? `${images.length} ảnh`
                          : "1 ảnh"}
                      </span>
                    </Link>
                    <div className={cx("room-details")}>
                      <div className={cx("room-title")}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <FontAwesomeIcon
                            key={`${item.id}-star-${i}`} // Dùng key duy nhất cho mỗi ngôi sao
                            className={cx("icon-star")}
                            icon={faStar}
                            style={{ color: i < item.star ? "gold" : "gray" }}
                          />
                        ))}
                        <Link
                          to={`/chi-tiet/${formatVietNamtoString(
                            item?.title
                          )}/${item?.id}`}
                          className={cx("post-title")}
                        >
                          {truncateText(item?.title, 13)}
                        </Link>
                      </div>
                      <div className={cx("room-description")}>
                        <p className={cx("room-price")}>
                          {item?.attributes?.price}
                        </p>
                        <p className={cx("room-size")}>
                          {item?.attributes?.acreage}
                        </p>
                        <p className={cx("room-location")}>
                          {extractDistrictAndCity(item?.address)}
                        </p>
                      </div>
                      <p className={cx("room-time")}>
                        {item?.attributes?.published}
                      </p>
                      <p className={cx("room-content")}>
                        {" "}
                        {truncateText(item?.description, 35)}
                      </p>
                      <div className={cx("room-contact")}>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{
                              height: "30px",
                              width: "30px",
                              borderRadius: "50%",
                            }}
                            src={item?.users?.avatar || img.avt}
                            alt="User Avatar"
                          />
                          <span>{item?.users?.name}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <a href={`tel:${item?.users?.phone}`}>
                            Gọi {item?.users?.phone}
                          </a>
                          <a href="#">Nhắn Zalo</a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <Pagenation />
          </div>
        </div>

        <div className={cx("filter")}>
          <div className={cx("container-price")}>
            <h3>Xem theo giá</h3>
            <ul className={cx("list-price")}>
              {price?.length > 0 &&
                price.map((item) => (
                  <li
                    onClick={() => handlefilterposts(item.code, item.value)}
                    key={item.code} // Dùng key duy nhất cho từng mục giá
                    className={cx("text-price")}
                  >
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faAngleRight}
                    />
                    {item.value}
                  </li>
                ))}
            </ul>
          </div>
          <div className={cx("container-price")}>
            <h3>Xem theo diện tích</h3>
            <ul className={cx("list-price")}>
              {area?.length > 0 &&
                area.map((item) => (
                  <li
                    onClick={() => handlefilterarea(item.code, item.value)}
                    key={item.code} // Dùng key duy nhất cho từng mục diện tích
                    className={cx("text-price")}
                  >
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faAngleRight}
                    />
                    {item.value}
                  </li>
                ))}
            </ul>
          </div>
          <NewPost />
        </div>
      </div>
    </div>
  );
};

export default Province;
