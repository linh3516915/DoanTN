<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChiTietSanPham;
class APIChiTietSanPhamController extends Controller
{
    public function Listproductdetails(){
        $productdetail = ChiTietSanPham::all();
        return response()->json([
            'data' => $productdetail,
        ]);
    }
    public function Listproductdetail(Request $rq){
        $productdetail = ChiTietSanPham::where('san_pham_id',$rq->id_product)->get();
        return response()->json([
            'data' => $productdetail,
        ]);
    }
    public function top8hottrending(){
        $productdetail = ChiTietSanPham::all();
        $count = count($productdetail);
        $newdata = [];
        $dem= 0 ;
        if($count < 16)
            {
                return response()->json([
                    'message' => 'không đủ sản phẩm để hiển thị',
                ]);
            }
        for($i = 0 ; $i< $count ; $i++ )
        {
            $max =$i;
            for($j = $i+1 ; $j < $count;$j++ )
            {
                if($productdetail[$max]->luot_thich < $productdetail[$j]->luot_thich)
                {
                    $max= $j;
                    
                }
            }  
            if($i <= 3){
                $tam = $productdetail[$max];
                $productdetail[$max] = $productdetail[$i];
                $productdetail[$i] = $tam;
            }
        } 
        for ($i = 0 ; $i< $count ; $i++ )
        {
            
           if($i < 16){
                array_push($newdata,$productdetail[$i]);
           }
        }
        return response()->json([
            'data' => $newdata,
        ]);
    }
    
}
