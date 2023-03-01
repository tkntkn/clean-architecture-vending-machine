import { ComponentStory, ComponentMeta } from "@storybook/react";
import Root from "@/interface/pages/Root";

export default {
  component: Root,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Root>;

const Template: ComponentStory<typeof Root> = (args) => <Root {...args} />;

export const Main = Template.bind({});
