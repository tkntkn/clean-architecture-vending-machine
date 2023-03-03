import { ComponentStory, ComponentMeta } from "@storybook/react";

import { WalletItem } from "./WalletItem";

export default {
  component: WalletItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof WalletItem>;

const Template: ComponentStory<typeof WalletItem> = (args) => <WalletItem {...args} />;

export const Coin = Template.bind({});
Coin.args = {
  item: [Symbol(), "玉"],
};

export const Bill = Template.bind({});
Bill.args = {
  item: [Symbol(), "札"],
};

export const Other = Template.bind({});
Other.args = {
  item: [Symbol(), ""],
};
