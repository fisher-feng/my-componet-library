import React, {createContext, forwardRef, useImperativeHandle} from "react";
import {ValidateError} from 'async-validator'
import classNames from "classnames";
import useStore, { FormState } from "./useStore";
export type RenderProps = (form:FormState) => React.ReactNode;
export interface FormProps {
  name?:string;
  children?:React.ReactNode | RenderProps;
  initialValues?: Record<string, any>;
  onFinish?:(values:Record<string, any>) => void; 
  onFinishFailed?:(values:Record<string, any>, errors:Record<string, ValidateError[]>) => void;
}

export type  IFormContext = 
  Pick< ReturnType<typeof useStore>, 'dispatch' | 'fields'| 'validateField'> 
  & Pick<FormProps, 'initialValues'>
export type IFormRef = Omit< ReturnType<typeof useStore>,'fields' | 'dispatch' | 'form'>
export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const {
    name, 
    children,
    initialValues,
    onFinish,
    onFinishFailed,
  } = props;

  const {
    form, 
    fields, 
    dispatch, 
    ...restProps
  } = useStore(initialValues);

  const {
    validateField,
    validateAllField,
  } = restProps;

  //用于暴露组件实例的方法
  useImperativeHandle(ref, () => {
    return {
      ...restProps,//暴露方法
    }
  })

  const passedContext:IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  }

  const submitForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const {isValid, errors, values} = await validateAllField();
    if(isValid && onFinish) {
      onFinish(values);
    } else if(!isValid && onFinishFailed) {
      onFinishFailed(values, errors);
    }
  }

  let childrenNode:React.ReactNode;
  if(typeof children === 'function') {
    childrenNode = children(form);
  }else {
    childrenNode = children;
  }
  return (
    <>
      <form name = {name} className = "viking-form" onSubmit={submitForm} >
       <FormContext.Provider value={passedContext}>
         {childrenNode}
       </FormContext.Provider>
      </form>
      <div>
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(fields)}</pre>
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
})

Form.defaultProps = {
  name:'viking-form',
}
export default  Form
