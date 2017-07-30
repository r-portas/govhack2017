<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;
use App\Incident;
use App\IncidentPhoto;
use App\IncidentVehicle;
use App\IncidentWitness;

class IncidentController extends Controller
{
	public function store(Request $request){
		//user id somehow
		$userID = 1;
		$incident = Incident::create([
			'user_id'=>$userID,
			'description'=>$request->description,
			'location'=>$location,
			'damage'=>$damage
		]);

		$this->savePhotos($request->photos, $incident->id);

		foreach($request->vehicles as $vehicle){
			IncidentVehicle::create([
				'incident_id'=>$incident->id,
				'owned_by_reporter'=>$vehicle->owned_by_reporter,
				'registration'=>$vehicle->registration,
				'licence_plate'=>$vehicle->licence_plate,
				'model'=>$vehicle->model,
				'first_name'=>$vehicle->first_name,
				'last_name'=>$vehicle->last_name,
				'phone'=>$vehicle->phone
			]);
		}

		foreach($request->witnesses as $witness){
			IncidentWitness::create([
				'incident_id'=>$incident->id,
				'first_name'=>$witness->first_name,
				'last_name'=>$witness->last_name,
				'phone'=>$witness->phone,
				'relation_to_event'=>$witness->relation_to_event
			]);
		}

		return response()->json('success');
	}

	public function get($id){
		$incident = Incident::with([
			'photos',
			'vehicles',
			'witnesses'
		])->find($id);

		if($incident){
			$incident->photos = $this->photosToLinks($incident->photos);

			return response()->json($incident);
		}
		else{
			return response()->json([
		        'message' => 'Record not found',
		    ], 404);
		}

		return response()->json($incident);
	}

	public function getPhotos($id){
        $photoModels = IncidentPhoto::where('incident_id', $id)->get();
        return response()->json($this->photosToLinks($photoModels));
	}

	public function updatePhotos(Request $request, $id){
		$existingPhotos = IncidentPhoto::where('incident_id', $incidentID)->get();
		foreach($existingPhotos as $existingPhoto){
			Storage::delete($existingPhoto->file_id);
			$existingPhoto->delete();
		} 

		$this->savePhotos($request->photos, $id);
 
        return response()->json('success');
	}

	public function mail($id, $email){
		//To do
	}

	public function viewPhoto($name){
 
        return response()->make(Storage::get($name), 200, [
            'Content-Type' => Storage::mimeType($name),
            'Content-Disposition' => 'inline; '.$name,
        ]);
 
    }

    protected function savePhotos($photos, $incidentID){
    	foreach($photos as $photo){
			$photoName = $incidentID.'_'.$photo->getClientOriginalName();
	        IncidentPhoto::create([
	            'incident_id'=>$incidentID,
	            'file_id'=>$photoName
	        ]);
	        Storage::put($photoName,  File::get($photo));
		}
    }

    protected function photosToLinks($photoModels){
    	$photos = [];
        foreach($photoModels as $photoModel){
        	$photos[] = action('IncidentController@viewPhoto', $photoModel->file_id);
        }

        return $photos;
    }
}