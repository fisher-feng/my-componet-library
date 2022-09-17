import React from "react";
import Form, { FormProps } from "./form";
import FormItem, { FormItemProps } from "./formItem";

export type IFormComponent = React.FC<FormProps> & {
  Item:React.FC<FormItemProps>
}

export default Form