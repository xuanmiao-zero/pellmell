import SwiperWrapper from "./SwiperWrapper";
import SwiperProgressBars from "./SwiperProgressBars";
import SwiperPagination from "./SwiperPagination";

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body" id="main-content">
                <div id="page-transitioner">
                    <div className="page-transitioner-layer"></div>
                    <div className="page-transitioner-layer"></div>
                    <div className="page-transitioner-layer"></div>
                </div>
                <div className="page-container page-home page--fullscreen" data-pm-pageid="page-home"
                     data-pm-pagetransitioncolor="#ccb66e">
                    <div className="swiper-container swiper-container-horizontal">
                        <SwiperWrapper></SwiperWrapper>
                        <SwiperProgressBars></SwiperProgressBars>
                        <SwiperPagination></SwiperPagination>
                    </div>
                </div>
            </div>
        );
    }
}