
import styles from "./popupotp.module.css"
import { useDispatch, useSelector } from "react-redux";
import OTP from "../../component/OTP/otp";
export default function PopupOTP() {
    const popupsignup = useSelector(state=>state.popup.btnPopupOTP);
    const dispatch = useDispatch();
    return (
        <>
            {popupsignup && (
                <div className={`${styles['popup-parents']}`}>
                    <div className={`${styles['popup-chilren']}`}>
                        <OTP />
                    </div>

                </div>
            )}


            {/* <div className="container d-flex flex-column gap-5">
                
            </div> */}
        </>
    );
}