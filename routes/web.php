<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\ProcurementController;
use App\Http\Controllers\VendorExcelController;
use App\Http\Controllers\CategoryExcelController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::resource('vendors', VendorController::class);
    Route::resource('procurements', ProcurementController::class);

    Route::resource('roles', RoleController::class);

    Route::middleware(['role:Administrator'])->group(function () {
        Route::resource('users', UserController::class);
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/vendors/export', [VendorExcelController::class, 'export'])->name('vendors.export');
    Route::post('/vendors/import', [VendorExcelController::class, 'import'])->name('vendors.import');

    Route::post('/categories/export', [CategoryExcelController::class, 'export'])->name('categories.export');
    Route::post('/categories/import', [CategoryExcelController::class, 'import'])->name('categories.import');
});

require __DIR__ . '/auth.php';
