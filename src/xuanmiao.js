import './common/style/index.css';

import Svg from './components/svg/svg';
import MainHeader from './components/MainHeader/MainHeader';
import MainMenu from './components/MainMenu/MainMenu';
import Carousel from './components/Carousel/Carousel';
//引入数据
import carouselData from "./common/data/carouselData";
import mainMenuData from "./common/data/mainMenuData";
import {mainMenuNavData} from "./common/data/mainMenuData";

import 'lodash'

class XuanMiao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isColorReversed: false,
      isOpen: false
    };
  }

  //设置isColorReversed
  setIsColorReversed = (isColorReversed)=>{
    this.setState({
      isColorReversed: isColorReversed
    })
  }

  /*
  * 点击菜单按钮触发的操作
  * 切换IsColorReversed 状态（true false）
  * 渐变MainMenu的透明度到 （1 0）
  * */
  setIsOpen = () => {
    //切换IsColorReversed 状态（true false）
    this.setState({
      isOpen: !this.state.isOpen
    })
  //渐变MainMenu的透明度到 （1 0）
  }

  render() {
    let {setIsColorReversed, setIsOpen} = this
    let {isColorReversed, isOpen} = this.state
    return (
      <div>
        <Svg/>
        <MainHeader {...{
          isColorReversed,
          setIsOpen,
          isOpen
        }} />
        <MainMenu
          {...{
            isOpen,
            mainMenuData,
            mainMenuNavData
          }}
        />
        <Carousel
          {...{
            carouselData,
            setIsColorReversed
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <XuanMiao/>,
  document.getElementById('root')
);
