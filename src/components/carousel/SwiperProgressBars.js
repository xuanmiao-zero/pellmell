export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="swiper-progressbars">
                <li className="swiper-progressbars-circle">
                    <svg viewBox="0 0 100 100" style={{display: 'block'}}>
                        <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
                              stroke="currentColor" strokeWidth="6" fillOpacity="0" style={{
                            strokeDasharray: [295.416, 295.416],
                            strokeDashoffset: 295.416
                        }}></path>
                    </svg>
                </li>
            </ul>
        );
    }
}