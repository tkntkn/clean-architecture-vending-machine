import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VendingMachine } from "@/interface/pages/VendingMachine";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

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
  await userEvent.click(canvas.getByTestId("insert"));
  await expect(canvas.getAllByText("Inserted.")).toHaveLength(1);
};

export const Invalid = Template.bind({});
Invalid.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId("money"), "100円");
  await userEvent.click(canvas.getByTestId("insert"));
  await expect(canvas.getAllByText("Invalid Money.")).toHaveLength(1);
};
