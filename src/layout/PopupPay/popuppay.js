
import styles from "./popuppay.module.css"
import { useDispatch, useSelector } from "react-redux";
import OTP from "../../component/OTP/otp";
import FormPay from "../../component/FormPay/formpay";
export default function PopupPay() {
    const popuppay = useSelector(state=>state.popup.btnPopupPay);
    const dispatch = useDispatch();
    return (
        <>
            {popuppay && (
                <div className={`${styles['popup-parents']}`}>
                    <div className={`${styles['popup-chilren']}`}>
                        <FormPay />
                    </div>

                </div>
            )}


            {/* <div className="container d-flex flex-column gap-5">
                
            </div> */}
        </>
    );
}