import {Tween} from "../../common/js/function_collection"
export default class extends Component {
  constructor(props) {
    super(props)
    this.state={
      strokeDashoffset: 295.416,
      preStrokeDashoffset: 295.416,
      preIndex: 1
    }
  }

   ATween(begin, count, duration,fx,fn){
    //清除定时器
    clearInterval(this.timerID)
    let startTime = new Date().getTime()//运动前的时间
    //运动动画
    this.timerID = setInterval(() => {
      //计算已经运动过的时间
      //由于定时器执行间隔时间不稳定，受到其他程序影响，所以间隔时间要通过计算来获取
      let t = new Date().getTime()-startTime
      if(t>=duration){
        t = duration
        clearInterval(this.timerID)
      }
      //是否有fn参数
      this.setState({
        strokeDashoffset: Tween[fx](t,begin,count,duration)
      })
      if(t>=duration&&fn) fn()
    },30)
  }

  componentDidMount(){
    this.ATween(295.416, -295.416, this.props.intervalTime, 'linear', ()=> {
      //先将上一次的未走完的圆圈回归到零在进行下一次的动画
      this.ATween(0, 295.416, 500, 'linear')
    })//这样执行两次比较麻烦，还能在其他声明周期执行该动画吗
  }

  componentWillUnmount() {
    //停止画圈圈
    clearInterval(this.timerID);
  }

  componentWillReceiveProps() {
    /*let {strokeDashoffset} = this.state
    let {index} = this.props
    this.setState({
      preStrokeDashoffset: strokeDashoffset,
      preIndex: index
    })
    console.log(index, strokeDashoffset)*/

//开始画圈圈
    this.ATween(295.416, -295.416, this.props.intervalTime, 'linear', ()=> {
      //先将上一次的未走完的圆圈回归到零在进行下一次的动画
      this.ATween(0, 295.416, 500, 'linear')
    })//这样执行两次比较麻烦，还能在其他声明周期执行该动画吗
  }

  render() {
    let {strokeDashoffset} = this.state;
    let {index, count} = this.props;
    let Style ={}
    let SwiperProgressBarsItemArray = [];

    for(let i = 0; i < count; i++){
      if(i === index - 1){
        Style = {
          strokeDasharray: "295.416, 295.416",
          strokeDashoffset: strokeDashoffset
        }
      }else{
        Style = {
          strokeDasharray: "295.416, 295.416",
          strokeDashoffset: "295.416"
        }
      }
      SwiperProgressBarsItemArray[i] = (
        <li className="swiper-progressbars-circle"
            key={+new Date() + String(Math.random()).slice(2)}
        >
        <svg viewBox="0 0 100 100" style={{display: 'block'}}>
          <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
                stroke="currentColor"
                strokeWidth="6"
                fillOpacity="0"
                style={Style}
          ></path>
        </svg>
        </li>
      )
    }
    return (
      <ul className="swiper-progressbars">
        {
          SwiperProgressBarsItemArray
        }
      </ul>
    );
  }
}

<path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
      stroke="currentColor" stroke-width="6" fill-opacity="0" style="stroke-dasharray: 295.416, 295.416;"></path>