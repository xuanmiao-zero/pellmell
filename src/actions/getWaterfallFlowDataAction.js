import fetch from 'isomorphic-fetch'

let actions = {
  //获取数据
  getWaterfallFlowData: function (categories, add) {
    return function (dispatch, getState) {
      let state = getState()
      //若正在获取数据不重复获取
      if (state.WaterfallFlow.isFetching) {
        console.log('重复获取')
        return;
      }
      //页数page
      dispatch(actions.beginGetWaterfallFlowData())
      let page = state.WaterfallFlow.page
      if(add){
        page = ++ page
      }
      let url = 'http://localhost:3000/?keyword=' + categories + '&page=' + page
      console.log(url)
      fetch(url).
      then(res=>{
        if (res.ok) {
          return res.json()
        } else {
          console.log('Network response was not ok.')
        }
      }).
      then(json=>{
        if(add){
          dispatch(actions.addGetWaterfallFlowData(json, page))
          console.log(page)
        }else{
          dispatch(actions.doneGetWaterfallFlowData(json))
        }
      }).
      catch(function (e) {
        console.log('There has been a problem with your fetch operation: ' + e.message);
        dispatch(actions.failGetWaterfallFlowData(e.statusText));
      });
    }
  },

  //开始请求数据
  beginGetWaterfallFlowData: () => ({
    type: 'getData/BEGIN_GET_WATERFALLFLOW_DATA'
  }),

  //数据获取完成
  doneGetWaterfallFlowData: (data) => ({
    type: 'getData/DONE_GET_WATERFALLFLOW_DATA',
    payload: {data: data},
  }),

  //添加数据
  addGetWaterfallFlowData: (data, page) => ({
    type: 'getData/ADD_GET_WATERFALLFLOW_DATA',
    payload: {data: data, page: page},
  }),

  //获取数据失败
  failGetWaterfallFlowData: errMsg => ({
    type: 'getData/FAIL_GET_WATERFALLFLOW_DATA',
    payload: new Error(errMsg),
    error: true
  }),

  //根据id删除图片
  removeImageById: id => ({
    type: 'REMOVE_IMAGE_BYID',
    payload: {id: id}
  })
}
export default actions;