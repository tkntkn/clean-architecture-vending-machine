var c=Object.defineProperty;var n=(t,s)=>c(t,"name",{value:s,configurable:!0});import{j as o}from"./jsx-runtime-e04a5a32.js";import{r as l}from"./index-ce09b455.js";import"./iframe-a9409c24.js";const i="/clean-architecture-vending-machine/storybook/assets/react-35ef61ed.svg";function e(t){const[s,a]=l.useState(0);return o.jsxs("div",{className:"Root",children:[o.jsxs("div",{children:[o.jsx("a",{href:"https://vitejs.dev",target:"_blank",children:o.jsx("img",{src:"/vite.svg",className:"Root-logo",alt:"Vite logo"})}),o.jsx("a",{href:"https://reactjs.org",target:"_blank",children:o.jsx("img",{src:i,className:"Root-logo--react",alt:"React logo"})})]}),o.jsx("h1",{className:"Root-h1",children:"Vite + React"}),o.jsxs("div",{className:"Root-card",children:[o.jsxs("button",{className:"Root-button",onClick:()=>a(r=>r+1),children:["count is ",s]}),o.jsxs("p",{children:["Edit ",o.jsx("code",{children:"src/App.tsx"})," and save to test HMR"]})]}),o.jsx("p",{className:"Root-readTheDocs",children:"Click on the Vite and React logos to learn more"})]})}n(e,"Root");try{e.displayName="Root",e.__docgenInfo={description:"",displayName:"Root",props:{}}}catch{}const x={component:e,parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Root } from "@/interface/pages/Root";

export default {
  component: Root,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Root>;

const Template: ComponentStory<typeof Root> = (args) => <Root {...args} />;

export const Main = Template.bind({});
`,locationsMap:{main:{startLoc:{col:46,line:11},endLoc:{col:74,line:11},startBody:{col:46,line:11},endBody:{col:74,line:11}}}},layout:"fullscreen"}},p=n(t=>o.jsx(e,{...t}),"Template"),g=p.bind({}),u=["Main"];export{g as Main,u as __namedExportsOrder,x as default};
//# sourceMappingURL=Root.stories-8ba826a3.js.map
