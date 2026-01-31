<?php

namespace App\Http\Controllers;

use App\Http\Requests\Review\StoreReviewRequest;
use App\Http\Requests\Review\UpdateReviewRequest;
use App\Models\Movie;
use App\Models\Review;
use App\Services\ReviewService;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request, Movie $movie, ReviewService $reviewService)
    {
        $data = $request->validated();

        $reviewService->create(
            movie: $movie,
            userId: Auth::id(),
            score: (int) $data['score'],
            content: $data['content'] ?? null
        );

        return back();
    }

    public function update(UpdateReviewRequest $request, Review $review, ReviewService $reviewService)
    {
        $this->authorize('update', $review);

        $data = $request->validated();

        $reviewService->update(
            review: $review,
            score: (int) $data['score'],
            content: $data['content'] ?? null
        );

        return back();
    }

    public function destroy(Review $review, ReviewService $reviewService)
    {
        $this->authorize('delete', $review);

        $reviewService->delete($review);

        return back();
    }
}
