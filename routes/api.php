<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParentsController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource('parents', ParentsController::class)->middleware(['auth:sanctum', 'ability:admin,student']);

require __DIR__.'/auth.php';