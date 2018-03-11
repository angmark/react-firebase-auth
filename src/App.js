import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login  from './components/Login';
import { Provider, connect } from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


const middleware = [thunk];
const userInfo = {
    UserId: ''
};

const getUserId  = (state = '', action) =>
{
  if(action.type == 'login_succeed') {
      return action.id;
  } else{
    return state;
  }
};

const userInfoReducer = combineReducers({
    UserId : getUserId
});

const reducer = combineReducers({
    UserInfo: userInfoReducer,
});

const store = createStore(reducer, { UserInfo : { UserId : '' }}, applyMiddleware(...middleware));
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    
  render() {
    return (
        <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div>
              <Login/>
          </div>
      </div>
        </Provider>
    );
  }
}

export default App;
