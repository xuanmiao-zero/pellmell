export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-container page-contact page--toppadding" data-pm-pageid="page-contact" >

        <div className="page-header">
          <h1 className="page-title u-font-bold anim-intro-slide">
            Contact Us
          </h1>

          <h2 className="page-subtitle u-font-bold anim-intro-slide">Careful we could stay hours on the phone (true
            story)</h2>
        </div>

        <div className="anim-intro-slide" >
          <div className="page-content u-font-extralight"><p>We are a management agency founded in 2010</p>
            <p>and are proud to represent the world's foremost creative artists
              in both France and England.</p></div>
        </div>

        <div className="offices anim-intro-slide" >
          <article className="office">
            <div className="office-icon">
              <svg className="svg-icon svg-eiffeltower-dims">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#eiffeltower"></use>
              </svg>
            </div>
            <h3 className="office-title u-font-bold">Paris Office</h3>
            <div className="office-info u-font-semibold">
              <a className="office-address"
                 href="http://maps.google.com/?q=14%2C%20rue%20Yvonne%20le%20Tac%2C%2075018%2C%20Paris"
                 title="Find us on Google Maps" target="_blank">
                <span className="office-street">14, rue Yvonne le Tac</span> -
                <span className="office-zipcode">75018</span>
                <span className="office-city">Paris</span>
              </a>
              <div>
                <a className="office-phone" href="tel:+33624797820" title="Call us">+33 (0)6 24 79 78 20</a>
              </div>
              <div>
                <a className="office-mobile" href="tel:ThibaultMarque" title="Call us">Thibault Marque</a>
              </div>
              <div>
                <a className="office-email u-link-underline" href="mailto:thibault@pellmell.fr" title="Email us">thibault@pellmell.fr</a>
              </div>
            </div>
            <div className="office-btns">
              <a className="office-btn" href="tel:+33624797820" title="Call us">
                <svg className="svg-icon svg-office-btn-phone-dims">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#office-btn-phone"></use>
                </svg>
              </a>
              <a className="office-btn"
                 href="http://maps.google.com/?q=14%2C%20rue%20Yvonne%20le%20Tac%2C%2075018%2C%20Paris"
                 title="Find us on Google Maps" target="_blank">
                <svg className="svg-icon svg-office-btn-map-dims">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#office-btn-map"></use>
                </svg>
              </a>
              <a className="office-btn" href="mailto:thibault@pellmell.fr" title="Email us">
                <svg className="svg-icon svg-office-btn-email-dims">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#office-btn-email"></use>
                </svg>
              </a>
            </div>
          </article>

          <article className="office">
            <div className="office-icon">
              <svg className="svg-icon svg-bigben-dims">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#bigben"></use>
              </svg>
            </div>
            <h3 className="office-title u-font-bold">London Office</h3>
            <div className="office-info u-font-semibold">
              <a className="office-address"
                 href="http://maps.google.com/?q=50%2C%20Tavistock%20road%2C%20W11%201AW%2C%20London"
                 title="Find us on Google Maps" target="_blank">
                <span className="office-street">50, Tavistock road</span> -
                <span className="office-zipcode">W11 1AW</span>
                <span className="office-city">London</span>
              </a>
              <div>
                <a className="office-phone" href="tel:+447447300047" title="Call us">+44 (0) 7447 300047</a>
              </div>
              <div>
                <a className="office-mobile" href="tel:ThibaultMarque" title="Call us">Thibault Marque</a>
              </div>
              <div>
                <a className="office-email u-link-underline" href="mailto:thibault@pellmell.fr" title="Email us">thibault@pellmell.fr</a>
              </div>
            </div>
            <div className="office-btns">
              <a className="office-btn" href="tel:+447447300047" title="Call us">
                <svg className="svg-icon svg-office-btn-phone-dims">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#office-btn-phone"></use>
                </svg>
              </a>
              <a className="office-btn" href="http://maps.google.com/?q=50%2C%20Tavistock%20road%2C%20W11%201AW%2C%20London"
                 title="Find us on Google Maps" target="_blank">
                <svg className="svg-icon svg-office-btn-map-dims">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#office-btn-map"></use>
                </svg>
              </a>
              <a className="office-btn" href="mailto:thibault@pellmell.fr" title="Email us">
                <svg className="svg-icon svg-office-btn-email-dims">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#office-btn-email"></use>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    );
  }
}