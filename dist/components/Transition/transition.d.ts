import React from "react";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
declare type transitionProops = CSSTransitionProps & {
    animation?: AnimationName;
    children?: React.ReactNode;
};
declare const Transition: React.FC<transitionProops>;
export default Transition;
