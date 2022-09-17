import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [title, setTtile] = useState('');
  const postData = {
    title:'my title',
    body:'hello man',
  }
  useEffect(() => {
    axios.post('http://jsonplaceholder.typicode.com/users/1/posts', postData, {})
      .then((res) => {
        console.log(res.data.id);
        setTtile(res.data.id)
      })
  }, []);
  const hanldeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fiels = e.target.files;
    if(fiels) {
      console.log(fiels);
      const uploadedFile = fiels[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios.post("http://jsonplaceholder.typicode.com/users/1/posts", formData, {
        headers:{
          'Content-Type':'multipart/form-data',
        }
      }).then((res) => {
        console.log(res);
      })
    }
  }
  return (
    <div className="App">
      <h1>{title}</h1>
      <div>
        <input type="file"  name = "myFile" onChange={hanldeFileChange}/>
      </div>
    </div>
  );
}

export default App;
