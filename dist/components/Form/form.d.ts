import React from "react";
import { ValidateError } from 'async-validator';
import useStore, { FormState } from "./useStore";
export declare type RenderProps = (form: FormState) => React.ReactNode;
export interface FormProps {
    name?: string;
    children?: React.ReactNode | RenderProps;
    initialValues?: Record<string, any>;
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export declare type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export declare type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>;
export declare const FormContext: React.Context<IFormContext>;
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<IFormRef>>;
export default Form;
