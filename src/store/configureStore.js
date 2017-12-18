import {createStore, applyMiddleware } from 'redux';
import promiseMiddleware from './promise-middleware'
import thunk from 'redux-thunk';

import reducer from '../reducers/reducers';


export default function configureStore() {
  return createStore(reducer, applyMiddleware(thunk, promiseMiddleware)); //thunkMiddleware允许我们 dispatch() 函数
}