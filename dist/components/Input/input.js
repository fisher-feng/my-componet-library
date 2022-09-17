var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";
import Icon from '../Icon/icon';
export var Input = function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, className = props.className, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "className", "style"]);
    var classes = classNames('viking-input-wrapper', className, (_a = {
            'is-disabled': disabled
        },
        _a["input-size-".concat(size)] = size,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        //避免从非受控变为受控组件报错的情况
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue; //这样做的目的是为了避免报错
        restProps.value = fixControlledValue(props.value);
    }
    return (
    //根据属性是否要添加新的节点
    React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: "viking-input-group-prepend" }, prepend),
        React.createElement("div", { className: "viking-input-inner-wrapper" },
            icon && React.createElement("div", { className: "icon-wrapper" },
                React.createElement(Icon, { icon: icon, title: "title-".concat(icon) })),
            React.createElement("input", __assign({}, restProps, { disabled: disabled, className: "viking-input-inner" }))),
        append && React.createElement("div", { className: "viking-input-group-append" }, append)));
};
export default Input;
