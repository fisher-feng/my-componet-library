import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare const Input: React.FC<InputProps>;
export default Input;
