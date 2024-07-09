import { useState } from "react";
import FormLogin from "../../component/Formlogin/Formlogin";
import styles from "./popupeditproductdetail.module.css"
import { useDispatch, useSelector } from "react-redux";
import {  closepopuplogin } from "../../redux/slice/popupSlice";
import FormEditproductdetail from "../../component/Formeditproductdetail/formeditproductdetail";




export default function PopupEditproductdetail() {
    const popuplogin = useSelector(state=>state.popup.btnPopupEditproductdetail);
    const dispatch = useDispatch();
    return (
        <>
            {popuplogin && (
                <div className={`${styles['popup-parents']}`}>
                    <div className={`${styles['popup-chilren']}`}>
                        <FormEditproductdetail />
                    </div>

                </div>
            )}


            {/* <div className="container d-flex flex-column gap-5">
                
            </div> */}
        </>
    );
}