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
$app->post('users/login', 'UserController@login');
$app->post('users/register', 'UserController@register');
$app->get('users/info', [
	'middleware' => 'authToken',
	'uses' => 'UserController@info'
]);

//Submit incident
$app->post('incident', [
	'middleware' => 'authToken',
	'uses' => 'IncidentController@store'
]);

//get incident photos
$app->get('incident/photos/{id}', [
	'middleware' => 'authToken',
	'uses' => 'IncidentController@getPhotos'
]);

//Update incident photos
$app->put('incident/photos/{id}', [
	'middleware' => 'authToken',
	'uses' => 'IncidentController@updatePhotos'
]);

//View incident photo
$app->put('photo/{name}', [
	'middleware' => 'authToken',
	'uses' => 'IncidentController@viewPhoto'
]);

//Retrieves incident details
$app->get('incident', [
	'middleware' => 'authToken',
	'uses' => 'IncidentController@get'
]);

//mails incident details
$app->put('incident/{id}/mail/{email}', [
	'middleware' => 'authToken',
	'uses' => 'IncidentController@mail'
]);


