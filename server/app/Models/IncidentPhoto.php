<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentPhoto extends Model
{
    protected $guarded = [];

    protected $table = 'IncidentPhoto';

    public function incident(){
    	return $this->belongsTo('App\Models\Incident', 'incident_id');
    }
}
