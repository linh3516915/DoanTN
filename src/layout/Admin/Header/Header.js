import { useSelector } from "react-redux";
import LoadingSpinnerModal from "../../../component/LoadingSpinnerModal/LoadingSpinnerModal";
import { faCheck, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupEditproductdetail from "../../Popupeditproductdetail/popupeditproductdetail";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout, isadmin } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { seterror, setsuccess, setwarn } from "../../../redux/slice/popupSlice";
export default function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector(state => state.popup.success);
  const error = useSelector(state => state.popup.error);
  const warn = useSelector(state => state.popup.warn);
  const isloadingmodal = useSelector(state => state.filter.loading);
  useEffect(() => {
    if (success == true) {
      setTimeout(() => {
        dispatch(setsuccess(false));
      }, 5000);
    }
    if (error == true) {
      setTimeout(() => {
        dispatch(seterror(false));
      }, 5000);
    }
    if (warn == true) {
      setTimeout(() => {
        dispatch(setwarn(false));
      }, 5000);
    }
  }, [success,error,warn])
  return (

    <>

      {isloadingmodal && (<LoadingSpinnerModal />)}
      <PopupEditproductdetail />
      <header style={{ background: 'none repeat scroll 0 0 #1abc9c' }} className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/admin">ADMIN</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          {/* =======
      <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a style={{ width:'16%'}} class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/admin">ADMIN</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
>>>>>>> 1e59523a5a8973ed7b0b7994e81957a28188772c */}
        </button>
        {/* <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" /> */}


      </header>
      {success && (
        <div className={`alert alert-success ${success ? 'animation-from-right' : ''}`}style={{zIndex:'1', position: 'fixed',display:'flex',justifyContent:'space-between',alignContent:'center', right: '0', width: '34%' }} role="alert">
          <div style={{width:'50%',lineHeight:'38px'}}><FontAwesomeIcon icon={faCheck} style={{ marginRight: '3%' }} />Successfully</div>
          <button onClick={()=>{dispatch(setsuccess(false))}} className="btn ">x</button>
        </div>


      )}
      {error && (
        <div className={`alert alert-danger ${error ? 'animation-from-right' : ''}`} style={{zIndex:'1', position: 'fixed',display:'flex',justifyContent:'space-between',alignContent:'center', right: '0', width: '34%' }} role="alert">
         <div  style={{width:'50%',lineHeight:'38px'}}> <FontAwesomeIcon icon={faXmark} style={{ marginRight: '3%' }} /> Error</div>
         <button onClick={()=>{dispatch(seterror(false))}} className="btn btn-danger">x</button>
        </div>
      )}
      {warn && (
        <div className={`alert alert-warning${warn ? 'animation-from-right' : ''}`} style={{zIndex:'1', position: 'fixed',display:'flex',justifyContent:'space-between',alignContent:'center', right: '0', width: '34%' }} role="alert">
          <div  style={{width:'50%',lineHeight:'38px'}}><FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: '3%' }} />something went wrong</div>
          <button onClick={()=>{dispatch(setwarn(false))}} className="btn btn-danger">x</button>
        </div>
      )}


      {/* <div className="alert alert-danger" style={{ position: 'fixed', right: '0', width: '34%' }} role="alert">
        <FontAwesomeIcon icon={ faXmark} style={{ marginRight: '3%' }} /> Error
      </div>
      <div className="alert alert-warning" style={{ position: 'fixed', right: '0', width: '34%' }} role="alert">
        <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: '3%' }} />Missing something checkout
      </div> */}
    </>

  )
}