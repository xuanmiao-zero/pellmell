import QueueAnim from 'rc-queue-anim'
import {Link} from 'react-router-dom'
import Select2Container from './Select2Container'

//类别
import categoriesData from '../../common/data/categoriesData'

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.categoriesData = categoriesData
    this.state = {
      isOpen: false
    }
  }

  render() {
    console.log(this.state.isOpen)
    let {getWaterfallFlowData} = this.props
    return (
      <QueueAnim type="bottom">
        {[<h1 className="page-title u-font-bold anim-intro-slide" key="page-title">
          Select a category
        </h1>,
          <div className="feed-filters anim-intro-slide"
               onClick={() => {
                 this.setState({
                   isOpen: !this.state.isOpen
                 })
               }}
               onBlur={() => {
                 this.setState({
                   isOpen: false
                 })
               }}
               key="feed-filters">
            <div className="tags">
              <ul className="tags-list">
                {
                  this.categoriesData.map((e) => {
                    return <li className="tag-item" key={e.id}>
                      <Link
                        to={`?${e.name}`}//`/categories/${e.name}`
                        className="tag-link "
                        onClick={() => {
                          getWaterfallFlowData(e.name)
                        }}
                      >
                        <span className="tag-name u-font-semibold">{e.name}</span>
                        <span className="tag-count">{e.count}</span>
                      </Link>
                    </li>
                  })
                }
              </ul>
              <select className="tags-select select2-hidden-accessible" style={{width: '100%'}} tabIndex="-1"
                      aria-hidden="true">
                <option data-pm-tagid="all--431" value="all" defaultValue="selected">All 431</option>
                <option data-pm-tagid="abstract--57" value="abstract--57">abstract 57</option>
                <option data-pm-tagid="luxury--11" value="luxury--11">luxury 11</option>
                <option data-pm-tagid="animation--19" value="animation--19">animation 19</option>
                <option data-pm-tagid="animals--42" value="animals--42">animals 42</option>
                <option data-pm-tagid="architecture--24" value="architecture--24">architecture 24</option>
                <option data-pm-tagid="cartoon--93" value="cartoon--93">cartoon 93</option>
                <option data-pm-tagid="characters--90" value="characters--90">characters 90</option>
                <option data-pm-tagid="christmas--30" value="christmas--30">christmas 30</option>
                <option data-pm-tagid="environment--65" value="environment--65">environment 65</option>
                <option data-pm-tagid="food--30" value="food--30">food 30</option>
                <option data-pm-tagid="liquids--22" value="liquids--22">liquids 22</option>
                <option data-pm-tagid="lights-neons--28" value="lights-neons--28">lights-neons 28</option>
                <option data-pm-tagid="matte-painting--62" value="matte-painting--62">matte-painting 62</option>
                <option data-pm-tagid="products--61" value="products--61">products 61</option>
                <option data-pm-tagid="photorealism--146" value="photorealism--146">photorealism 146</option>
                <option data-pm-tagid="sport--46" value="sport--46">sport 46</option>
                <option data-pm-tagid="transportation--53" value="transportation--53">transportation 53</option>
                <option data-pm-tagid="typography--84" value="typography--84">typography 84</option>
              </select>
              <span
                className="select2 select2-container select2-container--default select2-container--below select2-container--focus"
                dir="ltr" style={{width: '100%'}}>
            <span className="selection">
              <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                    aria-expanded="false"
                    tabIndex="0" aria-labelledby="select2-vx73-container">
                <span className="select2-selection__rendered" id="select2-vx73-container" title="All 431">
                  <span className="tag-name u-font-semibold">all</span>
                  <span className="tag-count">431</span></span>
                <span className="select2-selection__arrow" role="presentation">
                  <b role="presentation"></b>
                </span>
              </span>
            </span>
            <span className="dropdown-wrapper" aria-hidden="true"></span>
          </span>
            </div>
          </div>
        ]}
        {this.state.isOpen? <Select2Container/>: ''}
          </QueueAnim>
    );
  }
}