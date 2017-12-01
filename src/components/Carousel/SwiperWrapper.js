import SwiperPaginationItem from "./SwiperPaginationItem";

export default class SwiperWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchTime: this.props.switchTime,
      index:  this.props.index
    }
  }

  propsToState = (nextProps) => {
    this.setState({
      switchTime: nextProps.switchTime !==undefined ? nextProps.switchTime: this.props.switchTime,
      index:  nextProps.index !==undefined  ? nextProps.index: 1
    })
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps)  //React子组件渲染问题，比预期晚一次, 如何解决？使用nextProps。  因为setState为什么不会同步更新组件状态，直到render函数被调用的时候，this.state才得到更新。
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  onWindowResize = () =>{
    this.setState({})
  }

  render() {
    let {carouselData} = this.props
    let {switchTime, index} = this.state

    let translate3dX = index *  window.screen.width;
      //style 切换动画
    const ulStyle = {
      transform: `translate3d(-${translate3dX}px, 0px, 0px)`,
      transitionDuration: `${switchTime}ms`
    }
    //首尾各增加一条数据用于轮播
    let dataImgInfoArray = [
      {index: -1, ...carouselData[carouselData.length - 1]},
        ...carouselData.map((e, i) => {
        return {index: i, ...e}
      }),
      {index: carouselData.length , ...carouselData[0]}
    ]

    return (
      <ul className="swiper-wrapper" style={ulStyle}>
        {
          dataImgInfoArray.map(e => {
            return <SwiperPaginationItem key={e.index} dataImgInfo={e}/>
          })
        }
      </ul>
    );
  }
}
//deafaultProps可否写在类里面 ？
SwiperWrapper.deafaultProps ={
  switchTime: 500,
  index: 1
}
