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
    public function themMoi(Request $request){
        if(empty($request->tenchinhanh))
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
                'message'=> "Chi nhánh: ($request->tenchinhanh) đã tồn tại!!"        
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
    public function capNhat(Request $request,$id){
        $chinhanh = ChiNhanh_Admin::find($id){
            if(empty($chinhanh)){
                return response()->json([
                    'success' => -1;
                    'message'=>"Chi nhanh ID = {$id} không tồn tại!! ";
                ]);
            }
        }
        $count = ChiNhanh_Admin::where('id','<>',$id)->where('ten_chi_nhanh',$request->tenchinhanh)->count();
        if($count>0){
            return response()->json([
                'success' => 0;
                'message' => "Chi nhánh $reqest->tenchinhanh đã tồn tại !! ";
            ]);
        }
            $chinhanh->ten_chi_nhanh      = $request->tenchinhanh;
            $chinhanh->dia_chi            = $request->address;
            $chinhanh->sdt_tong_dai       = $request->sdttongdai;
            $chinhanh->gio_mo_cua         = $request->giomocua;
            $chinhanh->ngay_khai_truong      = $request->ngaykhaitruong;
            $chinhanh    ->save();
            return response()->json([
                'success' =>true,
                'message' =>'Cập nhật chi nhánh thành công'
            ]);
    }

}
