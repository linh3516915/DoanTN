import styles from './Footer.module.css'
import React, { useEffect, useState } from 'react';

function Footer() {
    const [dschinhanh, setDSChiNhanh] = useState([]);
    const [error, setError] = useState(null);

    const [retryCount, setRetryCount] = useState(0);
    // useEffect(() => {
    //     async function setchinhanh() {
    //         try {
    //             var response = await fetch(`http://127.0.0.1:8000/api/diachi/chinhanh-admin`);
    //             var json = await response.json();
    //             setDSChiNhanh(json.data)
    //         } catch (error) {
    //             if (error.response === 429) {
    //                 setError('chờ 1 chút. Please try again later.');
    //                 const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
    //                 setTimeout(() => {
    //                     setRetryCount(retryCount + 1);
    //                     setchinhanh();
    //                 }, delay);
    //             } else {
    //                 setError('An error occurred. Please try again later.');
    //             }
    //         }

    //     }
    //     setchinhanh();
    // }, [retryCount])

    const [dstongdai, SetDSTD] = useState([]);
    useEffect(() => {
        async function settongdai() {

            try {
                var response = await fetch(`http://127.0.0.1:8000/api/tongdai/tongdai-admin`);
                var json = await response.json();
                SetDSTD(json.data)
            } catch (error) {
                if (error.response === 429) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        settongdai();
                    }, delay);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }
        }
        settongdai();

    }, [retryCount])
    return (
        <>
            {error && <p>{error}</p>}
            <div className="footer-top-area" >
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4" >Chi Nhánh</div>
                            <ul>
                                {dschinhanh.map(chinhanh => (
                                    <li className={`${styles['chinhanh']}`} key={chinhanh.id}> <a href="#">Chi nhánh: {chinhanh.ten_chi_nhanh} - {chinhanh.dia_chi}</a>  </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4">Tổng Đài</div>
                            <ul>
                                {dstongdai.map(tongdai => (
                                    <li className={`${styles['tongdai']}`} style={{ fontSize: '20px' }} key={tongdai.id}> {tongdai.ten_so} : {tongdai.so_dien_thoai}  ({tongdai.gio_bat_dau_hoat_dong} - {tongdai.gio_ket_thuc_hoat_dong}) </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4">Mạng Xã Hội</div>
                            <ul>
                                <a href="https://www.facebook.com/profile.php?id=100080592587307" class="link-fb __web-inspector-hide-shortcut__">
                                    <i class="fa fa-facebook-official" aria-hidden="true" style={{ fontSize: '25px' }} > Facebook</i>

                                </a><br />
                                <a href="https://www.youtube.com/">
                                    <i class="fa fa-youtube-play" aria-hidden="true" style={{ fontSize: '25px' }} > Youtube</i>


                                </a><br />
                                <a href="https://www.instagram.com/">
                                    <i class="fa fa-youtube-play" aria-hidden="true" style={{ fontSize: '25px' }}> Instagram</i>

                                </a>

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