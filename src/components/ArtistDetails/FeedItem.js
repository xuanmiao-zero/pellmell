export default class extends Component {
  constructor(props) {
    super(props)
  }

  handleImageError=(id)=>{
    // console.log(id + '图片加载失败')移除该图片
    this.props.removeImageById(id)
  }

  render() {
    let {id, thumb: thumbSrc}= this.props
    return (
      <li className="feeditem" style={{display:'inline-block', float: 'left', margin: 10}}>
        <a className="feeditem-link" href="/artist/cream-studios/2xu-ad-campaign/2xu-women"
           data-pm-nodetype="projectitem" data-pm-nodename="2xu-women">
          <div className="feeditem-thumbnail" style={{backgroundColor: '#ed7cc0'}}>
            <div className="feeditem-thumbnailwrapper"
                 style={{opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)'}}>
              <img onError={this.handleImageError.bind(this, id)} alt="" src={thumbSrc} width={400} />
              <div className="feeditem-thumbnailBorder" style={{borderColor: '#ed7cc0'}}/>
            </div>
          </div>
          <div className="feeditem-name u-font-bold">
                  <span className="u-link-underline feeditem-namewrapper">
                    2XU WOMEN
                  </span>
          </div>
        </a>
      </li>
    );
  }
}