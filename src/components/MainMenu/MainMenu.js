import {Tween} from "../../common/js/function_collection"
import NavigationBackgroundsItem from "./NavigationBackgroundsItem"

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
      navigationItemLevel0Opacity: 0,
      navigationItemLevel0TransLateY: 100,
    }
  }

  ATween = ( attribute, begin, count, duration, fx, fn) => {
    let startTime = new Date().getTime()//运动前的时间
    let timerID = Symbol()
    this[timerID] = setInterval(() => {
      //计算已经运动过的时间，由于定时器执行间隔时间不稳定，受到其他程序影响，所以间隔时间要通过计算来获取
      let t = new Date().getTime() - startTime
      if (t >= duration) {
        t = duration
        clearInterval(this[timerID])
      }
      //运动动画
      this.setState({
        [attribute]: Tween[fx](t, begin, count, duration)
      })
      if (t >= duration && fn) fn() //是否有fn参数
    }, 30)
  }

  //打开菜单动画
  openAnimate = () => {
    let {ATween} = this
    this.setState({
      isOpen: true
    })
    ATween('menuSwitchOpacity', 0, 1, 500, 'linear', function () {
      ATween('navigationItemLevel0Opacity', 0, 1, 1000, 'easeOut')
      ATween('navigationItemLevel0TransLateY', 100, -100, 500, 'easeOut')
    }) //菜单列表动画
  }

  //关闭菜单动画
  closeAnimate = () => {
    this.setState({
      navigationItemLevel0Opacity: 0
    })
    let {ATween} = this
    ATween('menuSwitchOpacity', 1, -1, 1000, 'linear', () => {
      this.setState({
        isOpen: false,
      })
    })
  }

  openMainMenu = (nextProps) => {
    let {isOpen} = nextProps
    let {openAnimate, closeAnimate} = this
    isOpen ? openAnimate() : closeAnimate()
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
      navigationItemLevel0TransLateY, 
      NavigationBackgroundsItemIsActive, 
      navigationLinkLevel0IsActive,
      navigationItemLevel0Opacity
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
          <ul id="navigation-pages-list" className="navigation-list navigation-list--level0">
            {
              mainMenuNavData.map((e, i) => {
                return <li
                  key={e.id}
                  data-node-id={e.id}
                  className="navigation-item navigation-item--level0"
                  style={{
                    opacity: navigationItemLevel0Opacity,
                    transform: `translate(0%, ${navigationItemLevel0TransLateY}%)`
                  }}
                >
                  <span className={`navigation-link navigation-link--level0 ${navigationLinkLevel0IsActive?' is-highlighted': ' is-faded'}`} data-pm-nodetype="page"
                        data-pm-nodename="artist">
                    {e.name}
                  </span>
                  {
                    i ? '' :
                      <ul id="navigation-artists-list" className="navigation-list navigation-list--level1">
                        {
                          mainMenuData.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN', {sensitivity: 'accent'})).map(e => {
                            return <li
                              key={e.id}
                              data-node-id={e.id}
                              className="navigation-item navigation-item--level1">
                              <a className="navigation-link navigation-link--level1 is-faded" data-pm-nodetype="artist"
                                 data-pm-nodename="andre-beato-new" href="/artist/andre-beato-new">{e.name}</a>
                            </li>
                          })
                        }
                      </ul>
                  }
                </li>
              })
            }

          </ul>
        </div>
      </nav>
    );
  }
}