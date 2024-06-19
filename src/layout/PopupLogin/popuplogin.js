import { useState } from "react";
import FormLogin from "../../component/Formlogin/Formlogin";
import styles from "./popuplogin.module.css"
import { useDispatch, useSelector } from "react-redux";
import {  closepopuplogin } from "../../redux/slice/popupSlice";




export default function PopupLogin() {
    const popuplogin = useSelector(state=>state.popup.btnPopupLogin);
    const dispatch = useDispatch();
    return (
        <>
            {popuplogin && (
                <div className={`${styles['popup-parents']}`}>
                    <div className={`${styles['popup-chilren']}`}>
                        <button onClick={()=>{dispatch(closepopuplogin())}}>x</button>
                        <FormLogin />
                    </div>

                </div>
            )}


            {/* <div className="container d-flex flex-column gap-5">
                
            </div> */}
        </>
    );
}