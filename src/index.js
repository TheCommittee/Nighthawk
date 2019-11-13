import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
const fs = require('fs')

const API = fs.readFileSync('./API.txt')

ReactDOM.render(<App />, document.getElementById('root'));
