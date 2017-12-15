import {Link} from 'react-router-dom'
export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVideoPlay: false
    }
  }
  handleImageError=(id)=>{
    // console.log(id + '图片加载失败')移除该图片
    this.props.removeImageById(id)
  }

  render() {
    let {id, thumb:thumbSrc}= this.props
    let {isVideoPlay} = this.state
    return (
      <li className="feeditem" style={{margin: '0 16px' ,display:'inline-block', float:'left'}}>
        <Link className="feeditem-link" to={`/artwork?id=${id}`}>
          <div className="feeditem-thumbnail">
            <div className="feeditem-thumbnailwrapper">
              <img onError={this.handleImageError.bind(this, id)}  src={thumbSrc} width="240"/>
              <div className="feeditem-thumbnailBorder"></div>
              {
                isVideoPlay ? <div className="feeditem-videoPlay">
                  <svg className="svg-icon svg-playbig-dims">
                    <use xlinkHref="#playbig"></use>
                  </svg>
                </div> : ''
              }
            </div>
          </div>
        </Link>
      </li>
    );
  }
}