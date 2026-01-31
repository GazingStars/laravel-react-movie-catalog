<?php

namespace App\Http\Controllers;

use App\Services\MovieService;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    public function __construct(
        private readonly MovieService $movieService
    ) {}

    /**
     * Список фильмов
     */
    public function index(): Response
    {
        $movies = $this->movieService->getAllPaginated(12);

        return Inertia::render('Movies/Index', [
            'movies' => $movies,
        ]);
    }

    /**
     * Страница одного фильма
     */
    public function show(int $id): Response
    {
        $movie = $this->movieService->getById($id);

        return Inertia::render('Movies/Show', [
            'movie' => $movie,
        ]);
    }
}
