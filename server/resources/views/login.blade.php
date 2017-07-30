@extends('main')

@section('head')

    <link rel="stylesheet" href="/assets/css/signin.css">

@stop

@section('content')


    <form>

        <h2 class="form-signin-heading">Please sign in</h2>

        <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <a href="{{ route('social.redirect', ['provider' => 'google']) }}" class="btn btn-lg waves-effect waves-light btn-block google">Google+</a>
            </div>
        </div>

    </form>

@stop