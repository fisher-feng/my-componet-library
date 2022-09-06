import React from "react";
import {render, RenderResult, fireEvent, cleanup} from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem, {MenuItemProps} from './menuItem'
import classNames from "classnames";

const testProps:MenuProps = {
  defaultIndex:0,
  onSelect:jest.fn(),//添加监控
  className:"test"
}

const testVerticalProps:MenuProps = {
  defaultIndex:0,
  mode:"vertical"
}


const generateMenu  = (props:MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        xyz
      </MenuItem>
    </Menu>
  )
}

let view:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    view = render(generateMenu(testProps));
    menuElement = view.getByTestId('test-menu');
    activeElement = view.getByText('active');
    disabledElement = view.getByText('disabled');
  })
  test('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });

  test ('click items should changes active and call the right callback', () => {
    const thirdItem = view.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-acvite');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);

    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  test('should render vertical mode when mode is set to vertical ', () => {
    cleanup();
    const view = render(generateMenu(testVerticalProps));
    const menuElement = view.getByTestId('test-menu');
  })
})