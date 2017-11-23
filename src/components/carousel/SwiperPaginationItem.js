export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {dataImgInfo} = this.props;
    let {index, src, href, name, type, headerreversecolor} = dataImgInfo;
    return(
      <li className="swiper-slide"
          style={{backgroundColor: "rgb(134, 177, 199)", width: 1366}}
          data-pm-headerreversecolor={headerreversecolor}
          data-swiper-slide-index={index}>
        <div className="swiper-projectItemVisual">
          <img
               src={src}
               width="1024" className="resize-cover"
               style={{
                 position: "absolute",
                 width: 1366,
                 height: 768,
                 top: -60.5,
                 left: 0,
                 opacity: 1,
               }}
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