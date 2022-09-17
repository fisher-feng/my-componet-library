import React from "react";
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Upload, {UploadFile} from "./upload";
// const checkFileSize = (file:File) => {
//   if(Math.round(file.size / 1024) > 50) {
//     alert('file too big');
//     return false;
//   }
//   return true;
// }
const filesPromise = (file:File) => {
  const newFile = new File([file], 'new_name.docx', {
    type:file.type
  })
  return Promise.resolve(newFile);
}
const defaultFileList:UploadFile[] = [
  {uid:'123', size:1234, name:"hello.md", status:"uploading", percent:30},
  {uid:'124', size:1234, name:"xyz.md", status:"success", percent:30},
  {uid:'125', size:1234, name:"fly.md", status:"error", percent:30}
]
const SimpleUpload = () => {
  return (
    <div style={{width:400}}>
      <Upload 
        action = "https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange = {action('changed')}
        beforeUpload = {filesPromise}
        defaultFileList = {defaultFileList}
        onRemove = {()=> {}}
        name = 'fileName'
        data = {{'key':'value'}}
        headers = {{'x-powerd-By':'vikingship'}}
        accept = '.jpg'
        multiple
        children = 'upload file'
        drag = {true}
      />
    </div>
   
  )
}

storiesOf('Upload component', module)
.add('Upload', SimpleUpload)