<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InstitutionController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/institutions', [InstitutionController::class, 'index'])->name('institutions.index');
Route::get('/institutions/create', [InstitutionController::class, 'create'])->name('institutions.create');
Route::post('/institutions', [InstitutionController::class, 'store'])->name('institutions.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
