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
        $products = SanPham::all();
        $data = [];
        for($i=0; $i<count($products);$i++){
            $productdetail = ChiTietSanPham::where('san_pham_id',$products[$i]->id)->first();
            if($productdetail != null){
                array_push($data,$productdetail);
            }
        }
        return response()->json([
            'data' => $data,
        ]);
    }
    public function Listproductdetail(Request $rq){
        $productdetail = ChiTietSanPham::where('san_pham_id',$rq->id_product)->get();
        return response()->json([
            'data' => $productdetail,
        ]);
    }
    public function productdetail(Request $rq){
        // $productdetail = ChiTietSanPham::where('ten',$rq->ten)->first();
        $productdetail = ChiTietSanPham::whereRaw('LOWER(ten) = LOWER(?)', [$rq->ten])->first();
        $ncc = SanPham::find($productdetail->san_pham_id);
        $mau_sac =   ChiTietSanPham::where('san_pham_id',$productdetail->san_pham_id)->groupBy('mau_sac_id')->select('mau_sac_id')->get();
        $datamausac =[];
        for($i=0;$i<count($mau_sac);$i++){
            $ms = MauSac::find($mau_sac[$i]->mau_sac_id);
            array_push($datamausac,$ms);
        }
        $dung_luong =   ChiTietSanPham::where('san_pham_id',$productdetail->san_pham_id)->groupBy('dung_luong_id')->select('dung_luong_id')->get();
        $datadungluong =[];
        for($i=0;$i<count($dung_luong);$i++){
            $dl = DungLuong::find($dung_luong[$i]->dung_luong_id);
            array_push($datadungluong,$dl);
        }
        return response()->json([
            'data' => $productdetail,
            'nha_cung_cap_id' => $ncc->nha_cung_cap_id,
            'mau_sac' => $datamausac,
            'dung_luong' => $datadungluong ,
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
        $ctsp = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)->where('dung_luong_id',$rq->dung_luong_id)->first();
        return response()->json([
            'data' => $ctsp,
        ]);
    }
    
    public function top8hottrending(){
        $productdetail = ChiTietSanPham::where('luot_thich' ,'>',0)->orderBy('luot_thich' , 'desc')->get();
        $data = [];
        for($i = 0;$i<count($productdetail);$i++){
            if($i<16 )
            {
                array_push($data,$productdetail[$i]);
            }
        }
        return response()->json([
            'data' => $data,
            
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
            'result' => count($data)
        ]);
    }
    public function topseller(){
        $product = ChiTietDonHang::all();
        $data=[];
        if(count($product)>0){
            $products = ChiTietDonHang::groupBy('chi_tiet_san_pham_id')
            ->select('chi_tiet_san_pham_id', \DB::raw('SUM(so_luong_mua) as total_quantity'))
            ->orderBy('total_quantity' ,'desc')
            ->get();
          
    
                for($i = 0; $i<count($products) ;$i++)
                {
                    $ctsp = ChiTietSanPham::find($products[$i]->chi_tiet_san_pham_id);
                    // $ctdh = [
                    //     'chi_tiet_san_pham' => $ctsp,
                    //     'so_luong_mua' => $products[$i]->total_quantity,
                    // ];
                    array_push($data,$ctsp);
                }
                return response()->json([
                    'data' => $data,
                    'result' => count($data)
                ]);
        }
        
        
        return response()->json([
            'data' => $data
        ]);
    }
    public function search(Request $rq){
        if($rq->ten !='')
        {
            $ctsp = ChiTietSanPham::where('ten','like','%'.$rq->ten.'%')->get();
            // $data = [];
            // for($i=0; $i<count($ctsp);$i++){
            //     $productdetail = ChiTietSanPham::where('san_pham_id',$ctsp[$i]->id)->first();
            //     if($productdetail != null){
            //         array_push($data,$productdetail);
            //     }
                
            // }
            return response()->json([
                'result' => count($ctsp),
                 'data' => $ctsp,
                
            ]);
        }
        return response()->json([
            'result' => 0,
            'data' => null,
       ]);
    }
    public function filterprice(Request $rq){
        if($rq->giatu  < 1000000 ||$rq->giatu  >=  $rq->giaden){
            return response()->json([
                'success' => false,
                'message'=> 'lỗi'
            ]);
        }
        if( $rq->giaden < 1000000 &&  $rq->giaden < $rq->giatu)
            {
                return response()->json([
                    'success' => false,
                    'message'=> 'lỗi'
                ]);
            }
            if($rq->giatu < $rq->giaden){
                $productdetail = ChiTietSanPham::where('gia','>',$rq->giatu)->where('gia','<=',$rq->giaden)->get();
                return response()->json([
                    'result' => count($productdetail),
                    'data' => $productdetail,
                    'success' => true,
                ]);
            }
            else{
                return response()->json([
                    'success' => false,
                    'message'=> 'lỗi'
                ]);
            }
            
    }
    public function relatedproduct(Request $rq){
        $sp = SanPham::where('nha_cung_cap_id', $rq->nha_cung_cap_id)->get();
        $data=[];
            foreach($sp as $item){
                $ctsp = ChiTietSanPham::where('san_pham_id', $item->id)->first();
                if(!empty($ctsp)){
                    if( $ctsp->id != $rq->id){
                        array_push($data,$ctsp);
                    }
                }
            }
            return response() -> json([
                'data' => $data,   
            ]);
        
        return response() -> json([
            'data' => $data,   
        ]);
    }
}
