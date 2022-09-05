import React from 'react';
import  Button, {ButtonSize, ButtonType} from './components/Button/button'
function App() {
  return (
    <div className="App">
      <Button  btnType= {ButtonType.Danger} size = {ButtonSize.Large}>Danger</Button>
      <Button disabled >disabled</Button>
      <Button btnType= {ButtonType.Link} href = 'https://www.baidu.com'>Link</Button>
      <Button btnType= {ButtonType.Primary} >Primary</Button>
      <Button btnType= {ButtonType.Default} >Default</Button>
    </div>
  );
}

export default App;
