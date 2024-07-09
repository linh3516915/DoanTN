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
        $hinhanh = HinhAnh::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)->first();
        if(!empty($hinhanh)){
            return response()->json([
                'data' => $hinhanh,
                'ten' => $hinhanh->ten_hinh_anh
            ]);
        }
       
    }
}
