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
    public function themMoi(){
        if(empty($request->ten_chi_nhanh))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        $chinhanh= ChiNhanh_Admin::where('ten_chi_nhanh',$request->tenchinhanh)->first();
        if(!empty($chinhanh->ten_chi_nhanh)){
            return response()->json([
                'success'=> 0,
                'message'=> "Màu Sắc: ($request->tenchinhanh) đã tồn tại!!"        
            ]);
        }
        #tao moi
        $chinhanh = new ChiNhanh_Admin();
        $chinhanh->ten_chi_nhanh      = $request->tenchinhanh;
        $chinhanh->dia_chi      = $request->address;
        $chinhanh->sdt_tong_dai     = $request->sdttongdai;
        $chinhanh->gio_mo_cua      = $request->giomocua;
        $chinhanh->ngay_khai_truong      = $request->ngaykhaitruong;
        $chinhanh    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm Chi Nhanh thành công!! ",
            'data'=>$chinhanh
        ]);
    }

}
