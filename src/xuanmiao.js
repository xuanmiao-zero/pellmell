import './common/style/index.css';

import Svg from './components/svg/svg';
import Carousel from './components/carousel/carousel';

class XuanMiao extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <div>
                {/* <Svg />*/}
                <Carousel />
            </div>
        );
    }
}

ReactDOM.render(
    <XuanMiao/>,
    document.getElementById('root')
);