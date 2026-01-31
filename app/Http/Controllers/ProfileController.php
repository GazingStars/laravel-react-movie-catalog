<?php

namespace App\Http\Controllers;

use App\Services\ReviewService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(ReviewService $reviewService): Response
    {
        $user = Auth::user();

        $reviews = $reviewService->getUserReviews($user);

        return Inertia::render('Profile/Show', [
            'reviews' => $reviews,
        ]);
    }
}
