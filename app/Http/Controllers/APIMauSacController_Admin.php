<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MauSac_Admin;

class APIMauSacController_Admin extends Controller
{
    //
    public function danhSach(){
        $dsMauSac = MauSac_Admin::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dsMauSac
            ]);
    } 
    public function themMauSac(Request $request){
    
        if(empty($request->ten_mau_sac))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        $mausac= MauSac_Admin::where('ten_mau_sac',$request->ten_mau_sac)->first();
        if(!empty($mausac->ten_mau_sac)){
            return response()->json([
                'success'=> 0,
                'message'=> "Màu Sắc: ($request->ten_mau_sac) đã tồn tại!!"        
            ]);
        }
        #tao moi
        $mausac = new MauSac_Admin();
        $mausac->ten_mau_sac      = $request->ten_mau_sac;
        $mausac    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm Màu Sắc thành công!! "
        ]);
    }
     //d.cập nhật
     public function capNhat(Request $request,$id)
     {
         $mausac = MauSac_Admin::find($id);
         if(empty($mausac)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Màu Sắc ID={$id} không tồn tại"
             ]);
         }
 
         $count =MauSac_Admin::where('id','<>',$id)->where('ten_mau_sac',$request->ten_mau_sac)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Màu Sắc sản phẩm đã tồn tại"
             ]);
         }
         $mausac->ten_mau_sac      = $request->ten_mau_sac;
         $mausac->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật Màu Sắc thành công'
         ]);
     }
      //e. xóa
      public function xoa($id)
      {
          $mausac =MauSac_Admin::find($id);
          if(empty($mausac)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Màu Sắc ID={$id} không tồn tại"
              ]);
          }
  
          $mausac->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa Màu Sắc thành công'
          ]);
      }
}
