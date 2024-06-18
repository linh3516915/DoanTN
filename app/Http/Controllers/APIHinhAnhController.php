<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HinhAnh;
use App\Models\ChiTietSanPham;
class APIHinhAnhController extends Controller
{
    //
    public function laydanhsach(Request $rq){
        $hinhanh = HinhAnh::where('chi_tiet_san_pham_id', $rq->chi_tiet_san_pham_id)->get();
        return response()->json([
            'data' => $hinhanh,
        ]);
    }
}
