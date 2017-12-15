//框架
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom'
import Parallax from './parallax'

//引入action
import getWaterfallFlowDataAction from '../../actions/getWaterfallFlowDataAction'


class ArtWork extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      footerIsOpen: false,
      imgStyle: {
        position: 'absolute',
        opacity: 1,
        enlarged: false
      }
    }
  }

  switchButton = (ev) => {
    let windowWidth = document.documentElement.clientWidth
    let windowHeight = document.documentElement.clientHeight
    let X = ev.clientX
    let Y = ev.clientY

    if (this.state.enlarged) {
      this.refs.smaller.style.opacity = 1
      this.refs.smaller.style.left = X + 'px'
      this.refs.smaller.style.top = Y + 'px'
    }
    if (Y > 120 && Y < windowHeight - this.refs.footer.clientHeight) {
      this.refs.smaller.style.pointerEvents = ''
      if (X < windowWidth * 0.14) {
        this.refs.enlarge.style.opacity = 0
        this.refs.previousSlide.style.left = X + 'px'
        this.refs.previousSlide.style.top = Y + 'px'
        this.refs.previousSlide.style.opacity = 1
        this.refs.previousSlide.style.pointerEvents = ''
      } else if (X > windowWidth * 0.14 && X < windowWidth * 0.86) {
        this.refs.previousSlide.style.opacity = 0
        this.refs.nextSlide.style.opacity = 0
        this.refs.previousSlide.style.pointerEvents = 'none'
        this.refs.nextSlide.style.pointerEvents = 'none'
        this.refs.enlarge.style.left = X + 'px'
        this.refs.enlarge.style.top = Y + 'px'
        this.refs.enlarge.style.opacity = 1
      } else {
        this.refs.enlarge.style.opacity = 0
        this.refs.nextSlide.style.left = X + 'px'
        this.refs.nextSlide.style.top = Y + 'px'
        this.refs.nextSlide.style.opacity = 1
        this.refs.nextSlide.style.pointerEvents = ''
      }
    } else {
      this.refs.enlarge.style.opacity = 0
      this.refs.smaller.style.opacity = 0
      this.refs.previousSlide.style.opacity = 0
      this.refs.nextSlide.style.opacity = 0
      this.refs.smaller.style.pointerEvents = 'none'
    }
  }

  componentDidMount() {
    document.onmousemove = this.switchButton
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    document.onmousemove = null
    window.removeEventListener('resize', this.onWindowResize)
  }

  // 保持背景图片原始宽高比;
  // 如果屏幕宽高比与背景图片宽高比不一致，则以图片中心为基点等比缩放背景图片，以适应屏幕尺寸。
  //计算图片自适应宽高和位置
  resize = (imgRatio) => {
    // 背景图片尺寸
    let imgWidh = 1920,
      imgHeight = 1080
    // 图片宽高比
    // let imgRatio = imgWidh / imgHeight

    let offsetLeft = 0,
      offsetTop = 0
    // 浏览器viewport尺寸
    let winWidth = window.innerWidth,
      winHeight = window.innerHeight

    // 浏览器viewport宽高比
    let winRatio = winWidth / winHeight
    if (winRatio >= imgRatio) {
      // 屏幕宽高比大于图片宽高比，屏幕高度不足，图片向上偏移
      offsetLeft = 0
      offsetTop = (Math.ceil(winWidth / imgRatio) - winHeight) / 2
      return {
        width: winWidth,
        height: Math.round(winWidth / imgRatio),
        top: -offsetTop,
        left: offsetLeft
      }
    } else if (winRatio < imgRatio) {
      // 屏幕宽高比大于图片宽高比，屏幕宽度不足，图片向左偏移
      offsetLeft = (Math.ceil(winHeight * imgRatio) - winWidth) / 2
      offsetTop = 0
      return {
        width: winHeight * imgRatio,
        height: winHeight,
        top: offsetTop,
        left: -offsetLeft
      }
    }
  }

  onWindowResize = () => {
    this.backgroundAdaptive(this.img.width / this.img.height)
  }

  backgroundAdaptive = (imgRatio) => {
    this.setState({
      imgStyle: {
        position: 'absolute',
        opacity: 1,
        ...this.resize(imgRatio)
      }
    })
  }

  handleImageErrored = () => {
    this.setState({
      imgStyle: {
        position: 'absolute',
        opacity: 1
      }
    })
  }


  render() {
    let {footerIsOpen, imgStyle, enlarged} = this.state
    let {handleImageErrored} = this
    let {} = this.props
    return (
      <div className="page-container page-project page--fullscreen" style={{opacity: 1}}>
        <div className="swiper-container swiper-container-horizontal">
          <ul className="swiper-wrapper">
            <li className="swiper-slide swiper-slide-active"
                style={{backgroundColor: 'rgb(106, 181, 242)', width: '100%'}}>
              <div className="swiper-projectItemVisual">
                <div className="swiper-imgContainer">
                  <img
                    alt=""
                    src={require("./1.jpg")}
                    style={{
                      position: 'absolute', width: '100%',
                      ...imgStyle
                    }}
                    ref={(img) => {
                      if (img !== null) {
                        this.img = img
                      }
                    }}
                    onLoad={() => {
                      this.backgroundAdaptive(this.img.width / this.img.height)
                    }}
                    onError={handleImageErrored.bind(this)}
                  /></div>
              </div>
            </li>
          </ul>
          <a ref='previousSlide' className="swiper-button-prev project-nav-btn project-nav-prev " href="#previous-slide"
             style={{
               opacity: 0,
               cursor: 'none',
               bottom: 'auto',
               right: 'auto',
               transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)',
               pointerEvents: 'none',
               transition: 'opacity 0.5s'
             }}>
            <svg className="svg-icon svg-carousel-prev-dims">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#carousel-prev"></use>
            </svg>
          </a>
          <a ref='nextSlide' className="swiper-button-next project-nav-btn project-nav-next" href="#next-slide"
             style={{
               opacity: 0,
               cursor: 'none',
               bottom: 'auto',
               right: 'auto',
               transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)',
               pointerEvents: 'none',
               transition: 'opacity 0.5s'
             }}>
            <svg className="svg-icon svg-carousel-next-dims">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#carousel-next"></use>
            </svg>
          </a>
        </div>
        <div className="project-header">
          <Link className="project-header-close u-link-underline u-font-montserrat" to="/categories"
                data-pm-nodename="categories">Close</Link>
        </div>
        <div className="project-switcher">
          <a ref='enlarge' className="project-nav-btn project-nav-zoom" href="javascript:"
             onClick={() => {
               this.setState({
                 enlarged: true
               })
             }}
             style={{
               opacity: 1,
               cursor: 'none',
               bottom: 'auto',
               right: 'auto',
               transition: 'opacity 0.5s',
               transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)'
             }}>
            <svg className="svg-icon svg-carousel-zoom-in-dims">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#carousel-zoom-in"></use>
            </svg>
          </a>
        </div>
        <div className="project-zoom noUi-target noUi-ltr noUi-horizontal noUi-connect">
          <div className="noUi-base">
            <div className="noUi-origin noUi-background noUi-stacking">
              <div className="noUi-handle noUi-handle-lower"></div>
            </div>
          </div>
        </div>
        <div className="project-zoom-overlay" style={{opacity: 1, display: enlarged ? 'block' : 'none'}}>
          <div
            className="project-zoom-overlay-visual"
            ref={(re) => {
              if (re !== null) {
                new Parallax(re)
              }
            }}
          >
            <img
              data-depth-y='10'
              data-depth-x='2'
              className="resize-cover"
              src={require("./1.jpg")}
              style={{
                position: 'absolute', width: '100%',
                transform: 'scale(1.5)',
                ...imgStyle
              }}
            />
          </div>
          <div className="project-zoom-overlay-close"
               ref='smaller'
               onClick={() => {
                 this.setState({
                   enlarged: false
                 })
               }}
          >
            <svg className="svg-icon svg-carousel-zoom-out-dims">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#carousel-zoom-out"></use>
            </svg>
          </div>
        </div>
        <div
          onMouseLeave={() => {
            this.setState({
              footerIsOpen: false
            })
          }}
          className={`project-footer ${footerIsOpen ? ' is-open' : ''}`}
          ref="footer">
          <a className="project-footer-toggle u-font-montserrat" href="#toggle-infos">
            <span onMouseEnter={() => {
              this.setState({
                footerIsOpen: true
              })
            }} className="project-footer-toggle-open u-link-underline">Infos</span>
            <span className="project-footer-toggle-close u-link-underline">Close</span>
          </a>
          <div className="project-footer-bg" style={{backgroundColor: '#6ab5f2'}}></div>
          <div className="project-footer-items">
            <div className="project-footer-item">
              <span className="project-footer-item-label u-font-montserrat-bold">Artist.</span>
              <span className="project-footer-item-value">
               <Link to="/artistdetails" title="CREAM STUDIOS" className="project-footer-artistlink u-link-underline"
             data-pm-nodetype="artist" data-pm-nodename="cream-studios">CREAM STUDIOS</Link>
              </span>
            </div>
            <div className="project-footer-item">
              <span className="project-footer-item-label u-font-montserrat-bold">Project.</span>
              <span className="project-footer-item-value">2XU AD CAMPAIGN</span></div>
            <div className="project-footer-item">
              <span className="project-footer-item-label u-font-montserrat-bold">Agency.</span>
              <span className="project-footer-item-value">NONE</span></div>
            <div className="project-footer-item">
              <span className="project-footer-item-label u-font-montserrat-bold">Client.</span>
              <span className="project-footer-item-value">2XU</span></div>
            <div className="project-footer-item is-last">
              <span className="project-footer-item-label u-font-montserrat-bold">Broadcast.</span>
              <span className="project-footer-item-value">AUSTRALIA</span></div>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ArtWork)