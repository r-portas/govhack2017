<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;
use App\Models\Incident;
use App\Models\IncidentPhoto;

class IncidentController extends Controller
{
	public function store(Request $request){

	}

	public function get($id){
		$incident = Incident::find($id)
			->with('photos')
			->with('vehicles')
			->with('witnesses');

		$incident->photos = $this->photosToLinks($incident->photos);

		if($incident){
			return response()->json($incident);
		}
		else{
			return response()->toJson([
		        'message' => 'Record not found',
		    ], 404);
		}

		return response()->json($incident);
	}

	public function getPhotos($id){
        $photoModels = IncidentPhoto::where('incident_id', $incidentID)->get();
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

	public function mailIncident($id){
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