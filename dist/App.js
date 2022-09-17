import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
    var _a = useState(''), title = _a[0], setTtile = _a[1];
    var postData = {
        title: 'my title',
        body: 'hello man',
    };
    useEffect(function () {
        axios.post('http://jsonplaceholder.typicode.com/users/1/posts', postData, {})
            .then(function (res) {
            console.log(res.data.id);
            setTtile(res.data.id);
        });
    }, []);
    var hanldeFileChange = function (e) {
        var fiels = e.target.files;
        if (fiels) {
            console.log(fiels);
            var uploadedFile = fiels[0];
            var formData = new FormData();
            formData.append(uploadedFile.name, uploadedFile);
            axios.post("http://jsonplaceholder.typicode.com/users/1/posts", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(function (res) {
                console.log(res);
            });
        }
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("div", null,
            React.createElement("input", { type: "file", name: "myFile", onChange: hanldeFileChange }))));
}
export default App;
