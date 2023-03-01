import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VendingMachine } from "@/interface/pages/VendingMachine";

export default {
  component: VendingMachine,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof VendingMachine>;

const Template: ComponentStory<typeof VendingMachine> = (args) => <VendingMachine {...args} />;

export const Main = Template.bind({});
