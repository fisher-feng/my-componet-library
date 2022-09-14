import React, {useState} from "react";
import classNames from "classnames";
interface DraggerProps {
  onFile:(files:FileList) => void;
  children?:React.ReactNode;
}
export const Dragger:React.FC<DraggerProps> = (props) => {
  const {onFile, children} = props;
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('viking-uploader-dragger', {
    'is-dragover':dragOver,
  })
  const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files)
  }
  const handleDrag = (e:React.DragEvent<HTMLDivElement>, over:boolean) => {
    e.preventDefault();
    setDragOver(over);
  }
  return (
    <div 
      className= {classes} 
      onDragOver = {e => {handleDrag(e, true)}}
      onDragLeave = {e => {handleDrag(e, false)}} 
      onDrop={handleDrop}
      >
       {children}
    </div>
  )
} 
export default Dragger