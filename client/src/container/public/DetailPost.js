import React from "react";
import Info from "./Info";
import NewPost from "./NewPost";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneVolume,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { img } from "../../assets";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";
//style
import classNames from "classnames/bind";
import styles from "./DetailPost.module.scss";
const cx = classNames.bind(styles);
const DetailPost = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  //convert thời gian
  function convertTime(inputTime) {
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    // Chuyển đổi chuỗi thời gian thành đối tượng Date
    const date = new Date(inputTime);

    // Lấy thông tin ngày, giờ, phút
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getUTCFullYear();

    // Kết hợp các phần lại thành chuỗi kết quả
    return `${dayOfWeek}, ${hours}:${minutes} ${day}/${month}/${year}`;
  }
  //hàm cắt chuỗi
  function getProvince(address) {
    // Kiểm tra nếu address là chuỗi hợp lệ
    if (!address || typeof address !== "string") {
      return "";
    }

    // Tìm vị trí dấu phẩy cuối cùng
    const lastCommaIndex = address.lastIndexOf(",");

    // Kiểm tra nếu có dấu phẩy
    if (lastCommaIndex !== -1) {
      // Lấy chuỗi từ sau dấu phẩy cuối cùng, đồng thời loại bỏ khoảng trắng thừa
      return address.slice(lastCommaIndex + 1).trim();
    }

    // Trường hợp không có dấu phẩy, trả về toàn bộ địa chỉ
    return address.trim();
  }

  function getDistrict(address) {
    // Kiểm tra nếu address là chuỗi hợp lệ
    if (!address || typeof address !== "string") {
      return "";
    }

    // Tìm vị trí dấu phẩy cuối cùng
    const lastCommaIndex = address.lastIndexOf(",");

    // Tìm vị trí dấu phẩy trước dấu phẩy cuối cùng
    const secondLastCommaIndex = address.lastIndexOf(",", lastCommaIndex - 1);

    // Kiểm tra nếu có ít nhất hai dấu phẩy
    if (secondLastCommaIndex !== -1) {
      // Lấy chuỗi từ sau dấu phẩy thứ hai và trước dấu phẩy cuối cùng, đồng thời loại bỏ khoảng trắng thừa
      return address.slice(secondLastCommaIndex + 1, lastCommaIndex).trim();
    }

    // Trường hợp không có dấu phẩy thứ hai, trả về toàn bộ địa chỉ
    return address.trim();
  }

  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const categories = useSelector((state) => state.app.category);

  useEffect(() => {
    postId && dispatch(action.getPostsLimit({ id: postId }));
  }, [postId]);
  console.log(posts);

  const images =
    posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image);
  return (
    <div className={cx("container")}>
      <h3>
        <a>
          {
            categories?.find(
              (category) => category.code === posts[0]?.categorycode
            )?.value
          }
        </a>
        / <a>{getProvince(posts[0]?.address)}</a> /{" "}
        <a>{getDistrict(posts[0]?.address)}</a>/ {posts[0]?.title}
      </h3>

      <div className={cx("detail")}>
        <div className={cx("detail-post")}>
          <div className={cx("post-img")}>
            <Slider {...settings}>
              {images &&
                images.map((image, index) => (
                  <div key={index} className={cx("img-focus")}>
                    <img src={image} alt={`slide-${index}`} />
                  </div>
                ))}
            </Slider>
          </div>
          <div className={cx("detail-content")}>
            <h1>{posts[0]?.title}</h1>
            <div className={cx("location")}>
              <FontAwesomeIcon className={cx("icon")} icon={faLocationDot} />
              <p>{posts[0]?.address}</p>
            </div>
            <div className={cx("content-price")}>
              <div className={cx("price")}>
                <h2>{posts[0]?.attributes?.price}</h2>
                <p>{posts[0]?.attributes?.acreage}</p>
                <p>{`Cập nhật: ${posts[0]?.attributes?.published}`}</p>
              </div>
              <p>{`Mã tin: #${posts[0]?.attributes?.hashtag}`}</p>
            </div>
            <div className={cx("decription")}>
              <h4>Thông tin mô tả</h4>
              <p>{posts[0]?.description}</p>
            </div>
            <div className={cx("map")}>
              <h4>Vị trí & Bản đồ</h4>
              <div className={cx("location")}>
                <FontAwesomeIcon className={cx("icon")} icon={faLocationDot} />
                <p>{posts[0]?.address}</p>
              </div>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  posts[0]?.address
                )}&output=embed`}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className={cx("character")}>
              <h4>Đặc điểm tin đăng</h4>
              <div className={cx("row-character")}>
                <ul className={cx("col-character")}>
                  <li>{`Mã tin: #${posts[0]?.attributes?.hashtag}`}</li>
                  <li>{`Ngày đăng: ${convertTime(posts[0]?.createdAt)}`} </li>
                </ul>
                <ul className={cx("col-character")}>
                  <li>
                    Gói tin: <span>Tin VIP nổi bật</span>
                  </li>
                  <li>
                    Ngày hết hạn: <span>Chủ Nhật, 10:39 15/12/2024</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx("contact")}>
              <h4>Thông tin liên hệ</h4>
              <div className={cx("contact-detail")}>
                <img src={posts[0]?.users?.avatar || img.avt} alt="anh" />
                <div className={cx("infor")}>
                  <h5>{posts[0]?.users?.name}</h5>
                  <p>{`Tham gia từ: ${convertTime(
                    posts[0]?.users?.createdAt
                  )}`}</p>
                  <div className={cx("btn-contact")}>
                    <button className={cx("btn-phone")}>
                      <a href={`tel:${posts[0]?.users?.phone}`}>
                        <FontAwesomeIcon icon={faPhoneVolume} />
                        {posts[0]?.users?.phone}
                      </a>
                    </button>
                    <button
                      className={cx("btn-zalo")}
                      onClick={() => {
                        window.open(
                          `https://zalo.me/${posts[0]?.users?.phone}`,
                          "_blank"
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faComment} />
                      Nhắn Zalo
                    </button>
                  </div>
                </div>
              </div>
              <div className={cx("note")}>
                <h4>Lưu ý:</h4>
                <p>
                  Chỉ đặt khi cọc xác định được chủ nhà và có thỏa thuận biên
                  nhận rõ ràng. Kiểm tra mọi điều khoản và yêu cầu liệt kê tất
                  cả chi phí hàng tháng vào hợp đồng
                </p>
                <p>
                  Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất
                  tham khảo. Nếu bạn thấy rằng tin đăng này không đúng hoặc có
                  dấu hiệu lừa đảo, hãy phản ánh với chúng tôi.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("detail-contact")}>
          <div className={cx("contact-detail")}>
            <img src={posts[0]?.users?.avatar || img.avt} alt="anh" />
            <div className={cx("infor")}>
              <h5>{posts[0]?.users?.name}</h5>
              <p>{`Tham gia từ: ${convertTime(posts[0]?.users?.createdAt)}`}</p>
              <div className={cx("btn-contact")}>
                <button className={cx("btn-phone")}>
                  <a href={`tel:${posts[0]?.users?.phone}`}>
                    <FontAwesomeIcon icon={faPhoneVolume} />
                    {posts[0]?.users?.phone}
                  </a>
                </button>
                <button
                  className={cx("btn-zalo")}
                  onClick={() => {
                    window.open(
                      `https://zalo.me/${posts[0]?.users?.phone}`,
                      "_blank"
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faComment} />
                  Nhắn Zalo
                </button>
              </div>
            </div>
          </div>
          <NewPost />
        </div>
      </div>
      <Info />
    </div>
  );
};

export default DetailPost;
