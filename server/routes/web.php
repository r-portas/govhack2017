<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('test', function(){
	return view('login');
});

$s = 'social.';
$app->get('/social/redirect/{provider}',   ['as' => $s . 'redirect',   'uses' => 'SocialController@getSocialRedirect']);
$app->get('/social/handle/{provider}',     ['as' => $s . 'handle',     'uses' => 'SocialController@getSocialHandle']);

//Sign up user
$app->post('user/register', function(){
	//
});

//Login up user
$app->post('user/login', function(){
	//
});

//Update user info
$app->put('user/{id}', function($id){

});

//Retrieves user details
$app->get('user/{id}', function($id){

});

//Submit incident
$app->post('incident', 'IncidentController@store');

//get incident photos
$app->get('incident/photos/{id}', 'IncidentController@getPhotos');

//Update incident photos
$app->put('incident/photos/{id}', 'IncidentController@updatePhotos');

//View incident photo
$app->put('photo/{name}', 'IncidentController@viewPhoto');

//Retrieves incident details
$app->get('incident/{id}', 'IncidentController@get');

//mails incident details
$app->put('incident/{id}/mail/{email}', 'IncidentController@mail');


