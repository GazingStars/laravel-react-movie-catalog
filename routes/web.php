<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AdminMovieController;

Route::get('/', [HomeController::class, 'index']);

// Каталог фильмов
Route::get('/movies', [MovieController::class, 'index'])->name('movies.index');

// Страница конкретного фильма
Route::get('/movies/{id}', [MovieController::class, 'show'])->name('movies.show');

// Регистрация
Route::get('/register', [RegisterController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::post('/register', [RegisterController::class, 'store'])
    ->middleware('guest');

// Логин
Route::get('/login', [LoginController::class, 'create'])
    ->middleware('guest')
    ->name('login');

Route::post('/login', [LoginController::class, 'store'])
    ->middleware('guest');

// Логаут
Route::post('/logout', LogoutController::class)
    ->middleware('auth')
    ->name('logout');

// Профиль пользователя
Route::get('/profile', [ProfileController::class, 'show'])
    ->middleware('auth')
    ->name('profile.show');

// Управление отзывами
Route::post('/movies/{movie}/reviews', [ReviewController::class, 'store'])
    ->middleware('auth');

Route::put('/reviews/{review}', [ReviewController::class, 'update'])
    ->middleware('auth');

Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])
    ->middleware('auth');

// Админка - управление фильмами
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/movies/create', [AdminMovieController::class, 'create']);
    Route::post('/admin/movies', [AdminMovieController::class, 'store']);
    Route::get('/admin/movies/{movie}/edit', [AdminMovieController::class, 'edit']);
    Route::put('/admin/movies/{movie}', [AdminMovieController::class, 'update']);
    Route::delete('/admin/movies/{movie}', [AdminMovieController::class, 'destroy']);
});
