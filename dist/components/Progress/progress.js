import React from "react";
var Progress = function (props) {
    var percent = props.percent, stroKeHight = props.stroKeHight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "viking-progress-bar", style: styles },
        React.createElement("div", { className: "viking-progress-bar-outer", style: { height: stroKeHight } },
            React.createElement("div", { className: "viking-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, showText && React.createElement("span", { className: "inner-text" }, "".concat(percent, "%"))))));
};
Progress.defaultProps = {
    stroKeHight: 15,
    showText: true,
    theme: 'primary',
};
export default Progress;
