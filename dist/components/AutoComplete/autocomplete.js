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
import React, { useEffect, useState, useRef } from "react";
import Input from "../Input/input";
import classNames from "classnames";
import Icon from "../Icon/icon";
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from "../../hooks/useClickOutside";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, resProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var classese = classNames('viking-auto-complete');
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggesions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 300);
    useClickOutside(componentRef, function (event) {
        setSuggesions([]);
    });
    useEffect(function () {
        if (inputValue && triggerSearch.current) {
            var results = fetchSuggestions(inputValue);
            if (results instanceof Promise) {
                console.log('triggered');
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggesions(data);
                });
            }
            else {
                setSuggesions(results);
            }
        }
        else {
            setSuggesions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggesions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item, index) {
            var className = classNames('suggestion-item', {
                'item-highlight': index === highlightIndex,
            });
            return (React.createElement("li", { key: index, className: className, onClick: function () { handleSelect(item); } }, renderTemplate(item)));
        })));
    };
    var lighlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        else if (index >= suggestions.length) {
            index = suggestions.length;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    setInputValue(suggestions[highlightIndex].value);
                    triggerSearch.current = false;
                }
                break;
            case 'ArrowUp':
                lighlight(highlightIndex - 1);
                break;
            case 'ArrowDown':
                lighlight(highlightIndex + 1);
                break;
            case 'Escape':
                setSuggesions([]);
                break;
            default: break;
        }
    };
    return (React.createElement("div", { className: classese, ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue }, resProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        loading && React.createElement("ul", null,
            React.createElement(Icon, { icon: 'spinner', spin: true })),
        setSuggesions.length > 0 && generateDropdown()));
};
export default AutoComplete;
