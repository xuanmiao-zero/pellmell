//框架
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//引入组件
import FeedFilters from './FeedFilters'
import WaterfallFlow from './WaterfallFlow'
//引入方法
import getWaterfallFlowDataAction from '../../actions/getWaterfallFlowDataAction'
import {isScrollToDocumentBottom} from '@/src/common/js/tool/scrollSetBottom';

class Categories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: 'All',
    }
  }

  componentWillMount() {
    let search = ''
    if (window.location.search) {
      search = window.location.search.slice(1)
    }
    this.props.actions.getWaterfallFlowData(search, false)
    window.onscroll = () => this.scrollAction(search, true)
  }

  //滚动时触发的事件
  scrollAction = (search, isAdd) => {
    //判断鼠标是否滚动到底部
    if (isScrollToDocumentBottom()) {
      this.props.actions.getWaterfallFlowData(search, isAdd)
    }
  }

  render() {
    let {WaterfallFlow: WaterfallFlowState, actions} = this.props
    console.log(WaterfallFlowState)
    console.log(WaterfallFlowState.isFetching)
    return (
      <div className="page-container page-categories page--toppadding">
        <div className="page-header">

            <FeedFilters
              {...{
                getWaterfallFlowData: actions.getWaterfallFlowData
              }}
            />
          <WaterfallFlow
              {...{
                WaterfallFlowState,
                removeImageById: actions.removeImageById,
              }}
            />
        </div>
        <div className="feednav">
          <a
            className={`feednav-link feednav-next u-font-semibold u-link-underline${WaterfallFlowState.isFetching ? ' is-loading' : ''}`}
            href="javascript:">
            Load More
            <div className="feedloading">
              <span className="feedloading-bar"></span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

//如果定义该参数， 组件将会监听 Redux store 的变化。
const mapStateToProps = state => {
  return {
    WaterfallFlow: state.WaterfallFlow
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(getWaterfallFlowDataAction, dispatch)
});

//连接 React 组件与 Redux store, 连接操作不会改变原来的组件类。反⽽返回⼀个新的已与 Redux store 连接的组件类。
export default connect(mapStateToProps, mapDispatchToProps)(Categories)
