import QueueAnim from 'rc-queue-anim'
import {Link} from 'react-router-dom'

import NavigationItemLevel1 from './NavigationItemLevel1'
import Parallax from 'parallax-js'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationListShow: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //_.isEqual和_.isEmpty是 lodash 插件里面的函数，lodash是个轻巧的JavaScript函数插件，可以处理多种常见的数据操作
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState) //只有当props或者state有变化才更新组件
  }

  render() {
    let {
      mainMenuNavData,
      navigationListShow,
      navigationLinkLevel0IsActive,
      mainMenuData,
      changeNavigationLinkLevel0IsActive
    } = this.props

    return (
      <div className="navigation-scroller">
        <QueueAnim
          component="ul"
          animConfig={[
            {opacity: [1, 0], translateY: [0, 100]}
          ]}
          ease={['easeOutCubic', 'easeOutCubic']}
          duration={[500, 500]}
          interval={[40, 0]}
          delay={[500, 0]}
          id="navigation-pages-list"
          className="navigation-list navigation-list--level0"
        >
          {navigationListShow ?
            mainMenuNavData.map((e, i) => {
              return <li
                key={e.id}
                className="navigation-item navigation-item--level0"
              >
                {i ? <Link
                  to={{
                    pathname: e.name.toLowerCase().replace	(/\s/g, ''),
                  }}
                  onMouseEnter={changeNavigationLinkLevel0IsActive.bind(this, i)}
                  className={`navigation-link navigation-link--level0 ${navigationLinkLevel0IsActive === i ? ' is-highlighted' : ' is-faded'}`}
                  data-pm-nodetype="page"
                  data-pm-nodename="artist"
                >
                  {e.name}
                </Link> : <span
                  onMouseEnter={changeNavigationLinkLevel0IsActive.bind(this, i)}
                  className={`navigation-link navigation-link--level0 ${navigationLinkLevel0IsActive === i ? ' is-highlighted' : ' is-faded'}`}
                  data-pm-nodetype="page"
                  data-pm-nodename="artist"
                >
                  {e.name}
                </span>
                }
                {
                  i ? '' :
                    <div
                      id="navigation-container2"
                      //用来消除parall带来的影响
                      style={{
                        position: 'absolute',
                        left: '100%',
                        display: 'inline-block',
                        width: '100%',
                        pointerEvents: "auto"
                      }}
                      ref={(re) => {
                        if (re !== null) {
                          new Parallax(re, {
                            limitY: 100,
                            originY: 0,
                          })
                        }
                      }}
                    >
                      <QueueAnim
                        component="ul"
                        animConfig={[
                          {opacity: [1, 0], translateX: [0, 100]}
                        ]}
                        ease={['easeOutCubic', 'easeOutCubic']}
                        duration={[500, 0]}
                        interval={[40, 0]}
                        delay={[500, 0]}
                        id="navigation-artists-list"
                        className="navigation-list navigation-list--level1"
                        enterForcedRePlay
                        data-depth-y="4"
                        style={{
                          pointerEvents: "auto"
                        }}
                      >
                        {
                          (mainMenuData).sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN', {sensitivity: 'accent'})).map(e => {
                            return <NavigationItemLevel1
                              key={e.id}
                              {...{
                                e,
                                i,
                                navigationLinkLevel0IsActive
                              }}
                            />
                          })
                        }
                      </QueueAnim>
                    </div>
                }
              </li>
            }) : null
          }
        </QueueAnim>

      </div>
    );
  }
}