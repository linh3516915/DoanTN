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
import { useState } from 'react';
import axios from 'axios';
export default function CartPage() {
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [date,setDate] = useState('');
    const [address,setAdress] = useState('');
    const items = useSelector(state => state.cart.items);
    const totalprice = useSelector(state => state.cart.totalPrice);
    
    const [buttonformBuycart, setButtonformBuycart] = useState(true);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const dispatch = useDispatch();
    
    console.log(items);
    console.log(totalprice);
    console.log(totalQuantity);
    const openFormbuycart = () =>{
        if(totalprice != 0)
            {
                setButtonformBuycart(false);
            }
        else{alert('phải có ít nhất 1 sản phẩm để Đặt hàng ')}
    }
    const renderItems = items.map((item) => {
        return <div key={item.id} className="d-flex align-items-center">
            <div className="flex-1">
                <img className="w-100" alt={''} src={``} />
            </div>
            <h5 className="flex-2 text-center font-italic " style={{ fontSize: '13px', marginBottom: '0px' }}>{item.product.ten}</h5>
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
    const dathang = () =>{
        const getAPI = async ()=>{
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/donhang/addnew',{
                    sdt : phone ,
                    ho_ten : name,
                    ngay_sinh : date,
                    dia_chi : address,
                    tong_tien : totalprice
                })
                alert('dat hang thanh cong');
                dispatch(setCart());
                window.location.reload();
            } catch (error) {
                alert('lỗi');
            }
           
        }
        getAPI();
    }
    return (
        <>
            <div className={`${styles['parents']}`}>
                {!buttonformBuycart && (
                    <div className={`${styles['chilren-model']}`}>
                        <div onClick={() => {
                            setButtonformBuycart(true);
                        }} style={{ width: '40px', textAlign: 'center', cursor: 'pointer', backgroundColor: 'white', color: 'black', fontSize: '20px' }}>X</div>
                        <div className={`${styles['formbuycart']}`}>
                            <h1>Please,Add Your Infomation </h1>
                            <div className={`${styles['cf']}`} >
                                <div className="half left cf">
                                    <div className='' style={{ display: 'flex' }}>
                                        <div style={{ fontSize: '20px', marginRight: '20px' }}><label style={{ color: 'white' }}>Nam</label>
                                            <input type="radio" className={`${styles['input-name']}`} placeholder="Name" /></div>
                                        <div style={{ fontSize: '20px' }}><label style={{ color: 'white' }}>Nữ</label>
                                            <input type="radio" className={`${styles['input-name']}`} placeholder="Name" /></div>

                                    </div>
                                    <input type="email"value={name} onChange={(e)=>{setName(e.target.value)}} className={`${styles['input-name']}`} placeholder="Name"  required/>



                                    <input type="text" value={date} onChange={(e)=>{setDate(e.target.value)}} className={`${styles['input-email']}`} placeholder="Date" required/>
                                    <input type="text" onChange={(e)=>{setPhone(e.target.value)}} className={`${styles['input-subject']}`} placeholder="Phone"  required/>
                                </div>
                                <div className={`${styles['half right cf']}`}>
                                    <textarea  onChange={(e)=>{setAdress(e.target.value)}} type="text" className={`${styles['input-message']}`} placeholder="Address" required></textarea>
                                </div>
                                <button onClick={()=>{dathang()}} value="Submit" className={`${styles['input-submit']}`} >buy</button>
                            </div>
                        </div>
                    </div>

                )}


                <Header />
                <div className="container pb-3">
                    <BannerOfPage
                        bigTitle="CART"
                        subtitle="CART"
                    />
                    <h3 className="text-uppercase font-italic mb-4">shopping cart</h3>
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
                            <div className={`d-flex ps-3 pe-5 py-3 justify-content-between ${styles['shopping-checkout']}`}>
                                <Link to="/shop" className={`${styles['continue-shopping']} font-italic`}>
                                    <FontAwesomeIcon icon={faLongArrowAltLeft} className="me-3 text-black" />
                                    Continue shopping
                                </Link>
                                {/* {
                                cart.items.length !== 0 ? <Link to="/checkout" className={`${styles['proceed-checkout']} font-italic`}>
                                    Proceed to checkout
                                    <FontAwesomeIcon icon={faLongArrowAltRight} className="ms-3 text-black" />
                                </Link> : <></>
                            } */}
                            </div>
                        </div>
                        <div className={`${styles['provisional-bill']} h-fit-content`}>
                            <h4 className="w-100 text-uppercase  font-italic opacity-75 mb-4">cart total</h4>
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
                                    <button onClick={()=>{
                                        openFormbuycart();
                                    }} className='btn btn-secondary w-100 mt-5 h-10'>Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}