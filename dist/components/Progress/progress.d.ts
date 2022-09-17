import React from "react";
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    percent: number;
    stroKeHight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
