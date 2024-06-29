<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Models\GioHang;
use App\Models\ChiTietSanPham;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','refresh','signup']]);
    }

    public function signup(Request $rq){
        $user = new User();
        $user->name = $rq->name;
        $user->email = $rq->email;
        $user->password = Hash::make($rq->password);
        $user->so_dien_thoai = $rq->phone;
        $user->dia_chi = $rq->address;
        $user->save();
        // $token = auth()->attempt($rq->only('email', 'password'));
        // $refreshToken = $this->createRefreshToken();
        // return $this->respondWithToken($token, $refreshToken);
        return response()->json([
            'success' => true,
            'message' => 'thành công',
            'data'=>$user
        ]);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized',
                'success' => false
            ]);
        }
        $refreshToken = $this->createRefreshtoken();
        return $this->respondWithToken($token,$refreshToken);
    }
    
    public function profile()
    {
        if(auth()->user()){
            if(auth()->user()->isAdmin == 0){
                $giohang = GioHang::where('users_id',auth()->user()->id)->get();
                $data= [];
                    for($i = 0 ;$i< count($giohang);$i++){
                        $ctsp = ChiTietSanPham::where('san_pham_id', $giohang[$i]->san_pham_id)
                        ->where('mau_sac_id', $giohang[$i]->mau_sac_id)->where('dung_luong_id', $giohang[$i]->dung_luong_id)->first();
                        array_push($data,[
                            'ctsp' => $ctsp,
                            'so_luong' => $giohang[$i]->so_luong
                        ]);
                    }
                    return response()->json([
                        'data_user' =>  auth()->user(),
                        'data_gio_hang' => $data,
                    ]);
                
            }
            return response()->json([
                'data_user' =>  auth()->user()
            ]);
        }
    }
    public function logout(Request $rq)
    {
        
        if($rq->data != []){
            $giohang= GioHang::where('users_id',$rq->user_id)->get();
            if(count($giohang)>0){
                $giohang->each->delete();
            }
            for ($i = 0 ; $i<count($rq->data);$i++) {
                $cart= new GioHang();
                $cart -> users_id = $rq->user_id;
                $cart->san_pham_id = $rq->data[$i]['product']['san_pham_id'];
                $cart ->mau_sac_id = $rq->data[$i]['product']['mau_sac_id'];
                $cart->dung_luong_id = $rq->data[$i]['product']['dung_luong_id'];
                $cart->so_luong = $rq->data[$i]['quantity'];    
                $cart->trang_thai = 0 ;
                $cart->save();
            }
            auth()->logout();
        return response()->json([
            'success' => true,  
            'message' => 'Successfully logged out'
        ]);
        }
        auth()->logout();
        return response()->json([
            'success' => true,  
            'message' => 'Successfully logged out'
        ]);
    }

    public function refresh()    {  
        $refreshToken= request()->refresh_token;
        try {
          
            $decoded =  JWTAuth::getJWTProvider()->decode($refreshToken);
            $user = User::find($decoded['sub']);
            
        if(!$user){
            return response() -> json(['message' => 'khong co user nay']);
        }
        $token = auth() -> login($user);
        $refreshToken = $this->createRefreshtoken();
        return $this->respondWithToken($token,$refreshToken);
    } catch (JWTException $Exception) {
        return response()->json('sai');
    }
    }

    private function respondWithToken($token,$RefreshToken)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => $RefreshToken,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'success' => true
        ]);
    }
    private function createRefreshtoken() {
        $data=[
            'sub' => auth('api')->user()->id,
            'random' => rand().time(),
            'exp' => time()+ config('jwt.refresh_ttl')
        ];
       $refreshToken =  JWTAuth::getJWTProvider()->encode($data);
        return $refreshToken;
    }
}
