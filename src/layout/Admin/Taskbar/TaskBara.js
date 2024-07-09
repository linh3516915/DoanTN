

export default function Taskbara() {

    
    return (
        <>
            <nav style={{position: 'static', paddingLeft:'0rem'}} id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div style={{ backgroundColor:'#343a40', height:'100vh', width:'104%', height:'99%'}} className="position-sticky pt-3 sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a style={{ color:'white', fontSize:'20px'}} className="nav-link active" aria-current="page" href="/admin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home align-text-bottom" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                Trang Chủ
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color:'white', fontSize:'20px'}} className="nav-link" href="/sanpham-admin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file align-text-bottom" aria-hidden="true"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                Sản Phẩm
                            </a>
                        </li>
                        <li className="nav-item">
                            <a  style={{ color:'white', fontSize:'20px'}} className="nav-link" href="/nhacungcap-admin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-cart align-text-bottom" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                               Nhà Cung Cấp
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color:'white', fontSize:'20px'}} className="nav-link" href="/loaisanpham-admin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users align-text-bottom" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                Loại Sản Phẩm
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color:'white', fontSize:'20px'}} className="nav-link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bar-chart-2 align-text-bottom" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                Reports
                            </a>
                        </li>
                        <li className="nav-item">
                            <a style={{ color:'white', fontSize:'20px'}} className="nav-link" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-layers align-text-bottom" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                Integrations
                            </a>
                        </li>
                    </ul>
                </div>
               
            </nav>
        </>
    )
}