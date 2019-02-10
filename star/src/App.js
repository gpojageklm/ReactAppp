import React, { Component } from 'react';
import './App.css';
import MessagesList from './components/MessageList';
import  AddMessage  from './components/AddMessage';

class App extends Component {
  render() {
    return (
      <div id="container">
        <div>
            <MessagesList/>
        </div>
            <AddMessage/>
      </div>
    );
  }
}

export default App;
