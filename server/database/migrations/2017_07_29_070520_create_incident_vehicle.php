<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentVehicle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('IncidentVehicle', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('incident_id');
            $table->boolean('owned_by_reporter');
            $table->string('registration');
            $table->string('licence_plate');
            $table->string('model');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('IncidentVehicle');
    }
}
