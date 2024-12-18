import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchItem.module.scss";

const cx = classNames.bind(styles);

const Popup = ({ title, options = [], selectedOption, onClose, onSelect }) => {
  const [selected, setSelected] = useState(selectedOption || null);

  const handleSelect = (value) => {
    setSelected(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className={cx("popup-overlay")}>
      <div className={cx("popup-content")}>
        <button className={cx("close-button")} onClick={onClose}>
          X
        </button>
        <h2>{title}</h2>
        <div className={cx("popup-body")}>
          {options.map((option, index) => (
            <label key={index} className={cx("radio-item")}>
              <input
                type="radio"
                name="popup-options"
                value={option.value}
                checked={selected === option.value}
                onChange={() => handleSelect(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
