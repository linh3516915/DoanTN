<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Models\Account;
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
        if(auth()->user())
        return response()->json(auth()->user());
    }
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
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
