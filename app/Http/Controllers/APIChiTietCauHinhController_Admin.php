<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChiTietCauHinh_Admin;
use App\Models\SanPham_Admin;

class APIChiTietCauHinhController_Admin extends Controller
{
    //
    public function danhSach($id){
        $sanpham=SanPham_Admin::find($id);
        $dschitietcauhinh= ChiTietCauHinh_Admin::where('san_pham_id',$id)->get();
        $data=[];
            
            $length=count($dschitietcauhinh);
            for($i=0;$i<$length;$i++)
            {
                $ctch =new ChiTietCauHinh_Admin();
                $ctch->id=$dschitietcauhinh[$i]->id;
                $ctch->ten_ctch=$dschitietcauhinh[$i]->ten_ctch;
                $ctch->san_pham_ten= $sanpham->ten;
                $ctch->cpu=$dschitietcauhinh[$i]->cpu;
                $ctch->size_man_hinh=$dschitietcauhinh[$i]->size_man_hinh;
                $ctch->he_dieu_hanh=$dschitietcauhinh[$i]->he_dieu_hanh;
                $ctch->camera=$dschitietcauhinh[$i]->camera;
                $ctch->pin=$dschitietcauhinh[$i]->pin;
                $ctch->sim=$dschitietcauhinh[$i]->sim;
                $ctch->gpu=$dschitietcauhinh[$i]->gpu;
                $ctch->toc_do_cpu=$dschitietcauhinh[$i]->toc_do_cpu;
                $ctch->gps=$dschitietcauhinh[$i]->gps;
                $ctch->ngay_ra_mat=$dschitietcauhinh[$i]->ngay_ra_mat;
                array_push($data,$ctch);
            }
            return response()->json([
                'success' =>true,
                'data'    =>$data
            ]);
    }
    public function chiTietCH($id){
        $chitietch = ChiTietCauHinh_Admin::find($id);
        return response()->json([
            'success' => true,
            'data' =>$chitietch
        ]);
    }
    public function themCTCH(Request $request, $id){
    
        #kiem tra ctch cua san pham da ton tai hay chua?
        $ctch = ChiTietCauHinh_Admin::where('ten_ctch',$request->tenctch)->first();
        if(!empty($ctch->ten_ctch)){
            return response()->json([
                'success'=> 0,
                'message'=> " Chi tiết cáu hình $request->tenctch đã tồn tại !!"        
            ]);
        }
        #tao moi ctch san pham
        $ctch = new ChiTietCauHinh_Admin();
        $ctch->ten_ctch       = $request->tenctch;
        $ctch-> san_pham_id = $id;
        $ctch->cpu = $request->cpu;
        $ctch ->size_man_hinh = $request -> kichthuocmanhinh;
        $ctch ->he_dieu_hanh = $request -> hedieuhanh ;
        $ctch -> camera = $request -> camera ;
        $ctch -> pin = $request -> pin ;
        $ctch -> sim = $request -> sim ;
        $ctch -> gpu = $request -> gpu ;
        $ctch -> toc_do_cpu = $request -> tocdocpu ;
        $ctch -> gps = $request -> gps ;
        $ctch -> ngay_ra_mat = $request -> ngayramat ;
        $ctch    ->save();
        //
        return response()->json([
            'success' => true,
            'message' => "Thêm chi tiết cấu hình sản phẩm thành công! "
        ]);
    }
    public function Capnhat(Request $request, $id){
        $ctch =ChiTietCauHinh_Admin::find($id);
        if(empty($ctch)){
            return response()->json([
                'success' =>false,
                'message' =>"Chi tiết cấu hình ID={$id} không tồn tại"
            ]);
        }

        $count =ChiTietCauHinh_Admin::where('id','<>',$id)->where('ten_ctch',$request->ten_ctch)->count();
        if($count>0)
        {
            return response()->json([
                'success' =>false,
                'message' =>" $request->ten_ctch  đã tồn tại"
            ]);
        }
        $ctch->ten_ctch       = $request->tenctch;
        $ctch->cpu = $request->cpu;
        $ctch ->size_man_hinh = $request -> kichthuocmanhinh;
        $ctch ->he_dieu_hanh = $request -> hedieuhanh ;
        $ctch -> camera = $request -> camera ;
        $ctch -> pin = $request -> pin ;
        $ctch -> sim = $request -> sim ;
        $ctch -> gpu = $request -> gpu ;
        $ctch -> toc_do_cpu = $request -> tocdocpu ;
        $ctch -> gps = $request -> gps ;
        $ctch -> ngay_ra_mat = $request -> ngayramat ;
        $ctch    ->save();
        return response()->json([
            'success' =>true,
            'message' =>'Cập nhật chi tiết cấu hình sản phẩm thành công',
            'san_pham_id' => $ctch->san_pham_id
            
        ]); 
    }
    public function xoa($id)
     {
        
         $ctch =ChiTietCauHinh_Admin::find($id);
        
        if(empty($ctch)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Chi tiết cấu hình ID={$id} không tồn tại"
             ]);
         }
        
 
         $ctch->delete();
         return response()->json([
             'success' =>true,
             'message' =>'Xóa chi tiết cấu hình sản phẩm thành công'
         ]);
     }
}
