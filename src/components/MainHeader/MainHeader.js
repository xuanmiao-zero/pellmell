import {Link} from 'react-router-dom'

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {isColorReversed, setIsOpen, isOpen} = this.props
    return (
      <div id="main-header"
           className={`mainheader${isColorReversed || isOpen ? ' is-colorreversed' : ''}`} /*为什么这样写不行？ （{'mainheader '+ isColorReversed?'is-colorreversed':''}*/
      >
        <a
          id="main-menu-toggle"
          className={`navigation-toggle u-link-underline u-font-montserrat${isOpen ? ' is-open' : ''}`}
          href="javascript:"
          onClick={setIsOpen}
        >
          <span className="navigation-toggle-open">menu</span>
          <span className="navigation-toggle-close">close</span>
        </a>
        <Link id="home-link" className="mainheader-logo" to="/" data-pm-nodetype="page" data-pm-nodename="home">
          <svg className="svg-icon svg-pellmell-dims">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#pellmell"></use>
          </svg>
        </Link>
      </div>
    );
  }
}