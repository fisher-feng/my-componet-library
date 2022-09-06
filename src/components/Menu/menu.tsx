import React, {createContext, useState}  from "react";
import classNames from "classnames";
import MenuItem from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex:number) => void;

export interface MenuProps {
  defaultIndex?:number;
  className?:string;
  mode?:MenuMode;
  style?:React.CSSProperties;
  onSelect?:SelectCallback;
  children?:React.ReactNode;
}

interface IMenuContext {
  index:number;
  onSelect?:SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index:0});

const Menu:React.FC<MenuProps> = (props) => {
  const {defaultIndex, className, mode, onSelect, style, children} = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames(
    'viking-menu',
    className,
    {
      'menu-vertical':mode === 'vertical',
      'menu-horizontal':mode === 'horizontal',
    }
  );

  const handleClick = (index:number) => {
    setActive(index);
    if(onSelect) {
      onSelect(index);
    }
  }

  const passedContext : IMenuContext = {
    index:currentActive? currentActive : 0,
    onSelect:handleClick,
  }

  return (
    <ul className= {classes} style = {style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex:0,
  mode:"horizontal",
}

export default Menu;

