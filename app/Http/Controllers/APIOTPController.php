<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use App\Mail\OtpMail;
use App\Models\User;
use App\Models\OTP;
use Illuminate\Support\Facades\Mail;
require 'D:\twilio\twilio-php-main\src\Twilio\autoload.php';
class APIOTPController extends Controller
{
     public function sendOTP(Request $request)
    {
        $otp = mt_rand(100000, 999999); // Tạo mã OTP gồm 6 số ngẫu nhiên
        $checkemail = OTP::where('email_verify',$request->input('email'))->first();
        if(!empty($checkemail)){
            return response()->json(['success' => false, 'message' => 'OTP was gave you']);
        }
        $otpverify = new OTP();
        $otpverify->OTP_verify = $otp;
        $otpverify->email_verify = $request->input('email');
        $otpverify->save();
        $email = $request->input('email'); // Lấy địa chỉ email từ request

        // Gửi email chứa mã OTP
        Mail::to($email)->send(new OtpMail($otp));

        return response()->json(['success' => true, 'message' => 'OTP has been sent successfully']);
    }
    public function sendOTPAgain(Request $request)
    {

        $otp = mt_rand(100000, 999999); // Tạo mã OTP gồm 6 số ngẫu nhiên
        $checkemail = OTP::where('email_verify',$request->input('email'))->first();
        if(!empty($checkemail)){
            $checkemail->delete();
        }
        $otpverify = new OTP();
        $otpverify->OTP_verify = $otp;
        $otpverify->email_verify = $request->input('email');
        $otpverify->save();
        $email = $request->input('email'); // Lấy địa chỉ email từ request

        // Gửi email chứa mã OTP
        Mail::to($email)->send(new OtpMail($otp));

        return response()->json(['success' => true, 'message' => 'OTP has been sent again successfully']);
    }
    public function checkOTP(Request $request)
    {
        $otp = $request->otp;
        $checkemail = OTP::where('email_verify',$request->input('email'))->first();
        if($otp == $checkemail->OTP_verify)
        {
            $checkemail->delete();
            return response()->json(['success' => true, 'message' => 'check OTP successfully']);
            
        }
        return response()->json(['success' => false, 'message' => 'Something went wrong']);
    }
}
