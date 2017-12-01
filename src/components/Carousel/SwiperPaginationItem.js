export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {dataImgInfo} = this.props;
    let imgStyle = {
      position: "absolute",
      width:  window.screen.width ,
      height: window.screen.height,
      top: - (window.screen.height - document.documentElement.clientHeight) / 2,
      left: 0,
      opacity: 1,
    }
    //判断是否为移动设备
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
      let devAspectRatio = 1.416
      imgStyle = {
        position: "absolute",
        width:  window.screen.height  * devAspectRatio,
        height: window.screen.height,
        top: 0,
        left: -(window.screen.height  * devAspectRatio - window.screen.width)/2 , //图片居中
        opacity: 1,
      }
    }
    let {id, src, href, name, type, headerreversecolor} = dataImgInfo;
    return(
      <li className="swiper-slide"
          style={{backgroundColor: "rgb(134, 177, 199)", width:  window.screen.width}}
          data-pm-headerreversecolor={headerreversecolor}
          data-swiper-slide-index={id}>
        <div className="swiper-projectItemVisual">
          <img
               src={src}
               width="1024" className="resize-cover"
               style={imgStyle}
          />
        </div>
        <a className="swiper-artistName u-font-montserrat u-link-underlinereverse"
           href={href} data-pm-nodetype={type}
           data-pm-nodename={name}>
          {name}
        </a>
      </li>
    );
  }
}