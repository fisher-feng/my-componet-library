import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button, {ButtonProps, ButtonSize, ButtonType} from './button'

test('our first react test case', () => {
  const view = render(<Button>Nice</Button>);
  const element = view.queryByText('Nice');//查找是否有nice字
  expect(element).toBeTruthy();
  expect(element).toBeInTheDocument();////安装了jest-dom之后才提供的方法
})



//安装了jest-dom之后
const defaultProps = {
  onClick:jest.fn()//使用mock funtion方法，模拟点击
}

describe('test Button component', () => {
  test('should render the correct default button' , () => {
    const view = render(<Button {...defaultProps}>Nice</Button>);
    const element = view.getByText('Nice');//查找是否有nice字
    expect(element).toBeInTheDocument();//安装了jest-dom之后才提供的方法,这里表示应该在文档中
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');

    fireEvent.click(element)//模拟点击事件
    expect(defaultProps.onClick).toHaveBeenCalled();//检测onclick是否被调用

  })

  test('should render the correct commponent based on deffrent props', () => {
    const testProps:ButtonProps = {
      btnType:ButtonType.Primary,
      size:ButtonSize.Large,
      className:'class'
    }
    const view = render(<Button {...testProps}>Nice</Button>);
    const element = view.getByText('Nice') as HTMLButtonElement;//查找是否有nice字
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg class')
  })

  test('should render a link when btnType equals link and href is provided', () => {
    const view = render(<Button btnType= {ButtonType.Link} href = 'http://www.baidu.com'>Link</Button>);
    const element = view.getByText('Link') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
  })

  test('should render disabled button when disabled set to true', () => {
    const disableProps:ButtonProps = {
      disabled:true,
      onClick:jest.fn(),
    }
    const view = render(<Button {...disableProps}>disabled</Button>)
    const element = view.getByText('disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);//模拟点击element
    expect(disableProps.onClick).not.toHaveBeenCalled();//点击事件不会被调用

  })
})