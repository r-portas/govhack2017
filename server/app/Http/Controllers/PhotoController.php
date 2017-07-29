<?php 

namespace App\Http\Controllers;
 
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use app/Models/IncidentPhoto;
 
use Request;
 
class PhotoController extends BaseController
{
    public function savePhoto($incidentID){
        $photo = Request::file('photo');
        $photoName = $incidentID.'_'.$photo->getClientOriginalName();
        IncidentPhoto::create([
            'incident_id'=>$incidentID,
            'file_id'=>$photoName
        ]);
        Storage::put($photoName,  File::get($photo));
 
        return response()->json('success');
    }

    public function getPhotos($incidentID){
        $photos = [];
        $photoModels = IncidentPhoto::where('incident_id', $incidentID)->get();
        foreach($photoModels as $photoModel){
            $photos = Storage::get($photoModel->file_id);
        }

        return response()->json($photos);
    }
 
}