<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BinhLuanDanhGia;
class APIBinhLuanDanhGiaController extends Controller
{
    public function ListComment(){
        $comment = BinhLuanDanhGia::all();

    }
    public function ListVote($id){
        $votes = BinhLuanDanhGia::where('chi_tiet_san_pham_id',$id)->get();
        $votetest = BinhLuanDanhGia::where('chi_tiet_san_pham_id',$id)->first();
        $test =   BinhLuanDanhGia::where('chi_tiet_san_pham_id',$id)->groupBy('so_sao')
        ->select('so_sao', \DB::raw('COUNT(so_sao) as so_luong_sao'))->get();
        $comment = BinhLuanDanhGia::where('chi_tiet_san_pham_id',$id)->get();
        $star = [5,4,3,2,1];
        $data = [];
        $tong = 0.0;
        foreach($star as $item){
            $vote = $test->firstWhere('so_sao', $item);
            if($vote){
                $tong = $tong+  $vote->so_luong_sao * $item;
            }
          
            $phantram = ($vote ? ($vote->so_luong_sao*100)/count($votes) : 0);
            array_push($data,[
                'so_sao' => $item,
                'phan_tram_sao' =>number_format(round($phantram)),
            ]);
        }
        if(!empty($votetest)){
            return response()->json([
                'data' => $data,
                'tong_danh_gia'=>count($votes),
                 'tong_phan_tram_sao' =>number_format(round(($tong/count($votes)),1),1),
                 'data_comment' => $comment,
            ]);
        }
        else{
            return response()->json([
                'data' => $data,
                'tong_danh_gia'=>count($votes),
                'tong_phan_tram_sao' =>$tong,
                'data_comment' => null,
            ]);
        }
       
    }
   
}
