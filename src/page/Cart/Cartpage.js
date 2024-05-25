import styles from './CartPage.module.css'
import BannerOfPage from "../../component/BannerOfPage/BannerOfPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faGift, faLongArrowAltLeft, faLongArrowAltRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
export default function CartPage() {
    return (
        <>
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
                                <h3>here's items cart</h3>
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
                            <span className={`${styles['provisional-bill__sub-price']}`}> VND</span>
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
                                <button className='btn btn-secondary w-100 mt-5 h-10'>Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}