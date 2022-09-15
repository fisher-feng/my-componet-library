import React, { useRef } from "react";
import { ComponentMeta } from "@storybook/react";
import Form, {IFormRef} from './form'
import FormItem from "./formItem";
import Input from "../Input/input";
import Button from "../Button/button";
import {CustomRule} from "./useStore";

const meta:ComponentMeta<typeof Form> = {
  title:'Form',
  id:"Form",
  component:Form,
  subcomponents:{'Item':FormItem},
  decorators:[
    (Story) => (
      <div style={{width:600}}>
        <Story />
      </div>
    )
  ]
}

export default meta;
const confirmRules:CustomRule[] = [
  {type:'string', required:true, min:3, max:8},
  //增加自定义验证
  ({getFieldValue}) => ({
    asyncValidator(rule, value) {
      console.log('the value', getFieldValue('password'));
      console.log(value);
      return new Promise((resolve, reject) => {
        if(value !== getFieldValue('password')){
          reject('the two password that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 500)
      })
    }
  })
] 
export const BasicForm = (args:any) => {
  const ref = useRef<IFormRef>();
  const resetAll = () => {
    ref.current?.resetFields();
    console.log('form ref', ref.current);
    console.log('value', ref.current?.getFieldValue('username'));

  }
  return (
    <Form initialValues={{'username':'ssss', checkbox:true }} {...args} ref={ref} >
      { ({ isValid, isSubmitting }) => (
      <>
      <FormItem label="用户名" name="username" rules={[{type:'email', required: true}]} >
        <Input name="username" placeholder="please Input username" />
      </FormItem>
      <FormItem label="密码" name="password">
        <Input type='password' placeholder="please Input password "/>
      </FormItem>
      <FormItem label="重复密码" name="confirmPwd" rules={confirmRules}>
        <Input type='password' placeholder="please Input password "/>
      </FormItem>
      <FormItem name="">
        <Input placeholder="no-label" name="no-label"/>
      </FormItem>
      <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
        <FormItem name="checkbox" valuePropName="checked" getValueFromEvent={(e) => e.target.checked} rules = {[{type:'enum', enum:[true], message:"请同意协议"}]}>
          <Input type="checkbox"/>
        </FormItem>
        <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
      </div>
      <div className="viking-form-submit-area">
        <Button type="submit" btnType="primary">登陆{isSubmitting?'验证中' :' 验证完毕'} {isValid?'验证成功' :' 验证失败'} </Button>
        <Button type="button" onClick={resetAll}>重置</Button>
      </div>
      </>
    )}
    </Form>
  )
}