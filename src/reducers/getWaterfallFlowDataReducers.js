import { fromJS } from 'immutable';  //为什么immutable 没写入package.json 好奇怪

import Cursor from 'immutable/contrib/cursor';

export const BEGIN_GET_WATERFALLFLOW_DATA = 'getData/BEGIN_GET_WATERFALLFLOW_DATA'
export const DONE_GET_WATERFALLFLOW_DATA = 'getData/DONE_GET_WATERFALLFLOW_DATA'
export const FAIL_GET_WATERFALLFLOW_DATA = 'getData/FAIL_GET_WATERFALLFLOW_DATA'
export const ADD_GET_WATERFALLFLOW_DATA = 'getData/ADD_GET_WATERFALLFLOW_DATA'
export const REMOVE_IMAGE_BYID = 'REMOVE_IMAGE_BYID'

let initialState = {
  isFetching: false,
  page: 1,
  data: {}
}

export default (state = initialState, action) =>{
  // console.log('reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    //开始获取数据
    case BEGIN_GET_WATERFALLFLOW_DATA:
      return fromJS(state).set('isFetching', true).toJS();

    //更改数据
    case DONE_GET_WATERFALLFLOW_DATA:
      console.log('第一次加载数据' )
      return fromJS(state).set('isFetching', false).set('data', action.payload.data).toJS();

    //添加数据
    case ADD_GET_WATERFALLFLOW_DATA:
      console.log('添加数据' )
      return fromJS(state).set('isFetching', false).set('page', action.payload.page).setIn(['data', 'images'], state.data.images.concat(action.payload.data.images)).toJS()

    //获取数据失败
    case FAIL_GET_WATERFALLFLOW_DATA:
      return fromJS(state).set('isFetching', false).toJS()
    
    case REMOVE_IMAGE_BYID:
      let $$imu1 = fromJS(state)
      let $$imu2  = $$imu1.getIn(['data', 'images']).filterNot(x=> x.get('id') === action.payload.id)
      return $$imu1.setIn(['data', 'images'], $$imu2).toJS()
    default:
      return state
  }
}