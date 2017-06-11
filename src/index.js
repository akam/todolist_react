import React from 'react';
import ReactDOM from 'react-dom';
import ToDoList from './ToDoList';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<ToDoList />, document.getElementById('root'));
registerServiceWorker();
