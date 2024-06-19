<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChiTietSanPham;
use App\Models\ChiTietDonHang;
use App\Models\SanPham;
use App\Models\DungLuong;
use App\Models\MauSac;
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
    public function productdetail(Request $rq){
        $productdetail = ChiTietSanPham::where('id',$rq->id)->first();
        return response()->json([
            'data' => $productdetail,
        ]);
    }
    public function listdungluong(Request $rq){
        $dungluong = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->get();
        $data=[];
        $data2= [];
        for($k=0 ; $k<count($dungluong);$k++)
        {
            {
                array_push($data,$dungluong[$k]->dung_luong_id);
            }
            
        }
        for($i=0 ; $i<count($data);$i++)
        {
           for($j= $i+1;$j<count($data);$j++){
                if($data[$i] == $data[$j])
                {
                    $data[$j] = 0 ;
                    // $max == $
                }
           }
            
        }
        for($k=0 ; $k<count($data);$k++)
        {
            if($data[$k]!=0)
            {
                array_push($data2,$data[$k]);
            }
            
        }
        sort($data2);
        $data3= [];
        for($i=0;$i<count($data2);$i++){
            $dl = DungLuong::find($data2[$i]);
            array_push($data3,$dl);
        }
        return response()->json([
            'data' => $data3,
        ]);
    }
    public function listmausac(Request $rq){
        $mausac = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->get();
        $data=[];
        $data2= [];
        for($k=0 ; $k<count($mausac);$k++)
        {
            {
                array_push($data,$mausac[$k]->mau_sac_id);
            }
            
        }
        
        for($i=0 ; $i<count($data);$i++)
        {
           for($j= $i+1;$j<count($data);$j++){
                if($data[$i] == $data[$j])
                {
                    $data[$j] = 0 ;
                }
           }
            
        }
        for($k=0 ; $k<count($data);$k++)
        {
            if($data[$k]!=0)
            {
                array_push($data2,$data[$k]);
            }
            
        }
        sort($data2);
        $data3 = [];
        for($i=0;$i<count($data2);$i++){
            $dl = MauSac::find($data2[$i]);
            array_push($data3,$dl);
        }
        return response()->json([
            'data' => $data3,
        ]);
    }
    public function findproductdetail(Request $rq){
        $ctsp = ChiTietSanPham::where('mau_sac_id',$rq->mau_sac_id)->where('dung_luong_id',$rq->dung_luong_id)->first();
        return response()->json([
            'data' => $ctsp,
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
    public function latesproduct(){
        $products = SanPham::orderBy('created_at', 'desc')->get();
        $data = [];
        for($i = 0 ; $i<count($products); $i++)
        {
            $ctsp = ChiTietSanPham::where('san_pham_id', $products[$i]->id)->first();
            if($ctsp != null)
            {
                array_push($data,$ctsp);
            }
            
        }
        return response()->json([
            'data' => $data ,
        ]);
    }
    public function topseller(){
        $products = ChiTietDonHang::groupBy('chi_tiet_san_pham_id')
        ->select('chi_tiet_san_pham_id', \DB::raw('SUM(so_luong_mua) as total_quantity'))
        ->orderBy('total_quantity' ,'desc')
        ->get();
        $data=[];
        for($i = 0; $i<count($products) ;$i++)
        {
            $ctsp = ChiTietSanPham::find($products[$i]->chi_tiet_san_pham_id);
            $ctdh = [
                'chi_tiet_san_pham' => $ctsp,
                'so_luong_mua' => $products[$i]->total_quantity,
            ];
            array_push($data,$ctdh);
        }
        return response()->json([
            'data' => $data,
        ]);
    }
}
