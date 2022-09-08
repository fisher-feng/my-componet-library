import React from "react";
import { CSSTransition } from 'react-transition-group'
import {CSSTransitionProps} from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
//联合类型不能继承,只能用这种交叉类型
type transitionProops = CSSTransitionProps & {
  animation?:AnimationName;
  children?:React.ReactNode;
}

const Transition:React.FC<transitionProops> = (props) => {
  const {
    animation,
    children,
    classNames,
    wrapper,//用于避免与其他样式冲突
    ...resProps
  } = props;
  return (
    <CSSTransition
      classNames={classNames? classNames : animation}
      {...resProps}
    >
      {wrapper ? <div>{children}</div> : children}
      {/*wrapper用于避免与其他样式冲突 */}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit:true,//触发是否卸载
  appear:true,
}

export default Transition