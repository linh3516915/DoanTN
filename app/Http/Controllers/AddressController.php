<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Province;
use App\Models\District;
use App\Models\Ward;
class AddressController extends Controller
{
    public function province(){
        $province = Province::all() ; 
        return response()->json([
            'data' => $province 
        ]);
    }
    public function district(Request $rq){
        $district = District::where('province_id',$rq->province_id)->get() ; 
        $province = Province::where('province_id',$rq->province_id)->first();
        if(!empty($province)){
            return response()->json([
                'nameprovince' => $province->name, 
                'data' => $district 
            ]);
        }
        return response()->json([
            'message' => "không tìm thấy",
            'data' => []
        ]);

    }
    public function ward(Request $rq){
        $Ward = Ward::where('district_id',$rq->district_id)->get() ; 
        $district = District::where('district_id',$rq->district_id)->first();
        if(!empty($district)){
            return response()->json([
                'namedistrict' => $district->name,
                'data' => $Ward 
                
            ]);
        }
        return response()->json([
            'message' => "không tìm thấy",
            'data' => []
        ]);
        
    }
}
