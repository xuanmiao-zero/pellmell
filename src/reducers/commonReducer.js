import { fromJS } from 'immutable';  //为什么immutable 没写入package.json 好奇怪

export const SHOW_PRE_LOADING = 'common/SHOW_PRE_LOADING'
export const HIDE_PRE_LOADING = 'common/HIDE_PRE_LOADING'

let initialState = {
  loading: false
}

export default (state = initialState, action) =>{
  // console.log('reducer called with state ', state , ' and action ', action);
  switch (action.type) {
    //开始加载动画
    case SHOW_PRE_LOADING:
      return fromJS(state).set('loading', true).toJS();
    //结束加载动画
    case HIDE_PRE_LOADING:
      return fromJS(state).set('loading', false).toJS();
    default:
      return state
  }
}