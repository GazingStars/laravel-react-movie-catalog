<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Movie\StoreMovieRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Genre;
use App\Models\Movie;
use App\Services\MovieService;
use Inertia\Inertia;
use Inertia\Response;

class AdminMovieController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Admin/Movies/Create', [
            'genres' => Genre::all(),
        ]);
    }

    public function store(StoreMovieRequest $request, MovieService $movieService)
    {
        $movieService->create(
            data: $request->validated(),
            poster: $request->file('poster')
        );

        return redirect('/movies');
    }

    public function edit(Movie $movie): Response
    {
        return Inertia::render('Admin/Movies/Edit', [
            'movie'  => $movie->load('genres'),
            'genres' => Genre::all(),
        ]);
    }

    public function update(
        StoreMovieRequest $request,
        Movie $movie,
        MovieService $movieService
    ): RedirectResponse {
        $movieService->update(
            movie: $movie,
            data: $request->validated(),
            poster: $request->file('poster')
        );

        return redirect('/movies');
    }

    public function destroy(Movie $movie, MovieService $movieService): RedirectResponse
    {
        $movieService->delete($movie);

        return redirect('/movies');
    }
}
