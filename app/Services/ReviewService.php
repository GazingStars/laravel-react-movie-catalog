<?php

namespace App\Services;

use App\Models\Movie;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class ReviewService
{
    public function create(Movie $movie, int $userId, int $score, ?string $content): void
    {
        DB::transaction(function () use ($movie, $userId, $score, $content) {
            Review::create([
                'movie_id' => $movie->id,
                'user_id'  => $userId,
                'score'    => $score,
                'content'  => $content,
            ]);

            $this->recalculateRating($movie);
        });
    }

    public function update(Review $review, int $score, ?string $content): void
    {
        DB::transaction(function () use ($review, $score, $content) {
            $review->update([
                'score' => $score,
                'content' => $content,
            ]);

            $this->recalculateRating($review->movie);
        });
    }

    public function delete(Review $review): void
    {
        DB::transaction(function () use ($review) {
            $movie = $review->movie;
            $review->delete();

            $this->recalculateRating($movie);
        });
    }

    private function recalculateRating(Movie $movie): void
    {
        $avg = $movie->reviews()->avg('score') ?? 0;

        $movie->update([
            'rating' => round($avg, 1),
        ]);
    }

    public function getUserReviews(User $user): Collection
    {
        return $user->reviews()
            ->with('movie')
            ->orderByDesc('created_at')
            ->get();
    }
}
