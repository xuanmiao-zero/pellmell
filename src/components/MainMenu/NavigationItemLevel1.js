import Parallax from 'parallax-js'
import {Link} from 'react-router-dom'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animReverse: false
    }
  }

  componentDidMount() {
    let scene = document.getElementById("navigation-container2");

  }

  render() {
    let {
      e,
      i: index,
      navigationLinkLevel0IsActive
    } = this.props
    let {animReverse} = this.state
    return (
      <li
        className="navigation-item navigation-item--level1">
        <Link
          className={`navigation-link navigation-link--level1
          ${navigationLinkLevel0IsActive === index ? ' is-highlighted' : ' is-faded'}
          ${animReverse ? ' anim-reverse' : ' '}
          `}
          onMouseOver={() => {
            this.setState({animReverse: !this.state.animReverse})
          }}
          to='/artwork'
          onClick={this.props.setIsOpen}
        >
          {e.name.replace(/-/g, ' ')}
        </Link>
      </li>
    );
  }
}