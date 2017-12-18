export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.setIsColorReversedTrue()
  }

  render() {
    return (
      <div>
        <div className="page-container page-newsletter page--toppadding" data-pm-pageid="page-newsletter">
          <div className="page-header">
            <h1 className="page-title u-font-bold anim-intro-slide">
              FOLLOW US
            </h1>
            <h2 className="page-subtitle u-font-bold anim-intro-slide">You won't be disappointed</h2>
          </div>
          <div className="anim-intro-slide">
            <div id="signup-container">
              <form id="mc-embedded-subscribe-form"
                    action="//pellmell.us2.list-manage.com/subscribe/post?u=c67851a56417e1dadede6bd23&amp;id=0691d89f83"
                    method="post" name="mc-embedded-subscribe-form" target="_blank" noValidate="">
                <div className="signup-field-container">
                  <input type="email" value="" name="EMAIL" placeholder="Sign up for our newsletter" id="mce-EMAIL"/>
                </div>
                <div className="signup-responses-container">
                  <div className="signup-response signup-response--error" id="signup-error-response"></div>
                  <div className="signup-response signup-response--success" id="signup-success-response"></div>
                </div>
                <div style={{position: 'absolute', left: -5000, ariaHidden: "true"}}>
                  <input type="text" name="b_4ec33cfd59808d21a95d028b9_5b87942490" tabIndex="-1" value=""/>
                </div>
                <div className="signup-submit-container">
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"/>
                </div>
              </form>
            </div>
          </div>
          <div className="socialnetworks anim-intro-slide">
            <div className="socialnetwork">
              <a className="u-font-semibold u-link-underline" href="javascript:" target="_blank" title="Follow us on INSTAGRAM">INSTAGRAM</a>
            </div>

            <div className="socialnetwork">
              <a className="u-font-semibold u-link-underline" href="javascript:" target="_blank" title="Follow us on PINTEREST">PINTEREST</a>
            </div>

            <div className="socialnetwork">
              <a className="u-font-semibold u-link-underline" href="javascript:" target="_blank" title="Follow us on FACEBOOK">FACEBOOK</a>
            </div>

            <div className="socialnetwork">
              <a className="u-font-semibold u-link-underline" href="javascript:" target="_blank" title="Follow us on TWITTER">TWITTER</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}