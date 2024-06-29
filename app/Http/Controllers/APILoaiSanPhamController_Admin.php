<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoaiSanPham_Admin;

class APILoaiSanPhamController_Admin extends Controller
{
    //
    public function danhSach(){
        $loaisp = LoaiSanPham_Admin::all();
        return response()->json([
            'data' => $loaisp,
        ]);
    }
    public function themLoaiSP(Request $request){
    
        if(empty($request->loaisp))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        $loaisanpham= LoaiSanPham_Admin::where('ten_loai',$request->loaisp)->first();
        if(!empty($loaisanpham->ten_loai)){
            return response()->json([
                'success'=> 0,
                'message'=> "Tên loại sản phẩm: ($request->loaisp) đã tồn tại!!",
                   
            ]);
        }
        #tao moi
        $loaisanpham = new LoaiSanPham_Admin();
        $loaisanpham->ten_loai      = $request->loaisp;
        $loaisanpham    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm loại sản phẩm thành công!! ",
            'data'=>$loaisanpham     
        ]);
    }
     //d.cập nhật
     public function capNhat(Request $request,$id)
     {
         $loaisanpham = LoaiSanPham_Admin::find($id);
         if(empty($loaisanpham)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Loại sản phẩm ID={$id} không tồn tại"
             ]);
         }
 
         $count =LoaiSanPham_Admin::where('id','<>',$id)->where('ten_loai',$request->loaisp)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Tên loại sản phẩm đã tồn tại"
             ]);
         }
         $loaisanpham->ten_loai      = $request->loaisp;
         $loaisanpham->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật loại sản phẩm thành công'
         ]);
     }
      //e. xóa
      public function xoa($id)
      {
          $loaisanpham =LoaiSanPham_Admin::find($id);
          if(empty($loaisanpham)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Loại sản phẩm ID={$id} không tồn tại"
              ]);
          }
  
          $loaisanpham->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa loại sản phẩm thành công'
          ]);
      }
}
