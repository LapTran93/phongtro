import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";
import { Link } from "react-router-dom";
import { formatVietNamtoString } from "../../ultils/constants";
//style
import classNames from "classnames/bind";
import styles from "./NewPost.module.scss";
const cx = classNames.bind(styles);

const NewPost = () => {
  const { newpost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getNewPost());
  }, []);
  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className={cx("container")}>
      <h3>Tin mới đăng</h3>
      {newpost?.length > 0 &&
        newpost.map((item) => {
          return (
            <Link
              to={`/chi-tiet/${formatVietNamtoString(item?.title)}/${item?.id}`}
              key={item.id}
              className={cx("item-post")}
            >
              <img
                src={(() => {
                  const parsedImages = JSON.parse(item.images.image);
                  return parsedImages[0];
                })()}
                alt="post image"
              />
              <div className={cx("post-content")}>
                <h4>{truncateText(item.title, 9)}</h4>
                <div className={cx("post-price")}>
                  <p className={cx("price")}>{item.attributes.price}</p>
                  <p className={cx("time")}>{item.attributes.published}</p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default NewPost;
