var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from "react";
import axios from 'axios';
import { UploadList } from "./uploadList";
import Dragger from "./dragger";
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var fileInput = useRef(null);
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (preList) {
            return preList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (preList) {
            return preList.filter(function (prefile) { return prefile.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files) {
        var postFiels = Array.from(files);
        postFiels.forEach(function (file) {
            if (!beforeUpload) {
                request(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        request(processedFile);
                    });
                }
                else if (result !== false) {
                    request(file);
                }
            }
        });
    };
    var request = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        // setFileList([_file, ...fileList]);
        setFileList(function (preList) {
            return __spreadArray([_file], preList, true);
        });
        var formData = new FormData();
        formData.append(name || file.name, file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': "multipart/from-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, {
                        percent: percentage,
                        status: 'uploading',
                    });
                    onProgress && onProgress(percentage, file);
                }
            }
        })
            .then(function (res) {
            console.log('response', res);
            updateFileList(_file, { status: 'success', response: res.data });
            onSuccess && onSuccess(res.data, file);
            onChange && onChange(file);
        })
            .catch(function (err) {
            console.log('error', err);
            updateFileList(_file, { status: 'error', response: err.data });
            onError && onError(err, file);
            onChange && onChange(file);
        });
    };
    console.log(fileList);
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: "inline-block" }, onClick: handleClick }, drag ?
            React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) :
            children),
        React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, type: "file", ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file',
};
export default Upload;
