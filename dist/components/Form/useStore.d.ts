/// <reference types="lodash" />
import React from "react";
import { RuleItem, ValidateError } from 'async-validator';
export declare type CustomRuleFunc = ({ getFieldValue }: any) => RuleItem;
export declare type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}
export interface FormState {
    isValid: boolean;
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>;
}
export interface FiledsAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any;
}
declare function useStore(initialValues?: Record<string, any>): {
    fields: FieldsState;
    dispatch: React.Dispatch<FiledsAction>;
    form: FormState;
    validateField: (name: string) => Promise<void>;
    getFieldValue: (key: string) => string;
    validateAllField: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            <TResult>(obj: string, callback: import("lodash").StringIterator<TResult>): import("lodash").NumericDictionary<TResult>;
            <T extends object, TResult_1>(obj: T, callback: import("lodash").ObjectIterator<T, TResult_1>): { [P in keyof T]: TResult_1; };
            <T_1>(obj: import("lodash").Dictionary<T_1> | import("lodash").NumericDictionary<T_1>, iteratee: object): import("lodash").Dictionary<boolean>;
            <T_2 extends object>(obj: T_2, iteratee: object): { [P_1 in keyof T_2]: boolean; };
            <T_3, TKey extends keyof T_3>(obj: import("lodash").Dictionary<T_3> | import("lodash").NumericDictionary<T_3>, iteratee: TKey): import("lodash").Dictionary<T_3[TKey]>;
            <T_4>(obj: import("lodash").Dictionary<T_4> | import("lodash").NumericDictionary<T_4>, iteratee: string): import("lodash").Dictionary<any>;
            <T_5 extends object>(obj: T_5, iteratee: string): { [P_2 in keyof T_5]: any; };
            (obj: string): import("lodash").NumericDictionary<string>;
            <T_6>(obj: import("lodash").Dictionary<T_6> | import("lodash").NumericDictionary<T_6>): import("lodash").Dictionary<T_6>;
            <T_7 extends object>(obj: T_7): T_7;
            <T_8 extends object>(obj: T_8): Partial<T_8>;
        };
    }>;
    setFieldValue: (name: string, value: any) => void;
    getFieldsValue: () => {
        [x: string]: string;
    };
    resetFields: () => void;
};
export default useStore;
