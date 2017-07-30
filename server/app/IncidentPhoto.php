<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentPhoto extends Model
{
    protected $guarded = [];

    protected $table = 'IncidentPhoto';

    public function incident(){
    	return $this->belongsTo('App\Incident', 'incident_id');
    }
}
