import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VendingMachine } from "@/interface/pages/VendingMachine";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { dragAndDrop } from "@/utils/StorybookHelper";
import exp from "constants";

export default {
  component: VendingMachine,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof VendingMachine>;

const Template: ComponentStory<typeof VendingMachine> = (args) => <VendingMachine {...args} />;

export const Main = Template.bind({});

export const Valid = Template.bind({});
Valid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId("money"), "100円玉");
  await userEvent.click(canvas.getByText("Insert"));
  await expect(canvas.getAllByText("Inserted.")).toHaveLength(1);
};

export const Invalid = Template.bind({});
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId("money"), "100円");
  await userEvent.click(canvas.getByText("Insert"));
  await expect(canvas.getAllByText("Invalid Money.")).toHaveLength(1);
};

export const EarnToWallet = Template.bind({});
EarnToWallet.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // 前提条件
  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円$/)).toHaveLength(0);

  // 操作
  await userEvent.type(canvas.getByTestId("earning"), "100円");
  await userEvent.click(canvas.getByText("Earn"));

  // 結果
  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円$/)).toHaveLength(1);
};

export const DragAndDrop = Template.bind({});
DragAndDrop.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // 操作
  await userEvent.type(canvas.getByTestId("money"), "100円玉");
  await userEvent.click(canvas.getByText("Insert"));

  // 結果
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^100円$/);
  await userEvent.type(canvas.getByTestId("money"), "100円玉");
  await userEvent.click(canvas.getByText("Insert"));

  // 結果
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^200円$/);

  // 操作
  await userEvent.click(canvas.getByTestId("return"));

  // 結果
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^0円$/);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(2);

  // 操作
  await dragAndDrop(canvas.getAllByText("100円玉")[0], canvas.getByText("Insert"));

  // 結果
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^100円$/);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(1);
};
