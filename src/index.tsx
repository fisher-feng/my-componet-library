import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from "@fortawesome/free-solid-svg-icons"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

library.add(fas);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {default as AutoComplete } from './components/AutoComplete';
export {default as Button} from './components/Button';
export {default as Form } from './components/Form';
export {default as Icon } from './components/Icon';
export {default as Input } from './components/Input';
export {default as Menu} from './components/Menu';
export {default as Progress } from './components/Progress';
export {default as Transition } from './components/Transition';
export {default as Upload } from './components/Upload';

