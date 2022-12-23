
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>{{ config('app.name') }}</title>

    <link href="https://fonts.googleapis.com/css?family=Archivo:100,400,600,700,800" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="{{ mix('dist/css/app.css') }}">
    <link rel="icon" href="{{asset('favicon.ico')}}">
  </head>
  
  <body>
    <div id="app"></div>

    {{-- Load the application scripts --}}
    <script src="{{ mix('dist/js/app.js') }}"></script>
  </body>
</html>