<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use Auth;
class UserController extends Controller
{
    private $salt;
    public function __construct()
    {
        $this->salt=env("SALT");
    }

    public function login(Request $request){
      if ($request->has('email') && $request->has('password')) {
        $user = User:: where("email", "=", $request->input('email'))
                      ->where("password", "=", sha1($this->salt.$request->input('password')))
                      ->first();
        if ($user) {
          $token=str_random(60);
          $user->api_token=$token;
          $user->save();
          return $user->api_token;
        } else {
          return "User doesn't exist";
        }
      } else {
        return "Insufficient login credentials";
      }
    }

    public function register(Request $request){
      if ($request->has('password') && $request->has('email')) {
        $user = new User;
        $user->password=sha1($this->salt.$request->input('password'));
        $user->email=$request->input('email');
        $user->api_token=str_random(60);

        if($request->input('insurance_company')){
        	$user->insurance_company = $request->input('insurance_company');
        }

        if($request->input('insurance_account_number')){
        	$user->insurance_company = $request->input('insurance_account_number');
        }

        if($user->save()){
          	return "User registered!";
        } else {
          return "Too bad";
        }
      } else {
        return "Insufficient login credentials";
      }
    }

    public function info(){
      return Auth::user();
    }
}