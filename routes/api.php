<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ImportController;
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

Route::prefix('product')->name('product.')->group(function () {
    Route::get('', [ProductController::class, 'index'])->name('list');
    Route::get('import', [ImportController::class, 'index'])->name('import');
    Route::post('create', [ProductController::class, 'create'])->name('create');
    Route::post('update', [ProductController::class, 'update'])->name('update');
    Route::delete('delete/{id}', [ProductController::class, 'delete'])->name('delete');
});
