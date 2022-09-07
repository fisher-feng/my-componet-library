import React, {createContext, useState}  from "react";
import classNames from "classnames";
import  {MenuItemProps} from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex:string) => void;

export interface MenuProps {
  defaultIndex?:string;
  className?:string;
  mode?:MenuMode;
  style?:React.CSSProperties;
  onSelect?:SelectCallback;
  children?:React.ReactNode;
  defaultOpenSubMenus?:string[];
}

interface IMenuContext {
  index:string;
  onSelect?:SelectCallback;
  mode?:MenuMode;
  defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index:'0'});

const Menu:React.FC<MenuProps> = (props) => {
  const {defaultIndex, className, mode, onSelect, style, children, defaultOpenSubMenus} = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames(
    'viking-menu',
    className,
    {
      'menu-vertical':mode === 'vertical',
      'menu-horizontal':mode === 'horizontal',
    }
  );

  const handleClick = (index:string) => {
    setActive(index);
    if(onSelect) {
      onSelect(index);
    }
  }

  const passedContext : IMenuContext = {
    index:currentActive? currentActive : '0',
    onSelect:handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {//children 和child的区别？
      const childElement = child as React.FunctionComponentElement<MenuItemProps>//??
      const {displayName} = childElement.type;//拿到这个dislayname有啥用？
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { 
          index:index.toString(),//给childElement赋予一个index属性，这样就不用手动添加index了
        })
      }else {
        console.error('warning :Menu has a child which is not a MenuItem')
      }

    })
  }

  return (
    <ul className= {classes} style = {style} data-testid = "test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex:'0',
  mode:"horizontal",
  defaultOpenSubMenus:[]
}

export default Menu;

