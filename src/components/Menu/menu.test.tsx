import React from "react";
import {render, RenderResult, fireEvent, cleanup, waitFor} from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from "./subMenu";
import { wait } from "@testing-library/user-event/dist/utils";

const testProps:MenuProps = {
  defaultIndex:'0',
  onSelect:jest.fn(),//添加监控
  className:"test"
}

const testVerticalProps:MenuProps = {
  defaultIndex:'0',
  mode:"vertical"
}


const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style');
  style.type = 'text/css'; 
  style.innerHTML = cssFile

  return style
}
let view:RenderResult,view2: RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement;

//测试横向
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    view = render(generateMenu(testProps));
    view.container.append(createStyleFile());
    menuElement = view.getByTestId('test-menu');
    activeElement = view.getByText('active');
    disabledElement = view.getByText('disabled');
  })
  test('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu test');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);//:scope表示当前 取它的子li
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  test ('click items should changes active and call the right callback', () => {
    const thirdItem = view.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-acvite');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');//index==2

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');//index ===1 
  });

  test('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const view = render(generateMenu(testVerticalProps));
    const menuElement = view.getByTestId('test-menu');
  })

  test('should show dropdown items when hover onsubMenu', async() => {
    // expect(view.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = view.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(view.queryByText('drop1')).toBeVisible()//显示
    });
    
    fireEvent.click(view.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenLastCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);

    await waitFor(() => {
      expect(view.queryByText('drop1')).not.toBeVisible()//隐蔽
    })
  })

})

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

//测试纵向
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    view2 = render(generateMenu(testVerProps));
    view2.container.append(createStyleFile());
  })
  test('should render vertical mode when mode is set to vertical', () => {
    const menuElement = view2.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  })
  test('should show dropdown items when click on subMenu for vertical mode', async() => {
    const dropDownItem = view2.queryByText('drop1');
    // await waitFor(() => {
    //   expect(dropDownItem).not.toBeVisible();
    // })
    fireEvent.click(view2.getByText('dropdown'));
    // expect(dropDownItem).toBeVisible();
  })
  test('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(view2.queryByText('opened1')).toBeVisible();
  })
})