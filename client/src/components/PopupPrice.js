import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchItem.module.scss";

const cx = classNames.bind(styles);

const Popup = ({ title, options = [], selectedOption, onClose, onSelect }) => {
  const [selected, setSelected] = useState(selectedOption || null);

  const handleSelect = (value) => {
    setSelected(value);
    if (onSelect) {
      onSelect(value); // Gửi giá trị đã chọn ra bên ngoài
    }
  };

  return (
    <div className={cx("popup-overlay")}>
      <div className={cx("popup-content")}>
        <button className={cx("close-button")} onClick={onClose}>
          X
        </button>
        <h2 className={cx("title")}>{title}</h2>
        <div className={cx("popup-body")}>
          {options.map((option, index) => (
            <button
              key={index}
              className={cx("option-button", {
                selected: selected === option.value, // Đánh dấu nút được chọn
              })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
