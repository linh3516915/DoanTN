import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiUrl } from '../../api/api';
import styles from './Footer.module.css'
import React, { useEffect, useState } from 'react';
import { faLocationDot,faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const [dschinhanh, setDSChiNhanh] = useState([]);
    const [error, setError] = useState(null);

    const [retryCount, setRetryCount] = useState(0);
    // useEffect(() => {
    //     async function setchinhanh() {
    //         try {
    //             var response = await fetch(`${apiUrl}/diachi/chinhanh-admin`);
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
                var response = await fetch(`${apiUrl}/tongdai/tongdai-admin`);
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
            <div class="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4" >Chi Nhánh</div>
                            <ul style={{padding:'0'}}>
                                {dschinhanh.map(chinhanh => (
                                    <li className={`${styles['chinhanh']}`} key={chinhanh.id}> <a href="#">Chi nhánh: {chinhanh.ten_chi_nhanh} - {chinhanh.dia_chi}</a>  </li>
                                    
                                ))}
                                 <li className={`${styles['chinhanh']}`} ><FontAwesomeIcon icon={faLocationDot}/> <a target="_blank" href="https://www.google.com/maps/place/159+%C4%90.+H%C6%B0ng+Ph%C3%BA,+Ph%C6%B0%E1%BB%9Dng+8,+Qu%E1%BA%ADn+8,+H%E1%BB%93+Ch%C3%AD+Minh/data=!4m2!3m1!1s0x31752f0039b0ed0f:0xf4c4b4423107c740?sa=X&ved=1t:242&ictx=111">159 Hưng Phú, Phường 8, Quận 8, Thành Phố Hồ Chí Minh</a>  </li>
                            </ul>
                        </div>
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4">Tổng Đài</div>
                            <ul  style={{padding:'0'}}>
                                {dstongdai.map(tongdai => (
                                    <li className={`${styles['tongdai']}`} style={{ fontSize: '20px' }} key={tongdai.id}> {tongdai.ten_so} : {tongdai.so_dien_thoai}  ({tongdai.gio_bat_dau_hoat_dong} - {tongdai.gio_ket_thuc_hoat_dong}) </li>
                                ))}
                                <li className={`${styles['tongdai']}`} style={{ fontSize: '20px' }} ><FontAwesomeIcon icon={faPhone}/> CSKH : 0335405877  (9:00 - 17:00) </li>
                            </ul>
                        </div>
                        <div className="col-sm py-5">
                            <div className="text-uppercase h5 font-italic text-white font-weight-light pb-4">Mạng Xã Hội</div>
                            <ul  style={{padding:'0'}}>
                                <a style={{ fontSize: '25px' }} href="https://www.facebook.com/profile.php?id=100080592587307" class="link-fb __web-inspector-hide-shortcut__">
                                    <FontAwesomeIcon  icon={faFacebook}/> Facebook

                                </a><br />
                                <a style={{ fontSize: '25px' }} href="https://www.youtube.com/">
                                     <FontAwesomeIcon icon={faYoutube}/> Youtube


                                </a><br />
                                <a style={{ fontSize: '25px' }} href="https://www.instagram.com/">
                                    <FontAwesomeIcon icon={faInstagram}/> Instagram

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