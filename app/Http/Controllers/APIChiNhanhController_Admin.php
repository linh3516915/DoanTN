<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChiNhanh_Admin;
class APIChiNhanhController_Admin extends Controller
{
    //
    public function danhSach(){
        $chinhanh = ChiNhanh_Admin::all();
        return response()->json([
            'data' => $chinhanh,
        ]);
    }

}
