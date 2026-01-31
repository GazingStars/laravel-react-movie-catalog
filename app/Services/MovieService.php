<?php

namespace App\Services;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MovieService
{
    /**
     * Получить все фильмы (для каталога)
     */
    public function getAll(): Collection
    {
        return Movie::query()
            ->with('genres')
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Получить фильмы с пагинацией (для каталога)
     */
    public function getAllPaginated(int $perPage = 12): LengthAwarePaginator
    {
        return Movie::query()
            ->with('genres')
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->appends(request()->query());
    }

    /**
     * Получить топ фильмов по рейтингу
     */
    public function getTopRated(int $limit = 10): Collection
    {
        return Movie::query()
            ->with('genres')
            ->orderByDesc('rating')
            ->limit($limit)
            ->get();
    }

    /**
     * Получить фильм по ID (для страницы фильма)
     */
    public function getById(int $id): Movie
    {
        return Movie::query()
            ->with([
                'genres',
                'reviews.user',
            ])
            ->findOrFail($id);
    }

    /**
     * Создать новый фильм
     */
    public function create(array $data, ?UploadedFile $poster): Movie
    {
        if ($poster) {
            $data['poster_path'] = $poster->store('posters', 'public');
        }

        $movie = Movie::create([
            'title'       => $data['title'],
            'year'        => $data['year'],
            'description' => $data['description'] ?? null,
            'poster_path' => $data['poster_path'] ?? null,
            'rating'      => 0,
        ]);

        if (!empty($data['genres'])) {
            $movie->genres()->sync($data['genres']);
        }

        return $movie;
    }
    /**
     * Обновить существующий фильм
     */
    public function update(Movie $movie, array $data, ?UploadedFile $poster): void
    {
        if ($poster) {
            if ($movie->poster_path) {
                Storage::disk('public')->delete($movie->poster_path);
            }

            $data['poster_path'] = $poster->store('posters', 'public');
        }

        $movie->update([
            'title'       => $data['title'],
            'year'        => $data['year'],
            'description' => $data['description'] ?? null,
            'poster_path' => $data['poster_path'] ?? $movie->poster_path,
        ]);

        if (isset($data['genres'])) {
            $movie->genres()->sync($data['genres']);
        }
    }

    /**
     * Удалить фильм
     */
    public function delete(Movie $movie): void
    {
        if ($movie->poster_path) {
            Storage::disk('public')->delete($movie->poster_path);
        }

        $movie->delete();
    }
}
