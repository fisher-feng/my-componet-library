import React from "react";
import { MenuProps } from "./menu";
import { MenuItemProps } from "./menuItem";
import { SubMenuProps } from "./subMenu";
export declare type IMenuComponent = React.FC<MenuProps> & {
    Item: React.FC<MenuItemProps>;
    SubMunu: React.FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
