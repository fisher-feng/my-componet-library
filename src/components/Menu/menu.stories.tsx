import React from "react";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

import {addParameters, ComponentMeta, ComponentStory} from '@storybook/react';

const menuMeta:ComponentMeta<typeof Menu> =  {
  title:'Menu',
  id:'Menu',
  component:Menu,
  subcomponents:{'SubMenu':SubMenu,'MenuItem':MenuItem},
  args:{
    defaultIndex:"2"
  },
  // argTypes:{
  //   defaultIndex:{
  //     control:'color',
  //     description:'normal test'
  //   }
  // },
  // parameters: {
  //   controls:{
  //     matchers:{
  //        date:/mode$/,//把mode开头转换成date格式
  //     }
  //   }
  // }
  
}

export default menuMeta

const Template:ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项1
      </MenuItem>
      <MenuItem>
        下拉选项2
      </MenuItem>
    </SubMenu>
  </Menu>
)

export const DefaultMenu = Template.bind({});
//修改action输入类型
// DefaultMenu.argTypes = {
//   defaultIndex:{
//     control:"color",
//     description:'normal test'
//   }
// }
export const ClickMenu = Template.bind({});
ClickMenu.args = {
  defaultIndex:'1',
  mode:"vertical",
}

//storybook页面配置，也可以在preview配置
ClickMenu.parameters = {
  backgrounds:{
    values: [
      {name:'red', value:'#ff0'},
      {name:'green', value:'#0f0'}
    ]
  }
}


ClickMenu.storyName = '纵向的Memu'