export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
                <a href="http://www.xuanmiao.wang/#0" className="swiper-pagination-bullet">
                    <span className="swiper-pagination-bullet-progress"></span>
                    <span className="swiper-pagination-bullet-dot"></span>
                </a>
            </div>
        );
    }
}