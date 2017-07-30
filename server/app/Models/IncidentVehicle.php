<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentVehicle extends Model
{
    protected $guarded = [];

    protected $table = 'IncidentVehicle';

    public function incident(){
    	return $this->belongsTo('App\Models\Incident', 'incident_id');
    }
}
