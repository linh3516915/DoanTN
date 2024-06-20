import { NavLink } from "react-router-dom";
export default function TaskbarAdmin(){
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <ul className="nav flex-column">
                                <li>  <NavLink to="/chinhanh-admin" className="nav-link  text-secondary" >Chi Nhánh</NavLink></li>
                                <li>  <NavLink to="/tongdai-admin" className="nav-link  text-secondary" >Tổng Đài</NavLink></li>
                                <li>  <NavLink to="/" className="nav-link  text-secondary" >Suppliers Manager</NavLink></li>
                                <li>  <NavLink to="/" className="nav-link  text-secondary" >Comment Manager</NavLink></li>
                                <li>  <NavLink to="/" className="nav-link  text-secondary" >Order Manager</NavLink></li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2"></h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                            </div>
                        </div>

                    </main>
                </div>
            </div>


        </>
    );
}