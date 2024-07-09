import { useSelector } from "react-redux";
import LoadingSpinnerModal from "../../../component/LoadingSpinnerModal/LoadingSpinnerModal";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout, isadmin } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
export default function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(Logout());
    dispatch(isadmin(false));
    alert('hahah');
    navigate('/');
  }
  const isloadingmodal = useSelector(state => state.filter.loading);
  return (

    <>

      {isloadingmodal && (<LoadingSpinnerModal />)}
      <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">ADMIN</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
        <div class="dropdown">
          <a style ={{ paddingLeft:'30px', paddingRight:'60px'}} href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
            <strong>mdo</strong>
          </a>
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item" href="/">Back to home</a></li>
            {/* <li><hr class="dropdown-divider"></li> */}
            <li className="dropdown-item"><button className="nav-link link-white px-2" onClick={() => { logout() }}>logout</button></li>
          </ul>
        </div>

      </header>
    </>

  )
}