import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      preloaderProgressTranslateX: 0,
      preloaderBgTranslateX: 0,
      preloaderLayerwrapperOpacity: 1,
      preloaderBaselineOpacity: 1,
      preloaderDisplay: 'block'
    };
  }

  static propTypes = {
    height: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.object,
    id: PropTypes.string,
    className: PropTypes.string
  };

  componentDidMount() {
    this.randomColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    this.intervalId = setInterval(() => {
      this.setState({
        width: this.state.width + (1 - this.state.width) * 0.25,
      })
    }, 500 + 200 * Math.random());
  }

  getStyles = () => {
    const styles = {
      main: {
        backgroundColor: this.props.color || this.randomColor,
        transition: 'width 0.5s, transform 0.5s',
        width: Math.floor(this.state.width * 100) + '%',
        transform: `translateX(${this.state.preloaderProgressTranslateX})`
      },
      bg: {
        transition: 'transform 0.5s',
        transform: `translateX(${this.state.preloaderBgTranslateX})`
      }
    };

    if (this.props.style) {
      styles.main = Object.assign({}, this.props.style, styles.main);
    }
    return styles;
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.translateX);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.flag) {
      this.setState({
        width: 1
      })
      // 0.5秒后 ，logo消失, 0.5秒后 前景往右移，再过0.2秒背景开始往右移
      if (this.getStyles().main.width !== '100%') {
        setTimeout(() => {
          this.setState({
            preloaderBaselineOpacity: 0
          })
          setTimeout(() => {
            this.setState({
              preloaderLayerwrapperOpacity: 0
            })
            setTimeout(() => {
              this.setState({
                preloaderProgressTranslateX: '101%',
              })
              setTimeout(() => {
                this.setState({
                  preloaderBgTranslateX: '101%'
                })
                setTimeout(()=>this.setState({preloaderDisplay: 'none'}), 200)
              }, 200)
            }, 500)
          }, 300)
        }, 300)
      }
    }
  }


  render() {
    const styles = this.getStyles()
    const {id, className} = this.props;
    return (
      <div id="preloader" style={{display: this.state.preloaderDisplay}}>
        <div className="preloader-layer preloader-bg"
             style={styles.bg}> {/*style={{color: 'rgb(97, 85, 147)', transform: 'translate(101%, 0%) matrix(1, 0, 0, 1, 0, 0)'}}*/}
          <div className="preloader-layerwrapper" style={{opacity: this.state.preloaderLayerwrapperOpacity}}>
            <div className="preloader-logo">
              <svg className="svg-icon svg-pellmellbig-dims">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#pellmellbig"/>
              </svg>
            </div>
            <div className="preloader-baseline u-font-semibold">Paris – London</div>
          </div>
        </div>
        <div className="preloader-layer preloader-layer--inversed preloader-progress"
             style={styles.main}>{/* style={{color: 'rgb(97, 85, 147)', backgroundColor: 'rgb(97, 85, 147)', width: '100%', transform: 'translate(101%, 0%) matrix(1, 0, 0, 1, 0, 0)'}}*/}
          <div className="preloader-layerwrapper">
            <div className="preloader-logo"
                 style={{transition: 'opacity 0.3s', opacity: this.state.preloaderLayerwrapperOpacity}}>
              <svg className="svg-icon svg-pellmellbig-dims">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#pellmellbig"/>
              </svg>
            </div>
            <div className="preloader-baseline u-font-semibold" style={{transition: 'opacity 0.3s', opacity: this.state.preloaderBaselineOpacity}}>
              Paris – London
            </div>
          </div>
        </div>
      </div>
    );
  }
}