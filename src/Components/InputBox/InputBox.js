import React from "react";

export const InputBox = (props) => {
  const { placeholder, name, onChange, value, onKeyUp } = props;
  return (
    <input
      type="text"
      className="custom-input mt-1"
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      onKeyUp={onKeyUp}
    />
  );
};
