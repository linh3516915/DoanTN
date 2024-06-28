<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BinhLuanDanhGia;
use App\Models\ChiTietSanPham;
use App\Models\User;
class APIBinhLuanDanhGiaController extends Controller
{
    public function writecomment(Request $rq){
       
        $comment = new BinhLuanDanhGia();
        if($rq->user_id != 0){
            $user = User::find($rq->user_id);
            $comment->san_pham_id = $rq->san_pham_id;
            $comment->mau_sac_id = $rq->mau_sac_id;
            $comment->dung_luong_id = $rq->dung_luong_id;
            $comment->noi_dung_binh_luan = $rq->noi_dung_binh_luan;
            $comment->ten = $user->name;
            $comment->so_dien_thoai = $user->so_dien_thoai ;
            $comment->luot_thich = 0;
            $comment->so_sao = $rq->so_sao;
            //  $comment->save();
             $votes = BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
             ->where('dung_luong_id',$rq->dung_luong_id)->get();
             $test =   BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
             ->where('dung_luong_id',$rq->dung_luong_id)->groupBy('so_sao')
             ->select('so_sao', \DB::raw('COUNT(so_sao) as so_luong_sao'))->get();
             $tong = 0;
            foreach($test as $item){
                $tong = $tong+  $item->so_sao * $item->so_luong_sao;
            }
            if(count($votes)>0){
                $tong = number_format(round(($tong/count($votes)),1),1);
            }
            $ctsp = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
            ->where('dung_luong_id',$rq->dung_luong_id)->first();
            $ctsp->so_sao = $tong;
            //  $ctsp->save();
            return response()->json([
                'success' => true
            ]);
        }
        else{
            $comment->san_pham_id = $rq->san_pham_id;
            $comment->mau_sac_id = $rq->mau_sac_id;
            $comment->dung_luong_id = $rq->dung_luong_id;
            $comment->noi_dung_binh_luan = $rq->noi_dung_binh_luan;
            $comment->ten = $rq->ten;
            $comment->so_dien_thoai = $rq->so_dien_thoai ;
            $comment->luot_thich = 0;
            $comment->so_sao = $rq->so_sao;
              $comment->save();
             $votes = BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
             ->where('dung_luong_id',$rq->dung_luong_id)->get();
             $test =   BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
             ->where('dung_luong_id',$rq->dung_luong_id)->groupBy('so_sao')
             ->select('so_sao', \DB::raw('COUNT(so_sao) as so_luong_sao'))->get();
             $tong = 0;
            foreach($test as $item){
                $tong = $tong+  $item->so_sao * $item->so_luong_sao;
            }
            if(count($votes)>0){
                $tong = number_format(round(($tong/count($votes)),1),1);
            }
            $ctsp = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
            ->where('dung_luong_id',$rq->dung_luong_id)->first();
            $ctsp->so_sao = $tong;
              $ctsp->save();
            return response()->json([
                'success' => true,
                'data' => $ctsp->so_sao,
                'tong' => $tong
            ]);
        }
       
    }
    public function ListVote(Request $rq){
        $votes = BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
        ->where('dung_luong_id',$rq->dung_luong_id)->get();
        $votetest = BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
        ->where('dung_luong_id',$rq->dung_luong_id)->first();
        $test = BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
        ->where('dung_luong_id',$rq->dung_luong_id)->groupBy('so_sao')
        ->select('so_sao', \DB::raw('COUNT(so_sao) as so_luong_sao'))->get();
        $comment = BinhLuanDanhGia::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)
        ->where('dung_luong_id',$rq->dung_luong_id)->get();
        $star = [5,4,3,2,1];
        $data = [];
        $tong = 0;
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
    
    public function likecomment($id) {
        $comment =  BinhLuanDanhGia::find($id);
        $comment->luot_thich++;
        $comment->save();
        return response()->json([
            'success' => true,
        ]);
    }
}
