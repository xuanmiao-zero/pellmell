import FeedItem from './FeedItem'
import Masonry from 'react-masonry-component';
import QueueAnim from 'rc-queue-anim'

const OnImagesLoaded = require('react-on-images-loaded');

export default class WaterfallFlow extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  //获取延迟时间
  getDelay = (e) => {
    const i = e.index + dataArray.length % 4;
    return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
  };

  runAfterImagesLoaded = () => {
    // console.log('图片全部加载完成')
  }
  runTimeoutFunction = () => {
    // console.log('您的网络较慢，建议检查网络')
  }

  render() {
    let {
      WaterfallFlowState,
      removeImageById
    } = this.props
    let {isFetching, data} = WaterfallFlowState
    let {end, images} = data
    // console.log(WaterfallFlowState)
    // console.log(isFetching)
    // console.log(images)
    // if(isFetching){
    //   console.log('加载动画结束')
    // }else{
    //   console.log('加载动画开始')
    // }

    return (
      <div className="anim-intro-slide">
        <ul className="feed" style={{overflow:'hidden'}}>
          <OnImagesLoaded
            onLoaded={this.runAfterImagesLoaded.bind(this)}
            onTimeout={this.runTimeoutFunction.bind(this)}
            timeout={7000}
          >
            <QueueAnim type="bottom" duration={[800, 0]}>
            {
              (images || []).map(e => {
                return <FeedItem
                  {
                    ...{
                      removeImageById
                    }
                  }
                  key={e.id}
                  {
                    ...e
                  }
                />
              })
            }
            </QueueAnim>
          </OnImagesLoaded>
        </ul>
      </div>
    );
  }
}


//瀑布流组件
// <Masonry
//   className={'my-gallery-class'} // default ''
//   elementType={'div'} // default 'div'
//   options={{transitionDuration: 5, transitionProperty: 'width', fitWidth: true}} // default {}
//   disableImagesLoaded={false} // default false
//   updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
//   style={{margin: '0 auto'}}
// >
// </Masonry>
