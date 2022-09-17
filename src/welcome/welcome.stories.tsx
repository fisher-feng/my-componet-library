import React from "react";
import {storiesOf} from '@storybook/react'

storiesOf('Welcome page', module)
.add('welcome', () => {
  return (
    <>
      <h1>欢迎来到我的组件库</h1>
      <h3>安装试试</h3>
      <code>npm install fisher-ui0 --save</code>
    </>
  )
}, {
  info:{disable:true}
})
