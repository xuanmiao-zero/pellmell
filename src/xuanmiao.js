//引入库
import 'lodash'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

//引入数据
import carouselData from "./common/data/carouselData";
import mainMenuData from "./common/data/mainMenuData";
import {mainMenuNavData} from "./common/data/mainMenuData";
import createStore from './store/configureStore';

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
      isOpen: false
    };
  }

  //设置isColorReversed
  setIsColorReversed = (isColorReversed) => {
    this.setState({
      isColorReversed: isColorReversed
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
  preLoader = () => {
    console.log('加载动画')
  }
  getConfirmation = () => {
    console.log(1)
    this.setState({
      isOpen: false
    })
    this.preLoader()
  }

  render() {
    let {setIsColorReversed, setIsOpen} = this
    let {isColorReversed, isOpen} = this.state
    return (
      <div>
        <Svg/>
        <MainHeader {...{
          isColorReversed,
          setIsOpen,
          isOpen
        }} />
        <MainMenu
          {...{
            isOpen,
            mainMenuData,
            mainMenuNavData
          }}
        />

        <div className="page-body" id="main-content">
          <Switch>
            <Route exact strict path="/" render={() => <Carousel
              {...{
                carouselData,
                setIsColorReversed
              }}
            />}/>
            <Route
              path="/categories"
              component={Categories}
              getUserConfirmation={() => this.getConfirmation}
              forceRefresh={!supportsHistory}
            />
            <Route
              path="/followus"
              component={FollowUs}
              getUserConfirmation={() => this.getConfirmation}
              forceRefresh={!supportsHistory}
            />
            <Route
              path="/contactus"
              component={Contact}
              getUserConfirmation={() => this.getConfirmation}
              forceRefresh={!supportsHistory}
            />
            <Route
              path="/artwork"
              component={ArtWork}
              getUserConfirmation={() => this.getConfirmation}
              forceRefresh={!supportsHistory}
            />
            <Route
              path="/artistdetails"
              component={ArtistDetails}
              getUserConfirmation={() => this.getConfirmation}
              forceRefresh={!supportsHistory}
            />
            <Route exact strict path='*' render={() => <h1>Page not found</h1>}/>
          </Switch>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
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
