import React from "react";
import { ButtonProps } from "./Button.types";

const Button = (props: ButtonProps) => {
  return <button>{props.children}</button>;
};

export default Button;
