@extends('main')

@section('head')

    <link rel="stylesheet" href="/assets/css/signin.css">

@stop

@section('content')


    <form>

        <h2 class="form-signin-heading">Please sign in</h2>

        <label for="inputEmail" class="sr-only">Email address</label>
        <input class="form-control" placeholder="Email address" id="inputEmail">

        <label for="inputPassword" class="sr-only">Password</label>
        {!! Form::password('password', [
            'class'                         => 'form-control',
            'placeholder'                   => 'Password',
            'required',
            'id'                            => 'inputPassword'
        ]) !!}
        <input type="password" class="form-control" placeholder="Password" id="inputPassword">

        <div style="height:15px;"></div>
        <div class="row">
            <div class="col-md-12">
                <fieldset class="form-group">
                    <input type="checkbox" id="remember-me">
                    <label for="remember-me">Remember me</label>
                </fieldset>
            </div>
        </div>

        <button class="btn btn-lg btn-primary btn-block login-btn" type="submit">Sign in</button>
        <p><a href="{{ url('#') }}">Forgot password?</a></p>

        <p class="or-social">Or Use Social Login</p>

        <div class="row margin-bottom-10">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <a href="#" class="btn btn-lg waves-effect waves-light  btn-block facebook">Facebook</a>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <a href="#" class="btn btn-lg  waves-effect waves-light btn-block twitter">Twitter</a>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <a href="#" class="btn btn-lg waves-effect waves-light btn-block google">Google+</a>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <a href="#" class="btn btn-lg waves-effect waves-light btn-block github">GitHub</a>
            </div>
        </div>

    </form>

@stop