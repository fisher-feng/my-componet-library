import React from "react";
import Icon from "./icon";
import {ComponentMeta,} from '@storybook/react';//用于手动改变属性？？
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
const iconMeta:ComponentMeta<typeof Icon> =  {
  title:'Icon',
  id:'Icon',
  component:Icon,
}

export default iconMeta

export const DefaultIcon  = () => (
  <>
    <Icon icon="times" size="3x"/>
    <Icon icon="check" size="3x"/>
    <Icon icon="spinner" pulse size="3x"/>
    <Icon icon="search" size="3x"/>
    <Icon icon="exclamation-circle" size="3x" />
  </>
)
DefaultIcon.storyName = '公司常用icon'

export const ADefaultIcons = () => (
  <>
    <Icon icon="search" size="3x"/>
    <Icon icon="times" size="3x"/>
    <Icon icon="anchor" size="3x"/>
    <Icon icon="trash" size="3x"/>
  </>
)
ADefaultIcons.storyName = "默认图标"
export const BThemeIcons = () => (
  <>
    <Icon icon="check" size="3x" theme="success"/>
    <Icon icon="times" size="3x" theme="danger"/>
    <Icon icon="anchor" size="3x" theme="primary"/>
    <Icon icon="exclamation-circle" size="3x" theme="warning" />
  </>
)
BThemeIcons.storyName = "不同主题的 Icon"
export const CCustomIcons = () => (
  <>
    <Icon icon="spinner" size="3x" theme="primary" spin/>
    <Icon icon="spinner" size="3x" theme="success" pulse/>
  </>
)
CCustomIcons.storyName = "更多行为的 Icon"