import React, { InputHTMLAttributes, ReactElement } from "react";
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
   
}

export const Input:React.FC<InputProps> = (props, ref) => {
  const {disabled, size, icon, prepend, append, className, style, ...resprops } = props;
  const classes = classNames('viking-input-wrapper', className, {
    'is-disabled':disabled,
    [`input-size-${size}`]:size,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  return (
    //根据属性是否要添加新的节点
    <div className= {classes} style = {style}>
      {prepend&&<div className="viking-input-group-prepend">{prepend}</div>}
      <div className="viking-input-inner-wrapper">
        {icon&&<div className="icon-wrapper"><Icon icon={icon} title = {`title-${icon}`}></Icon></div>}
        <input 
          // ref={ref}
          {...resprops} 
          disabled = {disabled}
          className="viking-input-inner"
        />
      </div>
      {append &&  <div className="viking-input-group-append">{append}</div> }
    </div>
  )
}

export default Input