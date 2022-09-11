import React from "react";
import Input, {InputProps} from "./input";
import {addParameters, ComponentMeta, ComponentStory} from '@storybook/react';

const inputMeta:ComponentMeta<typeof Input> =  {
  title:'Input',
  id:'Input',
  component:Input,
}

export default inputMeta

const Template:ComponentStory<typeof Input> = (args:InputProps) => (
 <Input style={{width:400}} {...args}></Input>
)

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  size:'lg',
  placeholder:'默认的input',
}
DefaultInput.storyName = '默认的input'

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  size:'lg',
  placeholder:'默认的input',
}
DisabledInput.storyName = '被禁用的disabled'

export const WidthDiffrenInput = () => {
  return (
    <>
      <Template size='lg' placeholder = 'please Input'/>
      <Template size="sm" placeholder = 'please Input'/>
    </>
  )
}
WidthDiffrenInput.storyName = '不同大小的input'

export const IconInput = () => {
  return (
    <>
      <Template  icon='search'  placeholder = 'please Input'/>
    </>
  )
}
IconInput.storyName = '带icon的 Input'

export const EPandInput = () => {
  return (
    <>
      <Template  icon ='search' placeholder = 'please Input'/>
      <Template  icon = 'search' prepend='https://' defaultValue='baidu.com'/>
      <Template  icon = 'search' append='.com' defaultValue='https://baidu'/>
      <Template  icon = 'search' prepend='https://' append='.com' defaultValue='baidu'/>
    </>
  )
}
EPandInput.storyName = '带前后缀的 Input'
