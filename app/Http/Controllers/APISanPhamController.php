<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SanPham;
class APISanPhamController extends Controller
{
    public function Listproduct(){
        $product = SanPham::all();
        return response() -> json($product);
    }
}
