import { useDispatch, useSelector } from "react-redux";
import FormComment from "../formcomment/formcomment";
import styles from './popupcomment.module.css'
export default function PopupComment(props) {

    const PopupCommnent = useSelector(state => state.popup.btnPopupCommnent);
    const dispatch = useDispatch();
    return (
        <>
            {PopupCommnent && (
                <div className={`${styles['popup-parents']}`}>
                    <div className={`${styles['popup-chilren']}`}>
                        <FormComment chi_tiet_san_pham_id = {props.chi_tiet_san_pham_id}/>
                    </div>

                </div>
            )}
        </>
    );
}