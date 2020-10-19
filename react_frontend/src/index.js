// the javascript file that loads with our HTML(public/index.html)

// load React, ReactDom,..
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// we create our file within the App.js and will be imported here
import App from './App';

// we are not going to use serviceWorker, so 註解掉～
//import * as serviceWorker from './serviceWorker';

// it's going to render our APP(<App />) and put it here: document.getElementById('root').
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/* we are not going to use serviceWorker, so 註解掉～
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
