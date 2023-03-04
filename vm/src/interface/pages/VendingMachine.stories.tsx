import "@/interface/index.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VendingMachine } from "@/interface/pages/VendingMachine";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { dragAndDropPointer } from "@/utils/StorybookHelper";
import { timer } from "@/utils/PromiseHelper";

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
  await timer(100);
  await userEvent.click(canvas.getByText("Earn"));
}

async function earnAndInsert(earned: string, canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await earnToWallet(earned, canvasElement);
  await timer(100);
  await dragAndDropPointer(canvas.getAllByText(earned)[0], canvas.getByTitle("insert"));
  await timer(600);
}

async function earnAndInsertTwiceAndReturn(earned: string, canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await earnAndInsert(earned, canvasElement);
  await timer(100);
  await earnAndInsert(earned, canvasElement);
  await timer(100);
  await userEvent.click(canvas.getByTestId("return"));
}

export const EarnToWallet = Template.bind({});
EarnToWallet.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await timer(500);

  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円玉$/)).toHaveLength(0);
  await earnToWallet("100円玉", canvasElement);
  await timer(100);
  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円玉$/)).toHaveLength(1);
};

export const Insert100 = Template.bind({});
Insert100.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await timer(500);

  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^0円$/);
  await earnAndInsert("100円玉", canvasElement);
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^100円$/);
};

export const InsertInvalid = Template.bind({});
InsertInvalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await timer(500);

  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円$/)).toHaveLength(0);
  await earnToWallet("100円", canvasElement);
  await timer(100);
  await dragAndDropPointer(canvas.getAllByText("100円")[0], canvas.getByTitle("insert"));
  await timer(600);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円$/)).toHaveLength(1);
};

export const Returns = Template.bind({});
Returns.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await timer(500);

  await earnAndInsertTwiceAndReturn("100円玉", canvasElement);
  await timer(100);
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^0円$/);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(2);
};

export const ReturnSlotToInert = Template.bind({});
ReturnSlotToInert.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await timer(500);

  await earnAndInsertTwiceAndReturn("100円玉", canvasElement);
  await timer(100);
  await dragAndDropPointer(canvas.getAllByText("100円玉")[0], canvas.getByTitle("insert"));
  await timer(600);
  await expect(canvas.getByTestId("inserted")).toHaveTextContent(/^100円$/);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(1);
};

export const ReturnSlotToWallet = Template.bind({});
ReturnSlotToWallet.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await timer(500);

  await earnAndInsertTwiceAndReturn("100円玉", canvasElement);
  await timer(100);
  await dragAndDropPointer(canvas.getAllByText("100円玉")[0], canvas.getByTestId("wallet"));
  await timer(100);
  await expect(within(canvas.getByTestId("returnSlot")).queryAllByText(/^100円玉$/)).toHaveLength(1);
  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円玉$/)).toHaveLength(1);
};

export const WalletToWallet = Template.bind({});
WalletToWallet.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await timer(500);

  await earnToWallet("100円玉", canvasElement);
  await timer(100);
  await earnToWallet("100円玉", canvasElement);
  await timer(100);
  await dragAndDropPointer(canvas.getAllByText("100円玉")[1], canvas.getByTestId("wallet"));
  await expect(within(canvas.getByTestId("wallet")).queryAllByText(/^100円玉$/)).toHaveLength(2);
};
