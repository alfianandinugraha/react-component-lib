import { useState } from "react";
import { randomId } from "@/utils";

const useModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal((state) => !state);

  return { modal, toggle };
};

export default useModal;
