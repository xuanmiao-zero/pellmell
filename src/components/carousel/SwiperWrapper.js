import  SwiperPaginationItem from "./SwiperPaginationItem";
import  "../../common/data/carouselData";


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData: this.carouselData,
        }
        console.log(this.carouselData);
    }

    render() {
        return (
            <ul className="swiper-wrapper" style={{transform: [{translate3d: [-8196, 0, 0]}, {transitionDuration: 0}]}}>

            </ul>
        );
    }
}