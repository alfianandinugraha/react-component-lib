import React from "react";
import { InputProps } from "./Input.types";

const Input = (props: InputProps) => {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value ?? ""}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChange?.(e.target.value, e);
      }}
      disabled={props.disabled}
    />
  );
};

export default Input;
