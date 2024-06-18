import styles from './Footer.module.css'
function Footer() {
    return (
        <>
            <div className="footer-top-area" >
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4">Customer service</div>
                            <ul>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">help & contact us</li>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">return & refunds</li>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">online stores</li>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">term & condition</li>
                            </ul>
                        </div>
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4">company</div>
                            <ul>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">what we do</li>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">available services</li>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">latest post</li>
                                <li className="font-italic text-light font-weight-light opacity-50">FAQs</li>
                            </ul>
                        </div>
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4">social media</div>
                            <ul>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">twitter</li>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">instagram</li>
                                <li>
                                    <a href="https://www.facebook.com/profile.php?id=100080592587307" target="_blank" className="text-decoration-none text-capitalize font-italic text-light font-weight-light opacity-50" rel="noreferrer">facebook</a>
                                </li>
                                <li className="text-capitalize font-italic text-light font-weight-light opacity-50">pinterest</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="copyright">
                                <p>&copy; 2015 eElectronics. All Rights Reserved. Coded with <i className="fa fa-heart"></i> by <a href="http://wpexpand.com" target="_blank">WP Expand</a></p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="footer-card-icon">
                                <i className="fa fa-cc-discover"></i>
                                <i className="fa fa-cc-mastercard"></i>
                                <i className="fa fa-cc-paypal"></i>
                                <i className="fa fa-cc-visa"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}

        </>

    );
}

export default Footer;