import React, { memo } from "react";

const Button = ({ text, icon, onclick, disabled }) => {
  return (
    <button disabled={disabled} type="button" onClick={onclick}>
      {text} {icon}
    </button>
  );
};

export default memo(Button);
