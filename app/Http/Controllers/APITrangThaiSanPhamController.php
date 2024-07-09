<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TenShop_Admin;
use App\Models\TrangThaiSanPham;

class APITrangThaiSanPhamController extends Controller
{
    //
    public function danhSach(){
        
        $dstenshop = TrangThaiSanPham::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dstenshop
            ]);
    } 
    public function themmoi(Request $request){
        $tenshop = new TrangThaiSanPham();
        $count =TrangThaiSanPham::where('ten_trang_thai',$request->tentrangthai)->count();
        if($count>0)
        {
            return response()->json([
                'success' =>false,
                'message' =>"tên Shop đã tồn tại"
            ]);
        }
        $tenshop->ten_trang_thai      = $request->tentrangthai;
        $tenshop->save();
        return response()->json([
            'success' =>true,
            'message' =>'thêm tên Shop thành công',
            'data'=>$tenshop
        ]);
    }
    public function capNhatTen(Request $request,$id){
        $tenshop = TenShop_Admin::find($id);
        $count =TenShop_Admin::where('id','<>',$id)->where('ten_shop',$request->tenshop)->count();
        if($count>0)
        {
            return response()->json([
                'success' =>false,
                'message' =>"tên Shop đã tồn tại"
            ]);
        }
        $tenshop->ten_shop      = $request->tenshop;
        $tenshop->save();
        return response()->json([
            'success' =>true,
            'message' =>'Cập nhật tên Shop thành công'
        ]);
    }
}
