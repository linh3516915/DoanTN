<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;
class APIAccountController extends Controller
{
    public function signup(Request $rq){
        $user = new Account();
        $user->name = $rq->name;
        $user->email = $rq->email;
        $user->password = Hash::make($rq->password);
        $user->so_dien_thoai = $rq->phone;
        $user->dia_chi = $rq->address;
        $user->save();
        return response()->json([
            'success' => true,
            'message' => 'thành công'
        ]);
    }
    public function checkemail(Request $rq){
        $checkuser = Account::where('email',$rq->email)->first();
        if(!empty($checkuser))
        {
            return response()->json([
                'success' => false,
                'message' => 'đã tồn tại'
            ]);
        }
        return response()->json([
            'success' => true,
        ]);
    }
}
