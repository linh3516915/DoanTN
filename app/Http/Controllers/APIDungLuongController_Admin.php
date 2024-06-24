<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DungLuong_Admin;

class APIDungLuongController_Admin extends Controller
{
    //
    public function danhSach(){
        
        $dsDungLuong = DungLuong_Admin::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dsDungLuong
            ]);
    } 
    public function themDungLuong(Request $request){
    
        if(empty($request->kich_thuoc))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        $dungluong= DungLuong_Admin::where('kich_thuoc',$request->kich_thuoc)->first();
        if(!empty($dungluong->kich_thuoc)){
            return response()->json([
                'success'=> 0,
                'message'=> "Tên loại sản phẩm: ($request->kich_thuoc) đã tồn tại!!"        
            ]);
        }
        #tao moi
        $dungluong = new DungLuong_Admin();
        $dungluong->kich_thuoc      = $request->kich_thuoc;
        $dungluong    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm dung lượng thành công!! "
        ]);
    }
     //d.cập nhật
     public function capNhat(Request $request,$id)
     {
         $dungluong = DungLuong_Admin::find($id);
         if(empty($dungluong)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Dung lượng ID={$id} không tồn tại"
             ]);
         }
 
         $count =DungLuong_Admin::where('id','<>',$id)->where('kich_thuoc',$request->kich_thuoc)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Dung lượng sản phẩm đã tồn tại"
             ]);
         }
         $dungluong->kich_thuoc      = $request->kich_thuoc;
         $dungluong->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật dung lượng thành công'
         ]);
     }
      //e. xóa
      public function xoa($id)
      {
          $dungluong =DungLuong_Admin::find($id);
          if(empty($dungluong)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Dung lượng ID={$id} không tồn tại"
              ]);
          }
  
          $dungluong->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa Dung lượng thành công'
          ]);
      }
}
