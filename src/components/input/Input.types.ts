import React from "react";

export type InputProps = {
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  value?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  disabled?: boolean;
};

export default {};
