import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content of the button.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    disabled: {
      control: "boolean",
      description: "If `true`, the button will be disabled.",
      defaultValue: false,
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    onClick: {
      action: "onClick",
      table: {
        type: {
          summary: "(e: React.MouseEvent<HTMLButtonElement>) => void",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Base: Story = {
  args: {
    disabled: false,
    children: "Button",
  },
};
