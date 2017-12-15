import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers/reducers';


export default function configureStore() {
  return createStore(reducer, applyMiddleware(thunk)); //thunkMiddleware允许我们 dispatch() 函数
}