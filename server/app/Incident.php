<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $guarded = [];

    protected $table = 'Incident';

    public function user(){
        return $this->belongsTo('App\User','user_id');
    }

    public function photos(){
        return $this->hasMany('App\IncidentPhoto', 'incident_id');
    }

    public function witnesses(){
        return $this->hasMany('App\IncidentWitness', 'incident_id');
    }

    public function vehicles(){
        return $this->hasMany('App\IncidentVehicle', 'incident_id');
    }
}
