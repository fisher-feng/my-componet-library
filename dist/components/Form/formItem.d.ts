import React from "react";
import { CustomRule } from "./useStore";
export interface FormItemProps {
    name: string;
    label?: string;
    children?: React.ReactNode;
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (event: any) => any;
    rules?: CustomRule[];
    validateTrigger?: string;
}
export declare type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
declare const FormItem: React.FC<FormItemProps>;
export default FormItem;
