<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ram_Admin;

class APIRamController_Admin extends Controller
{
    //
    public function danhSach(){
        
        $dsRam = Ram_Admin::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dsRam
            ]);
    } 
    public function themRam(Request $request){
    
        if(empty($request->loai_ram))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        $ram= Ram_Admin::where('loai_ram',$request->loai_ram)->first();
        if(!empty($ram->loai_ram)){
            return response()->json([
                'success'=> 0,
                'message'=> "Ram: ($request->loai_ram) đã tồn tại!!"        
            ]);
        }
        #tao moi
        $ram = new Ram_Admin();
        $ram->loai_ram      = $request->loai_ram;
        $ram    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm Ram thành công!! "
        ]);
    }
     //d.cập nhật
     public function capNhat(Request $request,$id)
     {
         $ram = Ram_Admin::find($id);
         if(empty($ram)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Ram ID={$id} không tồn tại"
             ]);
         }
 
         $count =Ram_Admin::where('id','<>',$id)->where('loai_ram',$request->loai_ram)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Ram sản phẩm đã tồn tại"
             ]);
         }
         $ram->loai_ram      = $request->loai_ram;
         $ram->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật Ram thành công'
         ]);
     }
      //e. xóa
      public function xoa($id)
      {
          $ram =Ram_Admin::find($id);
          if(empty($ram)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Ram ID={$id} không tồn tại"
              ]);
          }
  
          $ram->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa Ram thành công'
          ]);
      }
}
