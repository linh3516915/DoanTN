<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\NoiDungSanPham;
use App\Models\HinhAnhNoiDungSanPham;
class APINoiDungSanPhamController extends Controller
{
    public function addinfoproductdetail(Request $rq){
        $info = new NoiDungSanPham();
        if($rq->tieu_de ==''){
            if( $rq->noi_dung == ''){
                $info->san_pham_id = $rq->san_pham_id;
                $info->tieu_de ='';
                $info->noi_dung = '';
                $info->save(); 
            }
            else {
                $info->san_pham_id = $rq->san_pham_id;
                $info->tieu_de ='';
                $info->noi_dung = $rq->noi_dung;
                $info->save(); 
            }
        }
        else{
            $info->san_pham_id = $rq->san_pham_id;
            $info->tieu_de =$rq->tieu_de;
            $info->noi_dung =  $rq->noi_dung;
            $info->save(); 
        }

        
        if($rq->image != null){
            try {
                // Kiểm tra xem đã có file được tải lên chưa
                if ($rq->hasFile('image')) {
                    $image = $rq->file('image');
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    // Di chuyển ảnh vào thư mục lưu trữ (public/uploads)
                    $image->move(public_path('image/productinfomation'), $imageName);
                    // Lưu thông tin ảnh vào cơ sở dữ liệu
                    $imginfoproduct = new HinhAnhNoiDungSanPham();
                    $imginfoproduct->noi_dung_san_pham_id = $info->id;
                    $imginfoproduct->URL_anh= 'image/productinfomation/' . $imageName;
                    $imginfoproduct->save();
                    return response()->json([
                        'message' => 'Image uploaded successfully',
                        'data' => $info,
                        'data2' => $imginfoproduct,
                    ]);
                } else {
                    return response()->json(['error' => 'No image file provided'], 400);
                }
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
     
         return response()->json([
             'success'=> true,
         ]);
     }
     public function listinfoproductdetail(Request $rq){
        $info = NoiDungSanPham::where('san_pham_id',$rq->san_pham_id)->get();
        $data=[];
        for($i= 0 ; $i<count($info);$i++){
            $image = HinhAnhNoiDungSanPham::where('noi_dung_san_pham_id' , $info[$i]->id)->get();
            array_push($data,[
                'noi_dung_san_pham' => $info[$i],
                'hinh_anh_noi_dung' => $image,
            ]);
        }
         return response()->json([
             'data' => $data,
         ]);
     }
     public function delinfoproduct($id){
        $info = NoiDungSanPham::find($id);
        $img = HinhAnhNoiDungSanPham::where('noi_dung_san_pham_id',$info->id)->first();
        if(!empty($img)){
            $info->tieu_de = '';
            $info->noi_dung = '';
            $info->save();
            return response()->json([
                'success' => true,
            ]);
        }
        else{
            $info->delete();
            return response()->json([
                'success' => true,
            ]);
        }
        
         
     }
     public function delimginfoproduct($id){
        $img = HinhAnhNoiDungSanPham::find($id);
        $file =$img->URL_anh;
        if(File::exists($file)){
            File::delete($file);
        }
        else {
            return response()->json(['error' => 'File not found'], 404);
        }
        $img->delete();
         return response()->json([
             'success' => true,
         ]);
     }
     public function del($id){
        $info = NoiDungSanPham::find($id);
        $img = HinhAnhNoiDungSanPham::where('noi_dung_san_pham_id',$info->id)->get();
        for($i=0 ; $i<count($img); $i++){
            $file = $img[$i]->URL_anh;
            if(!empty($img)){
                if(File::exists($file)){
                    File::delete($file);
                }
                $img[$i]->delete();
            }            
        }
        $info->delete();
         return response()->json([
             'success' => true,
         ]);
     }
     public function editinfoproductdetail(Request $rq){
        $info = NoiDungSanPham::find($rq->id);
        if($rq->tieu_de ==''){
            if( $rq->noi_dung == ''){
                $info->tieu_de ='';
                $info->noi_dung = '';
                $info->save(); 
            }
            else {
                $info->tieu_de ='';
                $info->noi_dung = $rq->noi_dung;
                $info->save(); 
            }
        }
        else{
            $info->tieu_de =$rq->tieu_de;
            $info->noi_dung =  $rq->noi_dung;
            $info->save(); 
        }

        
        if($rq->image != null){
            try {
                // Kiểm tra xem đã có file được tải lên chưa
                if ($rq->hasFile('image')) {
                    $image = $rq->file('image');
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    // Di chuyển ảnh vào thư mục lưu trữ (public/uploads)
                    $image->move(public_path('image/productinfomation'), $imageName);
                    // Lưu thông tin ảnh vào cơ sở dữ liệu
                    $imginfoproduct = new HinhAnhNoiDungSanPham();
                    $imginfoproduct->noi_dung_san_pham_id = $info->id;
                    $imginfoproduct->URL_anh= 'image/productinfomation/' . $imageName;
                    $imginfoproduct->save();
                    return response()->json([
                        'message' => 'Image uploaded successfully',
                        'data' => $info,
                        'data2' => $imginfoproduct,
                    ]);
                } else {
                    return response()->json(['error' => 'No image file provided'], 400);
                }
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
        return response()->json([
            'success'=> true,
        ]);
     }
}
