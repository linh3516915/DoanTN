import styles from './CartPage.module.css'
import BannerOfPage from "../../../component/BannerOfPage/BannerOfPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faGift, faLongArrowAltLeft, faLongArrowAltRight, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    const items = useSelector(state => state.cart.items);
    const totalprice = useSelector(state => state.cart.totalPrice);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const address = useSelector(state => state.address.Address);
    const auth = useSelector(state => state.auth.authentication);
    const user = useSelector(state => state.auth.user);
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
        return <div key={item.id} className="d-flex align-items-center">
            <div className="flex-1">
                <img className="" style={{height : "100px" ,marginBottom :'20px' , width:"100px"}} alt={''} src={img} /> 
            </div>
            <h5 className="flex-2 text-center font-italic " style={{ fontSize: '1rem', marginBottom: '0px' }}>{item.product.ten}</h5>
            <span className={`flex-1 text-center mx-1 ${styles['price']} user-select-none`}>{item.product.gia}VND</span>
            <div className="d-flex flex-1 mx-1 justify-content-center">
                <button className="px-2 border-0 bg-white"
                    onClick={() => {
                        dispatch(decrease(item.product.id));
                    }}
                >
                    <FontAwesomeIcon icon={faCaretLeft} className={`${styles['caret-left-icon']}`} />
                </button>
                <span className={`${styles['quantity-number']} user-select-none`}>{item.quantity}</span>
                <button className="px-2 border-0 bg-white"
                    onClick={() => {
                        dispatch(increase(item.product.id));
                    }}
                >
                    <FontAwesomeIcon icon={faCaretRight} className={`${styles['caret-right-icon']}`} />
                </button>
            </div>
            <span className={`flex-1 mx-1 text-center ${styles['total-price']} user-select-none`}> {(item.product.gia * item.quantity)}VND</span>
            <div className={`${styles['remove-item']} flex-1 text-center`}
                onClick={() => {
                    dispatch(deleteItemInCart(item.product.id));
                    alert('thành công');
                }}
            >
                <FontAwesomeIcon icon={faTrash} className={`${styles['trash-icon']}`} />
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
                    const response = await axios.post('http://127.0.0.1:8000/api/otp/sendotp', {
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
            const response = await axios.post('http://127.0.0.1:8000/api/otp/delotp', {
                email
            })
        }
        getAPI();
    }
    const openotpverify = async () => {
        setButtonVerifyOTP(false);
        try {
            console.log('check email:', email);
            const response = await axios.post('http://127.0.0.1:8000/api/otp/sendotp', {
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
                {!buttonVerifyOTP && (
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
                                        const response = await axios.post('http://127.0.0.1:8000/api/otp/delotp', {
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

                )}

                <Header />
                <BannerOfPage
                    bigTitle="CART"
                    subtitle="CART"
                />
                <div className="container pb-3">
                    <div className="d-flex">
                        <div className={`${styles['list-item']} me-4`}>
                            <div className={`${styles['title']} d-flex text-center text-uppercase font-italic py-2`}>
                                <span className="flex-1">image</span>
                                <span className="flex-2 mx-1"  >product</span>
                                <span className="flex-1 mx-1" >price</span>
                                <span className="flex-1 mx-1" >quantity</span>
                                <span className="flex-1 mx-1" >total</span>
                                <span className="flex-1" >remove</span>
                            </div>
                            <div className="d-flex flex-column row-gap-3 mb-3">
                                {renderItems}

                            </div>
                            <div style={{display:'flex',marginBottom:'10px'}}>
                                <div className={`${styles['provisional-checkout']} h-fit-content`}>
                                    <h2>nội dung check out</h2>
                                </div>
                                <div className={`${styles['provisional-bill']} h-fit-content`}>
                                    <h4 className="w-100 text-uppercase  font-italic mb-4">cart total</h4>
                                    <div className={`d-flex font-italic justify-content-between pb-2 ${styles['sub-total']}`}>
                                        <h6 className="text-uppercase mb-0">subtotal</h6>
                                        <span className={`${styles['provisional-bill__sub-price']}`}>{totalprice} VND</span>
                                    </div>
                                    <div className={`d-flex font-italic justify-content-between mt-2 ${styles['total']}`}>
                                        <h6 className="text-uppercase mb-0">total</h6>
                                        <span className={`${styles['provisional-bill__total-price']}`}>VND</span>
                                    </div>
                                    <div className={`${styles['coupon']} mt-3`}>
                                        <input className="w-100 p-2 " placeholder="Enter your coupon" />
                                        <div className="bg-dark text-light text-center py-2 ">
                                            <FontAwesomeIcon icon={faGift} />
                                            Apply coupon
                                        </div>
                                        <div>
                                            {!auth && (
                                                // <button onClick={() => {
                                                //     openFormbuycart();
                                                // }} className='btn btn-secondary w-100 mt-5 h-10'>Buy</button>
                                                // <button onClick={() => {
                                                //     openFormbuycart();
                                                // }} type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary" data-mdb-modal-init data-mdb-target="#staticBackdrop2">Buy</button>
                                                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary" data-mdb-modal-init data-mdb-target="#staticBackdrop2">
                                                    Launch modal register form
                                                </button>
                                            )}
                                            {auth && (
                                                <button onClick={() => { openotpverify() }} className='btn btn-secondary w-100 mt-5 h-10'>Buy</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`d-flex ps-3 pe-5 py-3 justify-content-between ${styles['shopping-checkout']}`}>
                                <Link to="/shop" className={`${styles['continue-shopping']} font-italic`}>
                                    <FontAwesomeIcon icon={faLongArrowAltLeft} className="me-3 text-black" />
                                    Continue shopping
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
                <Footer />
            </div>
        </>
    );
}