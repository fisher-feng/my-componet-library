import React from "react";
import { UploadFile } from "./upload"; 
import Icon from "../Icon/icon";
import Progress from '../Progress/progress'
interface UploadListProps {
  fileList:UploadFile[];
  onRemove:(_file:UploadFile) => void;
}
export const UploadList:React.FC<UploadListProps> = (props) => {
  const {fileList, onRemove} = props;
  return (
    <ul className="viking-upload-list"> 
      {fileList.map(file => {
        return (
          <li className="viking-upload-list-item" key={file.uid}>
            {file.name}
            <span className={`file-name file-name-${file.status}`}>
              <Icon icon = 'file-alt' theme = 'secondary' />
              {file.name}
            </span>
            <span className="file-status">
              {file.status === 'uploading' && <Icon icon='spinner' spin theme="primary" />}
              {file.status === 'success' && <Icon icon='check-circle' theme="success" />}
              {file.status === 'error' && <Icon icon='times-circle' theme="danger" />}
            </span>
            <span className="file-actions">
              <Icon icon='times' onClick={() => onRemove(file) } />
            </span>
            {file.status === 'uploading' && 
              <Progress 
                percent={file.percent || 0}
              />
            }
          </li>
        )
      })}
    </ul>
  )
}
