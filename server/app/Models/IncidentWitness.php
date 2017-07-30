<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentWitness extends Model
{
    protected $guarded = [];

    protected $table = 'IncidentWitness';

    public function incident(){
    	return $this->belongsTo('App\Models\Incident', 'incident_id');
    }
}
