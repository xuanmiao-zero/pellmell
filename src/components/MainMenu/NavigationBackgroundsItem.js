export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgStyle: {
        position: 'absolute',
        opacity: 1
      }
    }
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

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }

  shouldComponentUpdate(nextProps, nextState) {
    //_.isEqual和_.isEmpty是 lodash 插件里面的函数，lodash是个轻巧的JavaScript函数插件，可以处理多种常见的数据操作
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState) //只有当props或者state有变化才更新组件
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
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
    let {
      NavigationBackgroundsItemIsActive,
      e: imgData,
      index
    } = this.props
    let {backgroundAdaptive} = this
    let {
      handleImageErrored
    } = this
    let {imgStyle} = this.state
    return (
      <li
        className={`${NavigationBackgroundsItemIsActive === index ? 'is-active' : ''}`}
      >
        <img
          alt={imgData.name}
          src={imgData.src}
          width="1024"
          className="resize-cover"
          ref={(img) => {
            if (img !== null) {
              this.img = img
            }
          }}
          onLoad={() => {
            this.backgroundAdaptive(this.img.width / this.img.height)
          }}
          onError={handleImageErrored.bind(this)}
          style={imgStyle}
        />
      </li>
    );
  }
}
