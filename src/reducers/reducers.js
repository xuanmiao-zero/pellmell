import { combineReducers } from 'redux';
import WaterfallFlow from './getWaterfallFlowDataReducers';

/**
 * 此处合并Reducer，为了扩展, 可以在容器组件传入数据的时候指定需要传入的数据
 * 比如在WaterfallFlow的mapStateToProp中传入state.getDataReducers
 */

const rootReducer = combineReducers({
  WaterfallFlow: WaterfallFlow
});
export default rootReducer;

