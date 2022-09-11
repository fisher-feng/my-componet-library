import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";
import classNames from "classnames";
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
type InputSize  = 'lg' | 'sm';
//Omit忽略掉size属性
export interface InputProps extends Omit< InputHTMLAttributes<HTMLElement>,'size'>{ 
  disabled?:boolean;
  size?:InputSize;
  icon?:IconProp;
  prepend?:string | ReactElement;
  append?:string | ReactElement;
  className?:string;
  onChange?:(e:ChangeEvent<HTMLInputElement>) => void;
}

export const Input:React.FC<InputProps> = (props, ref) => {
  const {disabled, size, icon, prepend, append, className, style, ...restProps } = props;
  const classes = classNames('viking-input-wrapper', className, {
    'is-disabled':disabled,
    [`input-size-${size}`]:size,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    //避免从非受控变为受控组件报错的情况
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value 
  }
  if('value' in props) {
    delete restProps.defaultValue;//这样做的目的是为了避免报错
    restProps.value = fixControlledValue(props.value)
  }
  return (
    //根据属性是否要添加新的节点
    <div className= {classes} style = {style}>
      {prepend&&<div className="viking-input-group-prepend">{prepend}</div>}
      <div className="viking-input-inner-wrapper">
        {icon&&<div className="icon-wrapper"><Icon icon={icon} title = {`title-${icon}`}></Icon></div>}
        <input 
          // ref={ref}
          {...restProps} 
          disabled = {disabled}
          className="viking-input-inner"
        />
      </div>
      {append &&  <div className="viking-input-group-append">{append}</div> }
    </div>
  )
}

export default Input