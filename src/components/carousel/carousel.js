import SwiperWrapper from "./SwiperWrapper";
import SwiperProgressBars from "./SwiperProgressBars";
import SwiperPagination from "./SwiperPagination";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      switchTime: this.props.switchTime,
      intervalTime: this.props.intervalTime,
      preIndex: 0
    }
  }

  componentDidMount() {
    this.carouselStart()
  }

  componentWillUnmount() {
    this.carouselEnd()
  }

  //走马灯切换
  carouselSwitch() {
    this.modifyCarouselIndex(this.state.index)
  }

  //修改轮播图序号
  modifyCarouselIndex = (index) => {
    let {carouselData} = this.props
    this.setState({
      index: ++index > carouselData.length + 1 ? 1 : index,   //当到最后一张时，回到第二张
    })
  }

  //走马灯开始跑
  carouselStart = () => {
    this.timerID = setInterval(
      () => this.carouselSwitch(),
      this.props.intervalTime + this.props.switchTime
    );
  }

  //走马灯停止
  carouselEnd = () => {
    clearInterval(this.timerID)
  }

  propsToState = (nextProps) => {
    this.setState({
      switchTime: nextProps.switchTime !== undefined ? nextProps.switchTime : this.props.switchTime,
      intervalTime: nextProps.intervalTime !== undefined ? nextProps.intervalTime : this.props.intervalTime,
    })
  }//每个组件都这样写很麻烦，如何改进

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps)
  }

  componentDidUpdate(prevProps, prevState) { //prevProps指的是什么？
    this.judgeIndex()
    if (prevState.index !== this.state.index) {
      let index1 = this.indexSwitch(this.state.index)
      let {isColorReversed} = this.props.carouselData[index1]
      //修改父级组件state的sColorReversed
      this.props.setIsColorReversed(isColorReversed)
      return true;
    }
    return false;
  }

  //判断图片轮播是否到达边界并处理
  judgeIndex = () => {
    let {carouselData} = this.props
    if (this.state.index === carouselData.length + 1) {
      this.setState({
        index: 0,
        switchTime: 0
      })
    } else if (this.state.index === 0) {
      this.setState({
        index: 1,
        switchTime: this.props.switchTime //再次修改回来后，这里的图片切换时间是配置中的用户时间吗？
      })
    }
  }

  indexSwitch = (index) => {
    let {carouselData} = this.props
    // let index1 = index - 1 >= carouselData.length ? 1: index - 1
    // index1 = index1 === -1 ? carouselData.length: index1
    let index1 = 0;
    if (index === 0) {
      index1 = carouselData.length - 1
    } else if (index === carouselData.length + 1) {
      index1 = 0
    } else {
      index1 = index - 1
    }
    return index1
  }

  render() {
    let {index, switchTime, intervalTime} = this.state
    let {
      indexSwitch,
      modifyCarouselIndex,
      carouselStart,
      carouselEnd
    } = this
    let {carouselData} = this.props

    let index1 = indexSwitch(index)
    let {isColorReversed} = carouselData[index1]
    let color = isColorReversed ? 'is-colorreversed' : ''

    return (
      <div className={`page-container page-home page--fullscreen ${color}`} data-pm-pageid="page-home"
           data-pm-pagetransitioncolor="#ccb66e">
        <div className="swiper-container swiper-container-horizontal">
          <SwiperWrapper carouselData={carouselData} index={index} switchTime={switchTime}/>
          <SwiperProgressBars count={carouselData.length} index={index} intervalTime={intervalTime}/>
          <SwiperPagination
            index={index1}
            count={carouselData.length}
            modifyCarouselIndex={i => modifyCarouselIndex(i)} /*{modifyCarouselIndex}*/
            {...{
              carouselStart,
              carouselEnd
            }}
          />
        </div>
      </div>
    );
  }
}

//默认配置
Carousel.defaultProps = {
  intervalTime: 4000,  //走马灯切换间隔时间 默认4000ms
  switchTime: 500,    //图片切换时间
  pause: true,
  autoplay: true,
  dots: true,
  arrows: true,
  items: [],
}