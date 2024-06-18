<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SanPham;
use Carbon\Carbon;
class APISanPhamController extends Controller
{
    public function Listproduct(){
        $product = SanPham::all();
        return response() -> json($product);
    }
    public function themmoi(Request $rq){
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
        $sp = SanPham::where('ten', $rq->ten_san_pham)->first();
        if(!empty($sp))
        {
            return response()->json([
                'success' => false,
                'message' => 'sản phẩm đã tồn tại'
            ]);
        }
        $sanpham = new SanPham();
        $sanpham->ten = $rq->ten_san_pham;
        $sanpham->nha_cung_cap_id = $rq->nha_cung_cap_id;
        $sanpham->loai_san_pham_id = $rq->loai_san_pham_id;
        $sanpham->created_at = $dt->toDateTimeString();
        $sanpham->save(); 
        return response()->json([
            'success' => true,
            'message' => 'thêm thành công'
        ]);
    }
    public function capnhat(Request $rq){
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
        $sp = SanPham::find($rq->id);
        if(empty($sp))
        {
            return response()->json([
                'success' => false,
                'message' => 'sản phẩm không tồn tại'
            ]);
        }
        // if($sp->ten ==$rq->ten_san_pham)
        // {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'tên sản phẩm đã tồn tại'
        //     ]);
        // }
        $sp->ten = $rq->ten_san_pham;
        $sp->nha_cung_cap_id = $rq->nha_cung_cap_id;
        $sp->loai_san_pham_id = $rq->loai_san_pham_id;
        $sp->updated_at = $dt->toDateTimeString();
        $sp->save(); 
        return response()->json([
            'success' => true,
            'message' => 'cập nhật thành công'
        ]);
    }
    public function capnhattatca(Request $rq){
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
        $sp = SanPham::all();
        // if($sp->ten ==$rq->ten_san_pham)
        // {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'tên sản phẩm đã tồn tại'
        //     ]);
        // }
        for($i = 0 ; $i<count($sp); $i++){
            $sp[$i]->created_at = $dt->toDateTimeString();
            $sp[$i]->save(); 
        }
        return response()->json([
            'success' => true,
            'message' => 'cập nhật thành công'
        ]);
    }
}
