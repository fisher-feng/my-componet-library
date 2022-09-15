import React, {useContext, useEffect} from "react";
import classNames from "classnames";
import {FormContext} from './form'
import { RuleItem } from "async-validator";
import {CustomRule} from "./useStore";
export interface FormItemProps {
  name:string;
  label?: string;
  children?:React.ReactNode;
  valuePropName?:string;
  trigger?:string;//改变的值的回调是什么
  //child的value改变返回值的方式是什么
  getValueFromEvent?:(event:any) => any;
  rules?:CustomRule[];
  validateTrigger?:string,
}

export type SomeRequired<T, K extends keyof T> = Required< Pick<T, K>> & Omit<T, K>
type TestType = SomeRequired<FormItemProps, 'getValueFromEvent'>

const FormItem:React.FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger,
  } = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>;
  const rowClass = classNames('viking-row', {
    'viking-row-no-label':!label,
  });

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || '';
    dispatch({type:'addField', name, value:{label, name, value, rules: rules || [], errors:errors || [], isValid:true}});
  }, []);
  const {dispatch, fields, initialValues, validateField} = useContext(FormContext) ;
  //获取store对应的value
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState && fieldState.errors;
  const isRequire = rules?.some(rule => (typeof rule !=='function') && rule.required);
  const hasError = errors && errors.length > 0;
  const labelClass = classNames({
    'viking-form-item-required': isRequire,
  })
  const itemClass = classNames('viking-form-item-control',{
    'viking-form-item-has-error':hasError,
  })
  const onValueUpdate = (e:any) => {
    const value = getValueFromEvent(e);
    console.log('new value', value);
    dispatch({type:'updateValue', name, value});
  }
  const onValueValidate = async () => {
    await validateField(name);
  }
  //1 手动创建一个属性列表，需要有value以及onChange属性
  const controlProps:Record<string, any> = {}
  controlProps[valuePropName] = value || '';
  controlProps[trigger] = onValueUpdate;
  //适应不同事件以及value属性名称
  if(rules) {
    controlProps[validateTrigger] = onValueValidate;
  }
  //2 获取children数组第一个元素
  const childList = React.Children.toArray(children);
  if(childList.length === 0) {
    console.error('child element found in Form.Item, please provide on from componet');
  }
  if(childList.length > 1) {
    console.warn('Only support on child element in Form.Item, others will be omitted ');
  }
  //不是reactElement组件
  if(!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element');
  }

  const child = childList[0] as React.ReactElement;

  //3 cloneElement, 混合这个child 以及 手动的属性列表
  const returnChildNode = React.cloneElement(
    child, 
    {
       ...child.props,
       ...controlProps, 
    }
  )  
  return (
    <div className={rowClass}>
      {label &&
        <div className="viking-form-item-label">
          <label title= {label} className = {labelClass}>
            {label}
          </label>
        </div>
      }
      <div className="viking-form-item">
        <div className={itemClass}>
          {returnChildNode}
        </div>
        {hasError && 
          <div className="viking-form-item-explain">
            <span>{errors[0].message}</span>
          </div>
        }
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName:'value',
  trigger:'onChange',
  getValueFromEvent:(e:any) => e.target.value,
  validateTrigger:"onBlur",
}
export default FormItem