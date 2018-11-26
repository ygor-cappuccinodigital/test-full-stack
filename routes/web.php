<?php

Route::get('/', function() {
    View::addExtension('html', 'php');
    return View::make('index');
});

Route::any('{all}', function() {
    View::addExtension('html', 'php');
    return View::make('index');
})->where('all', '.*');