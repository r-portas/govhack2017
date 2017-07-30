<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Laravel Social and Email Authentication</title>

    <meta name="description" content="Laravel 5.3 bootstrap app with Multi Auth, Social and Email Authentication. Google re-Captcha, Facebook, Twitter, G+ and much more...">
    <meta name="author" content="Ivan Radunovic">
    <link rel="shortcut icon" href="https://tuts.codingo.me/assets/img/box.png">

    <meta property="og:url" content="http://demo1.codingo.me/">
    <meta property="og:title" content="Live Demo of Laravel 5.3 app with Multi-authentication and Social logins">
    <meta property="og:description" content="Laravel 5.3 bootstrap app with Multi Auth, Social and Email Authentication. Google re-Captcha, Facebook, Twitter, G+ and much more...">
    <meta property="og:image" content="https://tuts.codingo.me/wp-content/uploads/2016/10/social-og.png">
    <meta property="og:site_name" content="Codingo Tuts">
    <meta property="og:image:type" content="image/png">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.1.1/css/mdb.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    @yield('head')

    <style>
        .form-signin {
            max-width: 330px;
            padding: 15px;
            margin: 0 auto;
        }
        .form-signin .form-signin-heading,
        .form-signin .checkbox {
            margin-bottom: 10px;
        }
        .form-signin .checkbox {
            font-weight: normal;
        }
        .form-signin .form-control {
            position: relative;
            height: auto;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            font-size: 16px;
        }
        .form-signin .form-control:focus {
            z-index: 2;
        }
        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }
        .form-signin input[type="password"] {
            margin-bottom: -1px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        .login-btn{
            margin-top:10px;
        }
        .or-social{
            text-align:center;
            margin: 10px 0 10px 0;
        }
        .facebook{
            background-color: #4863ae;
            border-color: #4863ae;
        }
        .facebook:hover{
            background-color: #2871aa;
            border-color: #2871aa;
        }
        .twitter{
            background-color: #46c0fb;
            border-color: #46c0fb;
        }
        .twitter:hover{
            background-color: #00c7fb;
            border-color: #00c7fb;
        }
        .google{
            background-color: #DD4B39;
            border-color: #DD4B39;
        }
        .google:hover{
            background-color: #e15f4f;
            border-color:#e15f4f;
        }
        .github{
            background-color: #4183C4;
            border-color: #4183C4;
        }
        .github:hover{
            background-color: #5490ca;
            border-color:#5490ca;
        }
        .margin-bottom-10{
            margin-bottom:10px;
        }
        [type=checkbox]:checked, [type=checkbox]:not(:checked) {
            position: absolute;
            left: -9999px;
            visibility: hidden;
        }
        [type=checkbox], [type=radio] {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 0;
        }
        [type=checkbox]+label {
            position: relative;
            height: 25px;
        }
        [type=checkbox]+label:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 18px;
            height: 18px;
            z-index: 0;
            border: 2px solid #5a5a5a;
            border-radius: 1px;
            margin-top: 2px;
            -webkit-transition: .2s;
            -moz-transition: .2s;
            -o-transition: .2s;
            -ms-transition: .2s;
            transition: .2s;
        }
        [type=radio]:checked+label, [type=radio]:not(:checked)+label, [type=checkbox]+label {
            -khtml-user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            cursor: pointer;
            font-size: 1rem;
            padding-left: 35px;
            display: inline-block;
            line-height: 25px;
        }
        [type=checkbox]:checked+label:before {
            top: -4px;
            left: -3px;
            width: 12px;
            height: 22px;
            border-top: 2px solid transparent;
            border-left: 2px solid transparent;
            border-right: 2px solid #4285F4;
            border-bottom: 2px solid #4285F4;
            -webkit-transform: rotate(40deg);
            -moz-transform: rotate(40deg);
            -ms-transform: rotate(40deg);
            -o-transform: rotate(40deg);
            transform: rotate(40deg);
            -webkit-backface-visibility: hidden;
            -webkit-transform-origin: 100% 100%;
            -moz-transform-origin: 100% 100%;
            -ms-transform-origin: 100% 100%;
            -o-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
        }
        [type=checkbox]+label:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 18px;
            height: 18px;
            z-index: 0;
            border: 2px solid #5a5a5a;
            border-radius: 1px;
            margin-top: 2px;
            -webkit-transition: .2s;
            -moz-transition: .2s;
            -o-transition: .2s;
            -ms-transition: .2s;
            transition: .2s;
        }
        .error-text{
            color: #F44336;
            transition: .2s opacity ease-out,.2s color ease-out;
        }
    </style>

</head>

<body>

<!--Navigation-->
<header>

<!--Navbar-->
    <nav class="navbar navbar-dark scrolling-navbar mdb-gradient">

        <!-- Collapse button-->
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapseEx">
            <i class="fa fa-bars"></i></button>

        <div class="container">

            <!--Collapse content-->
            <div class="collapse navbar-toggleable-xs" id="collapseEx">

                

                <!--Navbar icons-->
                <ul class="nav navbar-nav nav-flex-icons">
                    <li class="nav-item">
                        <a href="https://www.facebook.com/codingo.me/" class="nav-link"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li class="nav-item">
                        <a href="https://twitter.com/codingo_me" class="nav-link"><i class="fa fa-twitter"></i></a>
                    </li>
                    <li class="nav-item">
                        <a href="https://plus.google.com/u/2/b/109783202683475265470/collection/wwmLx" class="nav-link"><i class="fa fa-google-plus"></i></a>
                    </li>
                    <li class="nav-item">
                        <a href="https://github.com/codingo-me" class="nav-link"><i class="fa fa-github"></i></a>
                    </li>
                </ul>

            </div>
            <!--/.Collapse content-->

        </div>

    </nav>
    <!--/.Navbar-->


</header>
<!--/Navigation-->

<main>
<div class="container">

    <div style="height: 90px;"></div>
    @yield('content')

</div> <!-- /container -->
</main>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.3/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.1.1/js/mdb.min.js"></script>

@yield('footer')
</body>
</html>