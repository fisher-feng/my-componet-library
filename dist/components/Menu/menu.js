import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: '0' });
export var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, onSelect = props.onSelect, style = props.style, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child; //??
            var displayName = childElement.type.displayName; //拿到这个dislayname有啥用？
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(), //给childElement赋予一个index属性，这样就不用手动添加index了
                });
            }
            else {
                console.error('warning :Menu has a child which is not a MenuItem');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: "horizontal",
    defaultOpenSubMenus: []
};
export default Menu;
