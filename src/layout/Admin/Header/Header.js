import { useSelector } from "react-redux";
import LoadingSpinnerModal from "../../../component/LoadingSpinnerModal/LoadingSpinnerModal";

export default function HeaderAdmin() {

  const isloadingmodal = useSelector(state => state.filter.loading);
  return (

    <>

      {isloadingmodal && (<LoadingSpinnerModal />)}
      <header style={{background :'none repeat scroll 0 0 #1abc9c'}} className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/admin">PHONE</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="">Sign in</a>
          </div>
        </div>
      </header>
    </>

  )
}