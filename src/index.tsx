import React from "react";
import { useModal } from "./hooks";
import { Button, Input } from "@/components";

const App = () => {
  useModal();
  return (
    <div>
      <Input />
      <Button>Hello</Button>
      <h1>React App</h1>
    </div>
  );
};

export default App;
