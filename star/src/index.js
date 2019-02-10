import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers/index'
// import handleNewMessage from './sagas/index'
// import setupSocket from './sockets/index'
// import username from './utils/name'

//const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers
    //compose(applyMiddleware(sagaMiddleware))
    
)
// const socket = setupSocket(store.dispatch, username)

// sagaMiddleware.run(handleNewMessage, { socket, username })

 // store.dispatch(addUser('Me'));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
