<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SoTongDai_Admin;
class APISoTongDaiController_Admin extends Controller
{
    //
    public function danhSach(){
        $sotongdai = SoTongDai_Admin::all();
        return response()->json([
            'data' => $sotongdai,
        ]);
    }
}
