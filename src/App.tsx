import React from 'react';
import  Button, {ButtonSize, ButtonType} from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
function App() {
  return (
    <div className="App">
      {/* <Button  btnType= {ButtonType.Danger} size = {ButtonSize.Large}>Danger</Button>
      <Button disabled >disabled</Button>
      <Button btnType= {ButtonType.Link} href = 'https://www.baidu.com'>Link</Button>
      <Button btnType= {ButtonType.Primary} >Primary</Button>
      <Button btnType= {ButtonType.Default} >Default</Button> */}
      <Menu mode='vertical' onSelect={(index) => {
        console.log(index);
      }}>
        <MenuItem index={1}>item1</MenuItem>
        <MenuItem index={2} disabled>item2</MenuItem>
        <MenuItem index={3}>item3</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
