<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','refresh']]);
    }
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
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
            'expires_in' => auth()->factory()->getTTL() * 60
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
