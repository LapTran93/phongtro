import React, { useEffect } from "react";
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
import { Pagenation } from "./index";
import * as action from "../../store/actions";
import { formatVietNamtoString } from "../../ultils/constants";
import NewPost from "./NewPost";

//style
import classNames from "classnames/bind";
import styles from "./ListPost.module.scss";
const cx = classNames.bind(styles);

const ListPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { posts, count } = useSelector((state) => state.post);
  const category = useSelector((state) => state.app.category);
  const price = useSelector((state) => state.app.price);
  const area = useSelector((state) => state.app.area);
  const indexs = [0, 1, 2, 3];
  useEffect(() => {
    dispatch(action.getPrices());
    dispatch(action.getAreas());
    dispatch(action.getCategorys());
  }, []);
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
    // Kiểm tra nếu văn bản có khoảng trắng (nghĩa là là văn bản có thể cắt theo từ)
    const wordsArray = text.split(" ");

    // Nếu có ít hơn hoặc bằng số từ giới hạn, trả về văn bản nguyên bản
    if (wordsArray.length <= wordLimit) {
      return text;
    }

    // Nếu văn bản không có khoảng trắng hoặc chuỗi dài quá giới hạn từ, cắt theo số ký tự
    if (!text.includes(" ") || wordsArray.length > wordLimit) {
      const truncatedText = text.slice(0, 200); // Cắt chuỗi sau 200 ký tự (hoặc chiều dài bạn mong muốn)
      return truncatedText + "...";
    }

    // Cắt văn bản theo số từ, thêm dấu "..."
    return wordsArray.slice(0, wordLimit).join(" ") + "...";
  };

  const extractDistrictAndCity = (address) => {
    const parts = address.split(",");
    const district = parts[parts.length - 2]?.trim(); // Get second-to-last part
    const city = parts[parts.length - 1]?.trim(); // Get last part
    return `${district}, ${city}`;
  };
  return (
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
              // Check if images is an array, and limit to 4 images
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
                    {/* Render the first 4 images */}
                    {Array.isArray(images) && images.length > 0 ? (
                      indexs.map((index) => {
                        return (
                          images[index] && (
                            <img
                              key={index}
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
                      {Array.isArray(images) ? `${images.length} ảnh` : "1 ảnh"}
                    </span>
                  </Link>
                  <div className={cx("room-details")}>
                    <div className={cx("room-title")}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          className={cx("icon-star")}
                          icon={faStar}
                          style={{ color: i < item.star ? "gold" : "gray" }}
                        />
                      ))}
                      <Link
                        to={`/chi-tiet/${formatVietNamtoString(item?.title)}/${
                          item?.id
                        }`}
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
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(
                              `https://zalo.me/${item?.users?.phone}`,
                              "_blank"
                            );
                          }}
                        >
                          Nhắn Zalo
                        </a>
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
        <div className={cx("container")}>
          <h3>Danh mục sản phẩm</h3>
          <div className={cx("list-category")}>
            <ul>
              {category?.length > 0 &&
                category.map((item) => {
                  return (
                    <Link
                      to={`${formatVietNamtoString(item.value)}`}
                      key={item.code}
                      className={cx("text-category")}
                    >
                      <FontAwesomeIcon
                        className={cx("icon")}
                        icon={faAngleRight}
                      />
                      {item.value}
                    </Link>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={cx("container-price")}>
          <h3>Xem theo giá</h3>
          <ul className={cx("list-price")}>
            {price?.length > 0 &&
              price.map((item) => (
                <li
                  onClick={() => handlefilterposts(item.code, item.value)}
                  key={item.code}
                  className={cx("text-price")}
                >
                  <FontAwesomeIcon className={cx("icon")} icon={faAngleRight} />
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
                  key={item.code}
                  className={cx("text-price")}
                >
                  <FontAwesomeIcon className={cx("icon")} icon={faAngleRight} />
                  {item.value}
                </li>
              ))}
          </ul>
        </div>
        <NewPost />
      </div>
    </div>
  );
};

export default ListPost;
