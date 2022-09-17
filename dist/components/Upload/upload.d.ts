import React from "react";
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    status: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
    name: string;
}
export interface UploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    defaultFileList?: UploadFile[];
    onRemove?: (File: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    children?: React.ReactNode;
    drag?: boolean;
}
export declare const Upload: React.FC<UploadProps>;
export default Upload;
