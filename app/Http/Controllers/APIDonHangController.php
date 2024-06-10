<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DonHang;
use Carbon\Carbon;
class APIDonHangController extends Controller
{
    public function DatHang(Request $rq){
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
        $donhang = new DonHang();
        if($rq->khach_hang_id != 0){
            $donhang->khach_hang_id = $rq->khach_hang_id;
            $donhang->ngay_dat= $dt->toDateTimeString();
            $donhang->tong_tien = $rq->tong_tien ; 
            $donhang->trang_thai= 1;
            $donhang->save();
        }
        else {
            $donhang->so_dien_thoai = $rq -> sdt;
            $donhang->ho_ten = $rq ->ho_ten;
            $donhang->ngay_sinh = $rq->ngay_sinh;
            $donhang->dia_chi = $rq->dia_chi;
            $donhang->ngay_dat= $dt->toDateTimeString();
            $donhang->tong_tien = $rq->tong_tien ; 
            $donhang->trang_thai= 1;
            $donhang->save();
        }
        return response()->json([
            'data' => $donhang,
        ]);
    }
}
