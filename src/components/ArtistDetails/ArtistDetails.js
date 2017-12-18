import {getScrollTop, getWindowHeight} from '@/src/common/js/tool/scrollSetBottom'
import {getCss, Tween, scroll} from '@/src/common/js/function_collection.js'

const OnImagesLoaded = require('react-on-images-loaded');
import QueueAnim from 'rc-queue-anim'

//框架
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getWaterfallFlowDataAction from '../../actions/getWaterfallFlowDataAction'//action

//引入组件
import FeedItem from './FeedItem'


class ArtistDetails extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  ATweenNum = (obj, count, duration, attr, fx, fn) => {
    //清除定时器
    clearInterval(obj.timer)
    let startTime = new Date().getTime();//运动前的时间
    let begin = getScrollTop()//运动前的位置

    //运动动画
    obj.timer = setInterval(function () {
      //计算已经运动过的时间
      //由于定时器执行间隔时间不稳定，受到其他程序影响，所以间隔时间要通过计算来获取
      let t = new Date().getTime() - startTime;
      if (t >= duration) {
        t = duration;
        clearInterval(obj.timer);
      }
      // console.log(t, begin, count, duration)
      // console.log(Tween[fx](t, begin, count, duration))
      // let obj[attr] = Tween[fx](t, begin, count, duration);
      let temp= Tween[fx](t, begin, count, duration);
      document.documentElement.scrollTop = temp;
      //是否有fn参数
      if (t >= duration && fn) fn();
    }, 20);
  }

  downScroll = () => {
    if (getScrollTop() < document.documentElement.clientHeight - 1) {
      setTimeout(()=>{
        this.ATweenNum(document.body || document.documentElement, document.documentElement.clientHeight -  getScrollTop(), 400, 'scrollTop', 'easeOut')
      },50)
    }
  }

  upScroll = () => {
    if (getScrollTop() <= getWindowHeight()) {
      setTimeout(()=>{
        this.ATweenNum(document.body || document.documentElement, -document.documentElement.clientHeight, 400, 'scrollTop', 'easeOut')
      },50)
    }
  }

  componentDidMount() {
    let option = {}
    option.obj = document.documentElement
    option.up = this.upScroll
    option.down = this.downScroll
    scroll(option)
    this.props.actions.getWaterfallFlowData('wallhaven')
  }

  componentWillUnmount() {
    document.onscroll = null
  }

  render() {
    let {WaterfallFlow: WaterfallFlowState, actions} = this.props
    let {removeImageById} = actions
    let {isFetching, data} = WaterfallFlowState
    let {images} = data
    return (
      <div className="page-container page-artist" data-pm-pageid="artist-cream-studios"
           data-pm-headerreversecolor="false" style={{opacity: 1}}>
        <div className="artist-header">
          <div className="artist-visual anim-intro-slide"
               style={{backgroundColor: 'rgb(144, 166, 57)', opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>
            <img alt="" src={require('./1.jpg')} //images[Math.floor(Math.random()*24)].thumb
                 width={512}
                 className="resize-cover"
                 style={{
                   opacity: 1,
                   height: '100%',
                   position: 'absolute',
                   left: 0
                 }}/>
          </div>
          <div className="artist-info">
            <div className="artist-infoInner">
              <h1 className="artist-name u-font-ultrabold anim-intro-slide"
                  style={{opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>CREAM STUDIOS</h1>
              <div className="artist-description u-font-lora anim-intro-slide"
                   style={{opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>
                <p>With an enviable reputation for high-tech photographic retouching and 3D-imaging :</p>
                <p>Cream has established itself as one of the </p>
                <p>industries leading studios in Australia.</p>
              </div>
              <div className="artist-broadcast u-font-lora-italic anim-intro-slide"
                   style={{opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>
                Represented in France &amp; UK.
              </div>
              <a className="artist-scrollDown" href="#artist-feed" onClick={this.downScroll}>
                <span className="artist-scrollDown-default">
                  <svg className="svg-icon svg-scrolldown-dims">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#scrolldown"/>
                  </svg>
                </span>
                <span className="artist-scrollDown-hover">
                  <svg className="svg-icon svg-scrolldown-dims">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#scrolldown"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div id="artist-feed" className="artist-feed">
          <ul className="feed" style={{position: 'relative'}}>
            <QueueAnim type="bottom" duration={[800, 0]}>
              {
                (images || []).map(e => {
                  return <FeedItem
                    key={e.id}
                    {
                      ...e
                    }
                    {
                      ...{
                        removeImageById
                      }
                    }
                  />
                })
              }
            </QueueAnim>
          </ul>
        </div>
      </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails)


// let mockData = {
//   "end": false,
//   "totalPages": 32,
//   "images": [{
//     "id": 482373,
//     "width": 3840,
//     "height": 2160,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-482373.jpg"
//   }, {
//     "id": 389116,
//     "width": 1920,
//     "height": 1200,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389116.jpg"
//   }, {
//     "id": 171366,
//     "width": 2560,
//     "height": 1600,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-171366.jpg"
//   }, {
//     "id": 290560,
//     "width": 3000,
//     "height": 1652,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-290560.jpg"
//   }, {
//     "id": 389124,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389124.jpg"
//   }, {
//     "id": 389120,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389120.jpg"
//   }, {
//     "id": 165863,
//     "width": 1920,
//     "height": 1200,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-165863.jpg"
//   }, {
//     "id": 155684,
//     "width": 1920,
//     "height": 1200,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-155684.jpg"
//   }, {
//     "id": 221362,
//     "width": 1920,
//     "height": 1200,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-221362.jpg"
//   }, {
//     "id": 389125,
//     "width": 1600,
//     "height": 900,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389125.jpg"
//   }, {
//     "id": 389111,
//     "width": 1920,
//     "height": 1200,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389111.jpg"
//   }, {
//     "id": 389114,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389114.jpg"
//   }, {
//     "id": 332714,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-332714.jpg"
//   }, {
//     "id": 389126,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389126.jpg"
//   }, {
//     "id": 114571,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-114571.jpg"
//   }, {
//     "id": 155683,
//     "width": 1920,
//     "height": 1200,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-155683.jpg"
//   }, {
//     "id": 191359,
//     "width": 1366,
//     "height": 768,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-191359.jpg"
//   }, {
//     "id": 24487,
//     "width": 1680,
//     "height": 1050,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-24487.jpg"
//   }, {
//     "id": 389118,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389118.jpg"
//   }, {
//     "id": 389113,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389113.jpg"
//   }, {
//     "id": 389107,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-389107.jpg"
//   }, {
//     "id": 116122,
//     "width": 1920,
//     "height": 1080,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-116122.jpg"
//   }, {
//     "id": 171360,
//     "width": 2200,
//     "height": 1576,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-171360.jpg"
//   }, {
//     "id": 67056,
//     "width": 1366,
//     "height": 768,
//     "thumb": "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-67056.jpg"
//   }]
// }
