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

$app->get('/', function () use ($app) {
    return $app->version();
});

//Sign up user
$app->post('user', function(){
	//
});

//Update user info
$app->put('user/{id}', function($id){

});

//Retrieves user details
$app->get('user/{id}', function($id){

});

//Submit incident
$app->post('incident', function(){

});

//Update incident photos
$app->put('incident/{id}/photos', function($id){

});

//Retrieves incident details
$app->get('incident', function(){

});

//mails incident details
$app->put('incident/{id}/mail', function($id){

});


