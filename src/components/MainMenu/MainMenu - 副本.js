import {Tween} from "../../common/js/function_collection"
import NavigationBackgroundsItem from "./NavigationBackgroundsItem"
import NavigationItemLevel1 from "./NavigationItemLevel1"
import QueueAnim from 'rc-queue-anim';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSwitchOpacity: 0,
      isOpen: false,
      NavigationBackgroundsItemIsActive: Math.floor(Math.random() * 12),
      width: window.innerWidth,
      height: window.innerHeight,
      navigationLinkLevel0IsActive: 0,
      liChildren0: [],
    }
  }

  ATween = (attribute, begin, count, duration, fx, fn) => {
    clearInterval(this.timerID)
    let startTime = new Date().getTime()//运动前的时间
    this.timerID = setInterval(() => {
      //计算已经运动过的时间，由于定时器执行间隔时间不稳定，受到其他程序影响，所以间隔时间要通过计算来获取
      let t = new Date().getTime() - startTime
      if (t >= duration) {
        t = duration
        clearInterval(this.timerID)
      }
      //运动动画
      this.setState({
        [attribute]: Tween[fx](t, begin, count, duration)
      })

      if (t >= duration && fn) {
        fn() //有fn参数则执行
      }
    }, 30)
  }


  NavigationItemLevel0DataAnimate = () => {
    let {mainMenuData, mainMenuNavData} = this.props
    let {navigationLinkLevel0IsActive, isOpen} = this.state
    /*一级菜单*/
    let listLevel0 = mainMenuNavData.map((e, i) => {
      return <li
        key={e.id}
        className="navigation-item navigation-item--level0"
      >
        <span
          className={`navigation-link navigation-link--level0 ${navigationLinkLevel0IsActive === i ? ' is-highlighted' : ' is-faded'}`}
          data-pm-nodetype="page"
          data-pm-nodename="artist">
          {e.name}
        </span>
        {
          i ? '' : <NavigationItemLevel1
            {...{
              mainMenuData,
              isOpen
            }}
          />
        }
      </li>
    })
    this.setState({
      liChildren0: listLevel0
    })
  }

  openMainMenu = (nextProps) => {
    let {isOpen} = nextProps
    let {openAnimate, closeAnimate} = this
    isOpen ? openAnimate() : closeAnimate()
  }

  //关闭菜单动画
  closeAnimate = () => {
    let {ATween} = this
    ATween('menuSwitchOpacity', 1, -1, 500, 'linear', () => {
      this.setState({
        isOpen: false,
        liChildren0: null,
      })
    })
  }

  //打开菜单动画
  openAnimate = () => {
    let {ATween, NavigationItemLevel0DataAnimate} = this
    this.setState({
      isOpen: true,
      NavigationBackgroundsItemIsActive: Math.floor(Math.random() * 12),
    })
    ATween('menuSwitchOpacity', 0, 1, 500, 'linear', NavigationItemLevel0DataAnimate)
  }

  componentWillReceiveProps(nextProps) {
    /*
    *当组件有动画并且动画会改变state时，动画可以写在componentWillReceiveProps来防止组件陷入无限渲染的死循环中，如果开始就需要渲染一次动画，可以再在componentDidMount中再调用一次
    * */
    if (!_.isEqual(this.props, nextProps)) {
      //随机背景图
      this.setState({
        isActive: Math.floor(Math.random() * 12),
      })
      let {openMainMenu} = this
      openMainMenu(nextProps)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //_.isEqual和_.isEmpty是 lodash 插件里面的函数，lodash是个轻巧的JavaScript函数插件，可以处理多种常见的数据操作
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState) //只有当props或者state有变化才更新组件
  }

  render() {
    let {
      menuSwitchOpacity,
      isOpen,
      NavigationBackgroundsItemIsActive,
      navigationLinkLevel0IsActive,
      liChildren0,
    } = this.state
    let {mainMenuData, mainMenuNavData} = this.props
    let {backgroundAdaptive} = this
    return (
      <nav
        id="main-menu"
        className={`navigation${isOpen ? ' is-open' : ''}`}
        style={{
          opacity: menuSwitchOpacity,
        }}
      >
        <ul className="navigation-backgrounds">
          {
            mainMenuData.map((e, index) => {
              return <NavigationBackgroundsItem
                key={e.id}
                {...{
                  NavigationBackgroundsItemIsActive,
                  backgroundAdaptive,
                  e,
                  index
                }}
              />
            })
          }
        </ul>
        <div className="navigation-scroller">
          <QueueAnim
            component="ul"
            animConfig={[
              {opacity: [1, 0], translateY: [0, 100]}
            ]}
            ease={['easeOutQuart', 'easeInOutQuart']}
            duration={[500, 0]}
            interval={[50, 0]}
            delay={[500, 0]}
            id="navigation-pages-list"
            className="navigation-list navigation-list--level0"
          >
            {liChildren0}
          </QueueAnim>
        </div>
      </nav>
    );
  }
}