import React from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu, { SubMenuProps } from "./subMenu";

export type IMenuComponent = React.FC<MenuProps> & {
  Item:React.FC<MenuItemProps>,
  SubMunu:React.FC<SubMenuProps>,
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem;
TransMenu.SubMunu = SubMenu;

export default TransMenu