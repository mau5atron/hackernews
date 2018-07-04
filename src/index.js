import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);
registerServiceWorker();

// this is a hot module replacement tool
// instead of the browser performing a refresh(reload), the application reloads instead and shows the changed state
// HMR keeps application state intact even though the source code changes
// will become useful in larger applications with lots of assets to reload
if (module.hot){
	module.hot.accept();
}
