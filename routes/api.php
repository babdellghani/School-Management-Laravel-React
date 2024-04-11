<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParentsController;

Route::middleware(['auth:sanctum,admin,teacher,parent'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('parents', ParentsController::class);

require __DIR__.'/auth.php';