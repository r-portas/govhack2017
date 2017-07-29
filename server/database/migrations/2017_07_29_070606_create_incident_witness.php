<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentWitness extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('IncidentWitness', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('incident_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('relation_to_event');
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
        Schema::dropIfExists('IncidentWitness');
    }
}
