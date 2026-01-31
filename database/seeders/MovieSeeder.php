<?php

namespace Database\Seeders;

use App\Models\Movie;
use App\Models\Genre;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{
    public function run(): void
    {
        $movies = [
            [
                'title' => 'Inception',
                'year' => 2010,
                'poster' => 'posters/inception.jpg',
                'genres' => ['Sci-Fi', 'Action', 'Thriller'],
            ],
            [
                'title' => 'Interstellar',
                'year' => 2014,
                'poster' => 'posters/interstellar.jpg',
                'genres' => ['Sci-Fi', 'Drama'],
            ],
            [
                'title' => 'The Matrix',
                'year' => 1999,
                'poster' => 'posters/matrix.jpg',
                'genres' => ['Sci-Fi', 'Action'],
            ],
            [
                'title' => 'The Dark Knight',
                'year' => 2008,
                'poster' => 'posters/dark_knight.jpg',
                'genres' => ['Action', 'Drama', 'Thriller'],
            ],
        ];

        foreach ($movies as $data) {
            $movie = Movie::create([
                'title' => $data['title'],
                'year' => $data['year'],
                'rating' => 0,
                'poster_path' => $data['poster'],
            ]);

            $genreIds = Genre::whereIn('name', $data['genres'])
                ->pluck('id');

            $movie->genres()->sync($genreIds);
        }
    }
}
