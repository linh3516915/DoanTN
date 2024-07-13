import styles from './CartPage.module.css'
import BannerOfPage from "../../../component/BannerOfPage/BannerOfPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faGift, faLongArrowAltLeft, faLongArrowAltRight, faTicketSimple, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemInCart, decrease, increase, setCart } from '../../../redux/slice/cartSlice';
import FormBuyCart from '../../../component/Form/formbuycart';
import Header from '../../../layout/Header/header';
import Footer from '../../../layout/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import OTP from '../../../component/OTP/otp';
import Address from '../../../component/Address/address';
import { match } from '../../../redux/slice/addressSlice';
import PhoneInput from 'react-phone-number-input/input';
import img from "../../../assets/ảnh/12tim.jpg";
import FormCheckout from '../../../component/Formcheckout/formcheckout';
import { Button } from 'bootstrap';
import { openpopupotp, openpopuppay, setcheckbox, setsuccess } from '../../../redux/slice/popupSlice';
import { getemail, setOTP } from '../../../redux/slice/authSlice';
import { apiUrl } from '../../../api/api';
export default function CartPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [buttonformBuycart, setButtonformBuycart] = useState(true);
    const [buttonVerifyOTP, setButtonVerifyOTP] = useState(true);
    const [formdata, setFormdata] = useState([]);
    const { ref: refPopupForm, inView: inViewPopupForm } = useInView({
        threshold: 0
    });
    const datacheckout = useSelector(state => state.popup.datacheckout);
    const items = useSelector(state => state.cart.items);
    const totalprice = useSelector(state => state.cart.totalPrice);
    const totalcoupon = useSelector(state => state.cart.totalCoupon);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const address = useSelector(state => state.address.Address);
    const auth = useSelector(state => state.auth.authentication);
    const user = useSelector(state => state.auth.user);
    const checkbox = useSelector(state => state.popup.checkbox);
    const { ref, inView } = useInView();
    const dispatch = useDispatch();
    console.log(items);
    console.log(totalprice);
    console.log(totalQuantity);
    const openFormbuycart = () => {
        if (totalprice != 0) {
            //setButtonformBuycart(false);
        }
        else { alert('phải có ít nhất 1 sản phẩm để Đặt hàng ') }
    }
    const renderItems = items.map((item) => {

        return <div key={item.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '3%' }} className={` align-items-center ${styles['item-gio']}`}>
            <div className="flex-1">
                <img className={`${styles['img-item']}`} style={{ marginBottom: '20px' }} alt={''} src={item.img} />
            </div>
            <h5 className="flex-2 text-center font-italic " style={{  marginBottom: '0px' }}>{item.product.ten}</h5>
            <span className={`flex-1 text-center mx-1 ${styles['price']} user-select-none`}>{item.product.gia.toLocaleString('en-us')}VND</span>
            <div className="d-flex flex-1 mx-1 justify-content-center">
                <button className="px-2 border-0 bg-white" type='button'
                    onClick={() => {
                        dispatch(decrease(item.product));
                    }}
                >
                    <FontAwesomeIcon icon={faCaretLeft} className={`${styles['caret-left-icon']}`} />
                </button>
                <span className={`${styles['quantity-number']} user-select-none`}>{item.quantity}</span>
                <button className="px-2 border-0 bg-white"
                    onClick={() => {
                        dispatch(increase(item.product));
                    }}
                    type='button'
                >
                    <FontAwesomeIcon icon={faCaretRight} className={`${styles['caret-right-icon']}`} />
                </button>
            </div>
            <span className={`flex-1 mx-1 text-center ${styles['total-price']} user-select-none`}> {(item.product.gia * item.quantity).toLocaleString('en-us')}VND</span>
            {/* <div style={{ color: '#e74c3c' }} className={`${styles['remove-item']} flex-1 text-center`}
                onClick={() => {
                    dispatch(deleteItemInCart(item.product));
                    dispatch(setsuccess(true));
                }}
            >

            </div> */}
            <div className={` ${styles['action']} flex-1 text-center`}
            >
                <button type='button' onClick={() => {
                    dispatch(deleteItemInCart(item.product));
                    dispatch(setsuccess(true));
                }} className='btn btn-success' style={{marginRight:'2%'}}>
                    chi tiết
                </button>
                <button type='button' onClick={() => {
                    dispatch(deleteItemInCart(item.product));
                    dispatch(setsuccess(true));
                }} className='btn btn-danger'>
                    <FontAwesomeIcon icon={faTrash} className={`${styles['trash-icon']}`} />
                </button>
            </div>
        </div>
    })
    useEffect(() => {
        if (auth === true) {
            setFormdata({
                email: user.email
            }
            );
            setEmail(user.email);
        }
    }, [auth])
    const verifyOTP = () => {
        dispatch(match());
        console.log(address);
        const getAPI = async () => {
            try {
                if (phone !== '' && name !== '' && email !== '') {


                    setButtonVerifyOTP(false);
                    setButtonformBuycart(true);

                    setFormdata(
                        {
                            name, phone, email, address
                        }
                    );
                    const response = await axios.post(`${apiUrl}/otp/sendotp`, {
                        email
                    })

                }
                else {
                    alert('something has wrong');
                }

            } catch (error) {
                alert('lỗi');
            }

        }
        getAPI();
    }
    const exitOTP = (email) => {
        setButtonformBuycart(false);
        setButtonVerifyOTP(true);
        const getAPI = async () => {
            const response = await axios.post(`${apiUrl}/otp/delotp`, {
                email
            })
        }
        getAPI();
    }
    const openotpverify = async () => {
        setButtonVerifyOTP(false);
        try {
            console.log('check email:', email);
            const response = await axios.post(`${apiUrl}/otp/sendotp`, {
                email
            })

            console.log(response.data);
        } catch (error) {
            alert('looix');
        }
    }
    console.log(formdata.email);
    console.log(user);
    return (
        <>


            <div className={`${styles['parents']}`}>
                {/* {!buttonformBuycart && ( */}


                {/* )} */}
                {/* {!buttonVerifyOTP && (
                    <div className={`${styles['chilren-model']} `}>
                        <div ref={refPopupForm} className={`${styles['formbuycart']} ${inViewPopupForm ? 'animation-from-left' : ""}`} style={{ backgroundColor: 'blanchedalmond', borderRadius: '22px' }}>
                            {!auth && (
                                <div onClick={() => {
                                    exitOTP(email);
                                }} className={`${styles['close']}`} >X</div>
                            )}
                            {auth && (
                                <div onClick={() => {
                                    setButtonVerifyOTP(true);
                                    const getAPI = async () => {
                                        const response = await axios.post('${apiUrl}/otp/delotp', {
                                            email: user.email
                                        })
                                    }
                                    getAPI();
                                }} className={`${styles['close']}`} >X</div>
                            )}

                            <div style={{ padding: '20px' }}>
                                <h1>Please,verify OTP </h1>
                                <div className={`${styles['cf']}`} style={{ backgroundColor: 'burlywood', borderRadius: '22px', padding: '22px' }}>
                                    <div className="half left cf">
                                        <OTP formdata={formdata} />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                )} */}

                <Header />
                <BannerOfPage
                    bigTitle="CART"
                    subtitle="CART"
                />
                {/* <div className="container pb-3">
                    <div className="d-flex">
                        <div className={`${styles['list-item']} me-4`}> */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (renderItems.length != 0) {
                        dispatch(getemail(datacheckout.email));
                        const getAPI = async () => {
                            // if(emailcheck !== '' && otpcheck ==null ){
                            const response = await axios.post(`${apiUrl}/otp/sendotp`, {
                                email: datacheckout.email
                            })
                            dispatch(setOTP(response.data.otptocheck));
                            // }
                        }
                        getAPI();
                        dispatch(openpopupotp(datacheckout))
                        // dispatch(openpopuppay());
                        console.log(datacheckout);
                    }
                    else {
                        alert('phải có ít nhất 1 sản phẩm trong giỏ')
                    }

                }} style={{ width: '100%', maxWidth: '100%' }}>
                    {/* <div style={{ width: '80%', margin: '0 auto' }} className={`${styles['title']} d-flex text-center text-uppercase font-italic py-2`}>
                        <span className="flex-1">image</span>
                        <span className="flex-2 mx-1"  >tên</span>
                        <span className="flex-1 mx-1" >giá</span>
                        <span className="flex-1 mx-1" >số lượng mua</span>
                        <span className="flex-1 mx-1" >thành tiền</span>
                        <span className="flex-1" >remove</span>
                    </div> */}
                    <div style={{}} className={`${styles['list-item-cart']}  flex-column row-gap-3 mb-3`}>
                        {items == [] && (
                            <>
                                <p>Chuưa có sản phẩm nào </p>
                            </>
                        )}
                        {renderItems}

                    </div>
                    <div className={`${styles['checkout-bill']}`} style={{}}>

                        <div className={`${styles['provisional-checkout']} h-fit-content`}>
                            {/* <h2>nội dung check out</h2> */}
                            <FormCheckout />
                        </div>
                        <div ref={ref} className={`${styles['provisional-bill']} h-fit-content`}>
                            <h4 className="w-100 text-uppercase  font-italic mb-4">giỏ hàng</h4>
                            <div className={`d-flex font-italic justify-content-between pb-2 `}>
                                <h6 className="text-uppercase mb-0">tổng tiền</h6>
                                <span className={`${styles['provisional-bill__sub-price']}`}>{totalprice.toLocaleString('en-us')}VNĐ</span>
                            </div>
                            <div className={`d-flex font-italic justify-content-between pb-2 ${styles['sub-total']}`}>
                                <h6 className="text-uppercase mb-0">giảm giá</h6>
                                <span className={`${styles['provisional-bill__sub-price']}`}>{(totalprice - totalcoupon).toLocaleString('en-us')}VNĐ</span>
                            </div>
                            <div className={`d-flex font-italic justify-content-between mt-2 ${styles['total']}`}>
                                <h6 className="text-uppercase mb-0" style={{ lineHeight: '31px' }}>thành tiền</h6>
                                <span className={`${styles['provisional-bill__total-price']}`}>{totalcoupon.toLocaleString('en-us')} VNĐ</span>
                            </div>
                            <div className={`${styles['coupon']} mt-3`}>
                                <input className="w-100 p-2 " placeholder="Enter your coupon" />
                                <div className="bg-dark text-light text-center py-2 " style={{ marginTop: '2%' }}>
                                    <FontAwesomeIcon icon={faGift} style={{ marginBottom: '2%' }} />
                                    nhập mã khuyến mãi
                                </div>
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <input type='checkbox' checked={checkbox} onChange={() => {
                                        // 
                                        dispatch(setcheckbox(!checkbox));
                                        // if(checkbox == true){
                                        //     dispatch(match());
                                        //     setFormdata({
                                        //         name: inputFullName,
                                        //         phone: inputPhoneNumber,
                                        //         email: inputEmail,
                                        //         address: address,
                                        //         password: inputPassword,
                                        //         btnsignup: checkbox
                                        //     });
                                        // }
                                    }} required style={{ cursor: 'pointer', width: '22px', marginTop: '0' }} /><label style={{ fontSize: '10px' }}>tôi đồng ý đến các thông tin này đều chính xác</label>
                                </div>
                                <div>
                                    {!auth && (
                                        // <button onClick={() => {
                                        //     openFormbuycart();
                                        // }} className='btn btn-secondary w-100 mt-5 h-10'>Buy</button>
                                        // <button onClick={() => {
                                        //     openFormbuycart();
                                        // }} type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary" data-mdb-modal-init data-mdb-target="#staticBackdrop2">Buy</button>
                                        <button onClick={() => { }} className='btn btn-secondary w-100 mt-5 h-10'>Buy</button>

                                    )}
                                    {auth && (
                                        <button onClick={() => { }} className='btn btn-secondary w-100 mt-5 h-10'>Buy</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '80%', margin: '0 auto', backgroundColor: 'white' }} className={`d-flex ps-3 pe-5 py-3 justify-content-between ${styles['shopping-checkout']}`}>
                        <Link to="/shop" className={`${styles['continue-shopping']} font-italic`}>
                            <FontAwesomeIcon icon={faLongArrowAltLeft} className="me-3 text-black" />
                            Tiếp tục mua hàng
                        </Link>
                    </div>
                    {/* </div>

                    </div>

                </div> */}
                    <div className={` ${!inView ? styles['order'] : ''}`}>
                        <div style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px #ccc solid' }}>
                            <div className="container ">
                                <div className="d-flex" style={{ display: 'flex' }}>
                                    {/* <div className={`${styles['list-item']} me-4`}> */}
                                    <input style={{ marginRight: '2%', width: 'max-content', marginTop: '0' }} type='text' placeholder='Nhập Khuyến mãi' />
                                    {/* </div> */}
                                    <button style={{ height: 'max-content', lineHeight: '32px' }} className='btn btn-dark'><FontAwesomeIcon icon={faTicketSimple} /> Apply coupon</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: 'white', border: '1px #ccc solid' }}>
                            <div className="container ">
                                <div className="d-flex">
                                    {/* <div className={`${styles['list-item']} me-4`}> */}
                                    <input checked={checkbox} onChange={() => {
                                        // 
                                        dispatch(setcheckbox(!checkbox));
                                        // if(checkbox == true){
                                        //     dispatch(match());
                                        //     setFormdata({
                                        //         name: inputFullName,
                                        //         phone: inputPhoneNumber,
                                        //         email: inputEmail,
                                        //         address: address,
                                        //         password: inputPassword,
                                        //         btnsignup: checkbox
                                        //     });
                                        // }
                                    }} style={{ marginRight: '1.2%', marginTop: '0', width: 'max-content' }} type='checkbox' />
                                    {/* </div> */}
                                    <div>Tôi đồng ý với Điều khoản dịch vụ, Chính sách thu thập và xử lý dữ liệu cá nhân của Shop.</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0.5rem', backgroundColor: '#f3f3f3', border: '1px #ccc solid' }}>
                            <div className="container " >
                                <div className="d-flex">
                                    <div className={`${styles['list-item']} me-4`} style={{ display: 'flex' }}>
                                        <div style={{ width: '38%', marginRight: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <p style={{ fontWeight: '400', fontSize: '1.5rem' }}>Tổng tiền</p>
                                                <p style={{ fontWeight: '400', fontSize: '1.5rem' }}>Giảm giá</p>
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: '400', fontSize: '1.5rem' }}>{totalprice.toLocaleString('en-us')} </p>
                                                <p style={{ fontWeight: '400', fontSize: '1.5rem' }}>{(totalprice - totalcoupon).toLocaleString('en-us')}</p>
                                            </div>

                                        </div>
                                        <div style={{ width: '60%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p style={{ fontWeight: '400', fontSize: '1.5rem' }}>Cần thanh toán ({totalQuantity} sản phẩm)</p>
                                                <h5 style={{ color: '#1abc9c', fontWeight: '900', fontSize: '1.5rem' }}>{totalcoupon.toLocaleString('en-us')} VNĐ </h5>
                                            </div>
                                            <button onClick={() => {
                                                dispatch(match());


                                            }} type='submit' required style={{ backgroundColor: '#1abc9c', color: 'white', width: '100%', height: '48%', borderRadius: '49px', fontSize: '1.5rem' }} className='btn '>Hoàn Tất Đơn Hàng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>


                <Footer />

            </div>
        </>
    );
}