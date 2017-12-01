import classNames from 'classnames' //有没有自带的？

export default class extends Component {
  constructor(props) {
    super(props);
  }

  switchToCurrentPic = (index) => {
    let {
      modifyCarouselIndex,
      carouselStart,
      carouselEnd
    } = this.props
    modifyCarouselIndex(index);
    carouselEnd()
    carouselStart()
  }

  render() {
    let {
      count,
      index,
    } = this.props
    let {
      switchToCurrentPic
    } = this
    let SwiperPaginationItemArray = [];
    for (let i = 0; i < count; i++) {
      SwiperPaginationItemArray[i] = (
        <a key={i} href={`#${i}`}
           className={
             classNames({
               'swiper-pagination-bullet': true,
               'swiper-pagination-bullet-active': index === i
             })
           }
           onClick={switchToCurrentPic.bind(this, i)}
        >
          <span className="swiper-pagination-bullet-progress"></span>
          <span className="swiper-pagination-bullet-dot"></span>
        </a>
      )
    }
    return (
      <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
        {
          SwiperPaginationItemArray
        }
      </div>
    );
  }
}