<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WordItemController;
use App\Http\Controllers\WordListController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// public routes
Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);
Route::get("/validate_token", [AuthController::class, "validate_token"]);

Route::group(["middleware" => ["auth:sanctum"]], function()  {
    Route::resource("/word_list", WordListController::class);
    Route::resource("/word_item", WordItemController::class);
    Route::post("/logout", [AuthController::class, "logout"]);
});



// Route::get("/word_item/{id}", [WordItemController::class, "show"])->where("id", "[0-9]+");