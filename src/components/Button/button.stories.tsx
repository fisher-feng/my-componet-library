import React from "react";
import Button from "./button";
import mdx from './button.mdx'

import {ComponentMeta, ComponentStory} from '@storybook/react';

const buttonMeta:ComponentMeta<typeof Button> =  {
  title:'第四章:button',
  component:Button,
  parameters:{
    docs:{
      page:mdx
    }
  }
}

export default buttonMeta

//最基本的写法
// export const Default:ComponentStory<typeof Button> = (args) => (
//    <Button {...args}>Default Button</Button>
// )
// Default.storyName = '默认按钮样式';
// export const ButtonWidthSize:ComponentStory<typeof Button> = () => (
//   <>
//     <Button size="lg">large button</Button>
//     <Button size="lg">small button</Button>
//   </>
// )

// export const ButtonWidthType:ComponentStory<typeof Button> = () => (
//   <>
//     <Button btnType="primary">primary button</Button>
//     <Button btnType="danger">danger button</Button>
//     <Button btnType="link" href = 'https://www.baidu.com'>link button</Button>
    
//   </>
// )

// ButtonWidthType.storyName = '不同类型的按钮'

//减少重复代码的写法
const Template:ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
)
export const Default = Template.bind({});// 不用 bind 的话，我们可能要写一些重复的函数,每次都指向新的地址
Default.args = {
  children:'Default Button'
} 
Default.storyName = '默认样式的按钮'

//装饰器添加margin
// Default.decorators = [
//   (Story) => (
//     <div style={{margin:'50px'}}><Story/></div>
//   )
// ]

export const Small = Template.bind({});
Small.args = {
  children:'Small Button',
  size:'sm',
} 

export const Primary = Template.bind({});
Primary.args = {
  children:'Primary Button',
  btnType:'primary'
} 

export const Danger = Template.bind({});
Danger.args = {
  children:'Danger Button',
  btnType:'danger'
} 

export const Link = Template.bind({});
Link.args = {
  children:'Link Button',
  btnType:'link'
} 
