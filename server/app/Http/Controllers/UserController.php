<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
	public function get($id){
		$user = User::find($id);
		return $user;
	}

	public function store(){
		$user = User::create([
			//
		]);

		return $user;
	}

	public function update($id){
		$user = User::find($id)->update([
			//
		]);

		return ['status'=>'success'];
	}
}