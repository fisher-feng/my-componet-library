import React, {ChangeEvent, useRef, useState} from "react";
import axios from 'axios'
import { UploadList } from "./uploadList";
import Dragger from "./dragger";
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error' 
export interface UploadFile {
  uid:string;
  size:number;
  status:UploadFileStatus;
  percent?:number;
  raw?:File;
  response?:any;
  error?:any;
  name:string;
}
export interface UploadProps {
  action:string;
  beforeUpload?:(file:File) => boolean | Promise<File>;
  onProgress?: (percentage:number, file:File) => void;
  onSuccess?:(data:any, file:File) => void;
  onError?:(err:any, file:File) => void; 
  onChange?:(file:File) => void;
  defaultFileList?:UploadFile[];
  onRemove?:(File:UploadFile) => void;
  headers?:{[key:string]:any};
  name?:string;
  data?: {[key:string]:any};
  withCredentials?:boolean;
  accept?:string;
  multiple?:boolean;
  children?:React.ReactNode;
  drag?:boolean;
} 
export const Upload:React.FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const fileInput = useRef<HTMLInputElement>(null);

  const updateFileList = (updateFile:UploadFile, updateObj:Partial<UploadFile>) => {
    setFileList(preList => {
      return preList.map(file => {
        if(file.uid === updateFile.uid) {
          return {...file, ...updateObj}
        }else {
          return file;
        }
       })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const handleRemove = (file:UploadFile) => {
    setFileList(preList => {
      return preList.filter(prefile => prefile.uid !== file.uid);
    })
    if(onRemove) {
      onRemove(file);
    }
  }
  const uploadFiles = (files:FileList) => {
    let postFiels = Array.from(files);
    postFiels.forEach(file => {
      if(!beforeUpload) {
        request(file);
      }else {
        const result = beforeUpload(file);
        if(result &&  result instanceof Promise) {
          result.then(processedFile => {
            request(processedFile);
          })
        }else if(result !== false) {
          request(file);
        }
      }
    })
  }

  const request = (file:File) => {
    let _file:UploadFile = {
      uid:Date.now() + 'upload-file',
      status:'ready',
      name:file.name,
      size:file.size,
      percent:0,
      raw:file,
    }
    // setFileList([_file, ...fileList]);
    setFileList(preList => {
      return [_file, ...preList];
    })
    const formData = new FormData();
      formData.append(name || file.name, file);
      if(data) {
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        })
      }
      axios.post(action, formData, {
        headers:{
          ...headers,
          'Content-Type':"multipart/from-data"
        },
        withCredentials,
        onUploadProgress:(e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if(percentage < 100) {
            updateFileList(_file, {
              percent:percentage,
              status:'uploading',
            })
            onProgress && onProgress(percentage, file);
          }
        }
      })
      .then((res) => {
        console.log('response', res);
        updateFileList(_file, {status:'success', response:res.data});
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file);
      })
      .catch( (err) => {
        console.log('error', err);
        updateFileList(_file, {status:'error', response:err.data});
        onError && onError(err, file);
        onChange && onChange(file);

      })
  }

  console.log(fileList);
  
  return (
    <div
      className="viking-upload-component"
    >
      {/* <Button 
        btnType="primary" 
        onClick={handleClick}
      >
        {children}
      </Button> */}
      <div  
        className="viking-upload-input"
        style={{display:"inline-block"}}
        onClick = {handleClick}
      >
        {drag? 
          <Dragger 
            onFile={(files) => {uploadFiles(files)}}
          >{children}</Dragger> :  
          children
        }
      </div>
      <input
        className = "viking-file-input"
        style = {{display:'none'}}
        type="file"
        ref ={fileInput}
        onChange ={handleFileChange} 
        accept = {accept}
        multiple = {multiple}
      />
      <UploadList 
        fileList={fileList}
        onRemove = {handleRemove}
      />
    </div>
  )
}
Upload.defaultProps = {
  name:'file',
}
export  default Upload