import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core'
import  Button, {ButtonSize, ButtonType} from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Input from './components/Input/input'
library.add(fas);
function App() {
  return (
    <div className="App">
      {/* <Button  btnType= {ButtonType.Danger} size = {ButtonSize.Large}>Danger</Button>
      <Button disabled >disabled</Button>
      <Button btnType= {ButtonType.Link} href = 'https://www.baidu.com'>Link</Button>
      <Button btnType= {ButtonType.Primary} >Primary</Button>
      <Button btnType= {ButtonType.Default} >Default</Button> */}

      {/* <Menu mode='horizontal'
        defaultOpenSubMenus= {['2']}
        onSelect={(index) => {
          console.log(index);
        }}  >
        <MenuItem >item1</MenuItem>
        <MenuItem  disabled>item2</MenuItem>
        <SubMenu title='dropdown'  
        >
          <MenuItem>
            dropdown1
          </MenuItem>
          <MenuItem>
            dropdown2
          </MenuItem>
        </SubMenu>
        <MenuItem >item3</MenuItem>
      </Menu> */}
      <Input append='append' prepend='prepand' icon= 'search' style={{width:500}} />
      <Input append='append' prepend='prepand' icon= "search" disabled style={{width:500}}/>
      <Input  style={{width:500}}/>
      <Input  style={{width:500}} icon = "search"/>
    </div>
  );
}

export default App;
