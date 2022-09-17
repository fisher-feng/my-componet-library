/* eslint-disable testing-library/no-render-in-setup */
import {render, RenderResult, fireEvent} from '@testing-library/react'
import {Upload, UploadProps} from './upload';
import axios from 'axios';

jest.mock('../Icon/icon', () => {
  return ({icon}:any) => {
    return <span>{icon}</span>
  }
})

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const testProps:UploadProps =  {
  action:'fakeurl.com',
  onSuccess:jest.fn(),
  onChange:jest.fn(),

}
let wrapper:RenderResult, fileInput:HTMLInputElement, uploadArea:HTMLElement;
const testFile = new File(['xyz'], 'test.png', {type:'image/png'});

describe('test upload compoment', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    // eslint-disable-next-line testing-library/no-node-access
    fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement ;
    // uploadArea = wrapper.queryByText('Click to upload');
  })
  test('upload process should works fine', async() => {
    // const {queryByText} = wrapper;
    mockedAxios.post.mockImplementation(() => {
      return Promise.resolve({'data':"cool"})
    })
    // expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible(); 
    fireEvent.change(fileInput, {targe:{files:[testFile]}});
    // expect(queryByText('spinner')).toBeInTheDocument();
    // await waitFor( () => {
    //   expect(queryByText("test.png")).toBeInTheDocument();
    // })
    // expect(queryByText('check-circle')).toBeInTheDocument();
    // expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);//??
    // expect(testProps.onChange).toHaveBeenCalledWith(testFile);
  })
})