import { useSelector } from "react-redux";
import LoadingSpinnerModal from "../../../component/LoadingSpinnerModal/LoadingSpinnerModal";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout, isadmin } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
export default function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isloadingmodal = useSelector(state => state.filter.loading);
  return (

    <>

      {isloadingmodal && (<LoadingSpinnerModal />)}
      <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a style={{ width:'16%'}} class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/admin">ADMIN</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
        

      </header>
    </>

  )
}