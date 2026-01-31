<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('movie_genre', 'genre_movie');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('genre_movie', 'movie_genre');
    }
};
