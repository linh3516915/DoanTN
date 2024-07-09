import imgsale from "../../assets/ảnh/tải xuống (2).jpg";

export default function Sidebar() {
    return (
        <>
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '100%' }}>
                <div style={{width:'max-content' , margin : '0 auto' ,marginBottom: '4rem'}}>
                    <div>
                        <img style={{ width: '200px ', height: '200px',borderRadius:'8rem',marginTop: '1rem' }} src={imgsale} />
                    </div>
                </div>
                {/* a<hr> */}
                <ul class="nav nav-pills flex-column" style={{marginBottom: '11.5rem'}}>
                    <li class="nav-item">
                        <a href="/profile" class="nav-link text-white" aria-current="page">
                            <svg class="bi me-2" width="16" height="16"></svg>
                            Cập nhật thông tin 
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"></svg>
                            Quản lý ưu thích
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"></svg>
                           quản lý khuyến mãi 
                        </a>
                    </li>
                    <li>
                        <a href="/order-management" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"></svg>
                            Quản lý đơn hàng
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"></svg>
                            Lịch sử Đơn hàng 
                        </a>
                    </li>
                </ul>
                {/* <hr> */}
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                        <strong>mdo</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="/">Back to home</a></li>
                        {/* <li><hr class="dropdown-divider"></li> */}
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}