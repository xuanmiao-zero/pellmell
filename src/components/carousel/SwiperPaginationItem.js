export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li className="swiper-slide swiper-slide-duplicate"
                style={{backgroundColor: "rgb(134, 177, 199)", width: 1366}}
                data-pm-headerreversecolor="false"
                data-swiper-slide-index="11">
                <div className="swiper-projectItemVisual">
                    <img alt="emmanuelle_julien_airkraft7.jpg"
                         src={require("../../common/img/andre_beato_yes.jpg")}
                         width="1024" className="resize-cover"
                         style={{
                             position: "absolute",
                             width: 1366,
                             height: 768,
                             top: -60.5,
                             left: 0,
                             opacity: 1,
                         }}/>
                </div>
                <a className="swiper-artistName u-font-montserrat u-link-underlinereverse"
                   href="http://www.xuanmiao.wang/artist/emmanuelle-et-julien" data-pm-nodetype="artist"
                   data-pm-nodename="emmanuelle-et-julien">
                    EMMANUELLE ET JULIEN
                </a>
            </li>
        );
    }
}