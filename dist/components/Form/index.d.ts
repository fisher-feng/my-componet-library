import React from "react";
import Form, { FormProps } from "./form";
import { FormItemProps } from "./formItem";
export declare type IFormComponent = React.FC<FormProps> & {
    Item: React.FC<FormItemProps>;
};
export default Form;
