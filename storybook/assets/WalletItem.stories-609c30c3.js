var r=Object.defineProperty;var n=(o,l)=>r(o,"name",{value:l,configurable:!0});import{j as a}from"./jsx-runtime-a3a907ba.js";import{W as e}from"./WalletItem-515de4ea.js";import"./index-d1fc9049.js";import"./iframe-ea832777.js";const g={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";

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
`,locationsMap:{coin:{startLoc:{col:52,line:12},endLoc:{col:86,line:12},startBody:{col:52,line:12},endBody:{col:86,line:12}},bill:{startLoc:{col:52,line:12},endLoc:{col:86,line:12},startBody:{col:52,line:12},endBody:{col:86,line:12}},other:{startLoc:{col:52,line:12},endLoc:{col:86,line:12},startBody:{col:52,line:12},endBody:{col:86,line:12}}}}},component:e,argTypes:{backgroundColor:{control:"color"}}},t=n(o=>a.jsx(e,{...o}),"Template"),m=t.bind({});m.args={item:[Symbol(),"玉"]};const i=t.bind({});i.args={item:[Symbol(),"札"]};const c=t.bind({});c.args={item:[Symbol(),""]};const B=["Coin","Bill","Other"];export{i as Bill,m as Coin,c as Other,B as __namedExportsOrder,g as default};
//# sourceMappingURL=WalletItem.stories-609c30c3.js.map