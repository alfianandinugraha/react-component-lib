import React from "react";
import { ButtonProps } from "./Button.types";

const Button = (props: ButtonProps) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
