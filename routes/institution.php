<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\TeacherController;

// Route::get('/institutions', [InstitutionController::class, 'index'])->name('institutions.index');
// Route::get('/institutions/create', [InstitutionController::class, 'create'])->name('institutions.create');
// Route::post('/institutions', [InstitutionController::class, 'store'])->name('institutions.store');
// Route::get('/institutions/{id}', [InstitutionController::class, 'show'])->name('institutions.show');
// Route::patch('/institutions/{id}', [InstitutionController::class, 'update'])->name('institutions.update');
// Route::delete('/institutions/{id}', [InstitutionController::class, 'destroy'])->name('institutions.destroy');



Route::resource('institutions', InstitutionController::class)->except(['edit']);
Route::resource('teachers', TeacherController::class)->except(['create', 'edit']);


