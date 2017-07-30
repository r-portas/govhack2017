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

$app->post('users/login', 'UserController@login');
$app->post('users/register', 'UserController@register');
$app->get('users/info', [
	'middleware' => 'authToken',
	'uses' => 'UserController@info'
]);

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


