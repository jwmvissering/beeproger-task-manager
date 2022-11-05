<?php

use App\Http\Controllers\Api\TodoItems\TodoItemsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('todoItems', TodoItemsController::class);
Route::patch('todoItems/markAsComplete/{todoItem}', [TodoItemsController::class, 'markAsComplete']);
Route::patch('todoItems/markAsIncomplete/{todoItem}', [TodoItemsController::class, 'markAsIncomplete']);
Route::post('todoItems/saveItemOrder', [TodoItemsController::class, 'saveItemOrder']);
