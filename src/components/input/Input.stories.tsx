import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: (props) => {
    const [value, setValue] = useState(props.value ?? "");

    useEffect(() => {
      setValue(props.value ?? "");
    }, [props.value]);

    return (
      <Input
        {...props}
        value={value}
        onChange={(value, e) => {
          setValue(value);
          props.onChange?.(value, e);
        }}
      />
    );
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The value of the input.",
      table: {
        type: {
          summary: "string",
        },
      },
      defaultValue: "",
    },
    onChange: {
      action: "onChange",
      table: {
        type: {
          summary:
            "(value: string, event: React.ChangeEvent<HTMLInputElement>) => void",
        },
      },
    },
    placeholder: {
      control: "text",
      description: "The placeholder of the input.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    type: {
      control: "radio",
      options: ["text", "password", "email"],
      description: "The type of the input.",
      table: {
        type: {
          summary: ["text", "password", "email"].join(" | "),
        },
        defaultValue: {
          summary: "text",
        },
      },
      defaultValue: "text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled.",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Base: Story = {
  args: {
    placeholder: "",
    disabled: false,
    type: "text",
    value: "",
  },
};
