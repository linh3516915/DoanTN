<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TenShop_Admin;

class APITenshopController_Admin extends Controller
{
    //
    public function danhSach(){
        
        $dstenshop = TenShop_Admin::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dstenshop
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
