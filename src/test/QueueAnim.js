import QueueAnim from 'rc-queue-anim';

export default class  extends Component {
  state = {
    show: true
  };
  onClick = () => {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div className="queue-demo">
        <p className="buttons" style={{marginBottom: 20}}>
          <button type="primary" onClick={this.onClick}>切换</button>
        </p>
        <QueueAnim
          animConfig={[
            {opacity: [1, 0], translateY: [0, 100]}
          ]}
          ease={['easeOutQuart', 'easeInOutQuart']}
          duration={[500, 500]}
          interval={[50, 0]}
          delay={[500, 0]}
          className="demo-content"
          component="ul"
        >
          {this.state.show ? [
              <li key="0">1
                <QueueAnim
                  component="ul"
                  animConfig={[
                    {opacity: [1, 0], translateX: [0, 100]}
                  ]}
                  ease={['easeOutQuart', 'easeInOutQuart']}
                  duration={[1000, 0]}
                  interval={[50, 0]}
                  delay={[500, 0]}
                  key="page"
                >
                  <li key="0">1</li>
                  <li key="1">2</li>
                  <li key="2">3</li>
                </QueueAnim>
              </li>,
              <li key="1">2</li>,
              <li key="2">3</li>,

          ] : null}
        </QueueAnim>
      </div>
    );
  }
};
