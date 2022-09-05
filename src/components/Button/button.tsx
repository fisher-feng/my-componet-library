import React from 'react'
import classNames from 'classnames'; 
export enum ButtonSize {
  Large = "lg",
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className ?:string;
  disabled?:boolean;
  size ?:ButtonSize;
  btnType ?:ButtonType;
  children?:React.ReactNode;
  href?:string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement> 
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement> 
export type ButtonProps = Partial< NativeButtonProps & AnchorButtonProps> //设置成可选属性

const Button:React.FC<ButtonProps> = (props) => {
  const {
    className, 
    disabled, 
    size, 
    btnType, 
    children,
    href,
    ...resProps
  } = props;
  const classes = classNames(
    'btn',
    className,
    {
      [`btn-${btnType}`]:btnType,
      [`btn-${size}`]:size,
      'disabled':btnType === ButtonType.Link && disabled,
    }
  )
  if(btnType === ButtonType.Link && href) {
    return (
      <a 
        href={href}
        className = {classes}
        {...resProps}
      >
        {children}
      </a>
    )
  }else {
    return (
      <button
        className= {classes}
        disabled = {disabled} 
        {...resProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled:false,
  btnType:ButtonType.Default
}

export default Button
