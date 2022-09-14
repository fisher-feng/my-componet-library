import React from "react";
import {ThemeProps} from '../Icon/icon'
export interface ProgressProps {
  percent:number;
  stroKeHight?:number;
  showText?:boolean;
  styles?:React.CSSProperties;
  theme?:ThemeProps;
} 
const Progress:React.FC<ProgressProps> = (props) => {
  const {
    percent,
    stroKeHight,
    showText,
    styles,
    theme,
  } = props;
  return (
    <div className="viking-progress-bar" style={styles}>
      <div className="viking-progress-bar-outer" style={{height:stroKeHight}}>
        <div 
          className= {`viking-progress-bar-inner color-${theme}`}
          style = {{width:`${percent}%`}}
        >
          {showText && <span className="inner-text" >{`${percent}%`}</span>}
        </div>
        
      </div>
    </div>
  )
} 

Progress.defaultProps = {
  stroKeHight:15,
  showText:true,
  theme:'primary',
}
export default Progress