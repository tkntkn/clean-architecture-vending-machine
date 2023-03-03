import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VendingMachine } from "@/interface/pages/VendingMachine";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { dragAndDrop } from "@/utils/StorybookHelper";

export default {
  component: VendingMachine,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof VendingMachine>;

const Template: ComponentStory<typeof VendingMachine> = (args) => <VendingMachine {...args} />;

export const Main = Template.bind({});

async function earnToWallet(earned: string, canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId("earning"), earned);
  await userEvent.click(canvas.getByText("Earn"));
}

async function earnAndInsert(earned: string, canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await earnToWallet("100円玉", canvasElement);
  await dragAndDrop(canvas.getAllByText("100円玉")[0], canvas.getByText("Insert"));
}

async function earnAndInsertTwiceAndReturn(earned: string, canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await earnAndInsert(earned, canvasElement);
  await earnAndInsert(earned, canvasElement);
  await userEvent.click(canvas.getByTestId("return"));
}

export const EarnToWallet = Template.bind({});
EarnToWallet.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円玉$/)).toHaveLength(0);
  await earnToWallet("100円玉", canvasElement);
  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円玉$/)).toHaveLength(1);
};

export const Insert100 = Template.bind({});
Insert100.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^0円$/);
  await earnAndInsert("100円玉", canvasElement);
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^100円$/);
};

export const InsertInvalid = Template.bind({});
InsertInvalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円$/)).toHaveLength(0);
  await earnToWallet("100円", canvasElement);
  await dragAndDrop(canvas.getAllByText("100円")[0], canvas.getByText("Insert"));
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円$/)).toHaveLength(1);
};

export const Returns = Template.bind({});
Returns.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await earnAndInsertTwiceAndReturn("100円玉", canvasElement);
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^0円$/);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(2);
};

export const ReturnSlotToInert = Template.bind({});
ReturnSlotToInert.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await earnAndInsertTwiceAndReturn("100円玉", canvasElement);
  await dragAndDrop(canvas.getAllByText("100円玉")[0], canvas.getByText("Insert"));
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^100円$/);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(1);
};

export const ReturnSlotToWallet = Template.bind({});
ReturnSlotToWallet.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await earnAndInsertTwiceAndReturn("100円玉", canvasElement);
  await dragAndDrop(canvas.getAllByText("100円玉")[0], canvas.getByText("Wallet"));
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(1);
  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円玉$/)).toHaveLength(1);
};
