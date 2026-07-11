<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProcurementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Landing Page (Public) - Tidak perlu login
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Route yang butuh Login (Middleware 'auth')
Route::middleware(['auth', 'verified'])->group(function () {

    // 2. Dashboard - Role apapun yang login boleh akses
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // 3. Role Management - Semua user login boleh akses
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');

    // 4. User Management - HANYA Administrator yang boleh akses
    Route::middleware(['role:Administrator'])->group(function () {
        Route::resource('users', UserController::class);
    });

    // Bawaan Breeze
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/procurements/create', [ProcurementController::class, 'create'])->name('procurements.create');
    Route::post('/procurements', [ProcurementController::class, 'store'])->name('procurements.store');
});

require __DIR__ . '/auth.php';
