//引入库
import 'lodash'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import Pace from '@/src/common/js/react-pace-progress'
import PreLoader from '@/src/components/PreLoader/PreLoader'
import {AnimatedSwitch} from 'react-router-transition';

//引入样式
import './common/style/index.css';

//引入组件
import Svg from './components/svg/svg';
import MainHeader from './components/MainHeader/MainHeader';
import MainMenu from './components/MainMenu/MainMenu';
import Carousel from './components/Carousel/Carousel';
import Categories from './components/Categories/Categories';
import FollowUs from './components/FollowUs/FollowUs';
import Contact from './components/Contact/Contact';
import ArtWork from './components/ArtWork/ArtWork';
import ArtistDetails from './components/ArtistDetails/ArtistDetails';
import NotFound from './components/NotFound/NotFound';
//引入数据
import carouselData from "./common/data/carouselData";
import mainMenuData from "./common/data/mainMenuData";
import {mainMenuNavData} from "./common/data/mainMenuData";

//redux
import createStore from './store/configureStore';
//引入action
import commonAction from '@/src/actions/commonAction'

//创建store, 应⽤程序中唯⼀的 Redux store 对象
const store = createStore();

//当浏览器不支持 HTML5 的 history API 时强制刷新页面。
const supportsHistory = 'pushState' in window.history

//导航到此页面前执行的函数，默认使用 window.confirm
const getConfirmation = (message, callback) => {
  // const allowTransition = window.confirm(message)
  // console.log('即将跳转至')
  callback(true)
}
//这是加载动画回调函数
const preloader = () => {
  // console.log('加载动画')
}

class XuanMiao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isColorReversed: false,
      isOpen: false,
      isPreLoaderOver: false 
    };
  }

  //设置isColorReversed
  setIsColorReversed = (isColorReversed) => {
    this.setState({
      isColorReversed: isColorReversed
    })
  }
  setIsColorReversedTrue=()=>{
    this.setState({
      isColorReversed: true
    })
  }
  /*
  * 点击菜单按钮触发的操作
  * 切换IsColorReversed 状态（true false）
  * 渐变MainMenu的透明度到 （1 0）
  * */
  setIsOpen = () => {
    //切换IsColorReversed 状态（true false）
    this.setState({
      isOpen: !this.state.isOpen
    })
    //渐变MainMenu的透明度到 （1 0）
  }

  setIsOpenFalse = () => {
    //切换IsColorReversed 状态（true false）
    this.setState({
      isOpen: false
    })
    //渐变MainMenu的透明度到 （1 0）
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.location.pathname !== this.props.location.pathname) {
      this.props.commonAction.showPreLoading()
      console.log('切换开始')
      console.log(this.props.common)
    }
  }

  componentDidMount() {
    if (this.props.common.loading === true) {
      this.props.commonAction.hidePreLoading()
      console.log(this.props.common)
    }
    window.onload = ()=>{
      if(document.readyState === 'complete'){
        this.setState({
          isPreLoaderOver: true
        })
      }
      setTimeout(()=>{
        //超过五秒不再等待
        this.setState({
          isPreLoaderOver: true
        })
      }, 4000)
    }
  }

  render() {
    let {setIsColorReversed, setIsOpen, setIsOpenFalse, setIsColorReversedTrue} = this
    let {isColorReversed, isOpen} = this.state
    return (
      <div>
        <Svg/>
        <MainHeader {...{
          isColorReversed,
          setIsOpen,
          setIsOpenFalse,
          isOpen
        }} />
        <MainMenu
          {...{
            isOpen,
            setIsOpen,
            mainMenuData,
            mainMenuNavData
          }}
        />
        <div className="page-body" id="main-content">
            <PreLoader flag={this.state.isPreLoaderOver} />
          <Switch>
            <Route exact strict path="/" render={() => <Carousel
              {...{
                carouselData,
                setIsColorReversed
              }}
            />}/>
            <Route
              exact
              path="/categories"
              component={Categories}
            />
            <Route
              exact
              path="/followus"
              render = {()=> < FollowUs {...{setIsColorReversedTrue}} /> }
            />
            <Route
              exact
              path="/contactus"
              render = {()=> < Contact {...{setIsColorReversedTrue}} /> }
            />
            <Route
              exact
              path="/artwork"
              component={ArtWork}
            />
            <Route
              exact
              path="/artistdetails"
              component={ArtistDetails}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

//连接store里的state和组件
const mapStateToProps = state => {
  return {
    common: state.common
  }
}

//连接action和组件
const mapDispatchToProps = dispatch => ({
  commonAction: bindActionCreators(commonAction, dispatch)
})

//连接组件和redux store
XuanMiao = connect(mapStateToProps, mapDispatchToProps)(XuanMiao)

ReactDOM.render(
  <Provider store={store}>
    <Router basename='/pellmell'>
        <Route
          path='/'
          component={XuanMiao}
          getUserConfirmation={getConfirmation('Are you sure?', preloader)}
          forceRefresh={!supportsHistory}
        />
    </Router>
  </Provider>,
  document.getElementById('root')
);
