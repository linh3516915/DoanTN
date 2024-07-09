<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAdmin;

class APIUserAdminController_Admin extends Controller
{
    //
    public function SoLuongKH(){
        try {
            // Đếm số lượng người dùng không phải là admin (isAdmin = 0)
            $khachhang = UserAdmin::where('isAdmin', 0)->count();
            return response()->json(['count' => $khachhang], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
