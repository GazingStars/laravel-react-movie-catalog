import AppLayout from "@/Layouts/AppLayout";
import { Link, usePage } from "@inertiajs/react";

function initials(name = "") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    const a = parts[0]?.[0] ?? "";
    const b = parts[1]?.[0] ?? "";
    return (a + b).toUpperCase();
}

export default function Profile({ reviews }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const totalReviews = reviews?.length ?? 0;
    const avgScore =
        totalReviews > 0
            ? (
                  reviews.reduce((sum, r) => sum + Number(r.score || 0), 0) /
                  totalReviews
              ).toFixed(1)
            : null;

    return (
        <div className="space-y-10">
            {/* Header / Hero */}
            <div className="rounded-3xl bg-zinc-800 border border-zinc-700 shadow overflow-hidden">
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xl font-bold">
                        {initials(user?.name)}
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold">Profile</h1>

                            {user?.is_admin && (
                                <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200">
                                    Admin
                                </span>
                            )}
                        </div>

                        <p className="mt-2 text-gray-300 flex-column">
                            <span className="text-gray-400">Name:</span>{" "}
                            {user.name}
                            <span className="mx-2 text-gray-600">•</span>
                            <span className="text-gray-400">Email:</span>{" "}
                            {user.email}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-sm text-gray-200">
                                Reviews:{" "}
                                <span className="ml-2 font-semibold">
                                    {totalReviews}
                                </span>
                            </span>

                            <span className="inline-flex items-center rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-sm text-gray-200">
                                ⭐ Avg score:{" "}
                                <span className="ml-2 font-semibold">
                                    {avgScore ?? "—"}
                                </span>
                            </span>

                            <Link
                                href="/movies"
                                className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-500 transition"
                            >
                                Go to catalog
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-700 bg-zinc-900/40 px-6 py-4 text-sm text-gray-300">
                    Tip: click a movie title below to jump straight to your
                    review.
                </div>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl bg-zinc-800 border border-zinc-700 shadow p-6">
                <div className="flex items-center justify-between gap-4 mb-5">
                    <h2 className="text-xl font-semibold">My reviews</h2>
                    <div className="text-sm text-gray-400">
                        {totalReviews > 0
                            ? `${totalReviews} total`
                            : "No reviews yet"}
                    </div>
                </div>

                {totalReviews === 0 && (
                    <div className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-6 text-gray-300">
                        <p className="text-gray-200 font-medium">
                            You haven't written any reviews yet.
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            Go to the catalog and leave your first one 🙂
                        </p>
                        <Link
                            href="/movies"
                            className="mt-4 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition"
                        >
                            Browse movies
                        </Link>
                    </div>
                )}

                {totalReviews > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="rounded-xl border border-zinc-700 bg-zinc-900/40 p-5 hover:bg-zinc-900/60 transition"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-lg font-semibold">
                                        <Link
                                            href={`/movies/${review.movie.id}`}
                                            className="hover:text-blue-400 transition"
                                        >
                                            {review.movie.title}
                                        </Link>
                                    </h3>

                                    <span className="shrink-0 inline-flex items-center rounded-lg bg-zinc-950 border border-zinc-700 px-2.5 py-1 text-sm">
                                        ⭐ {review.score}
                                    </span>
                                </div>

                                {review.content ? (
                                    <p className="mt-3 text-gray-200 whitespace-pre-line">
                                        {review.content}
                                    </p>
                                ) : (
                                    <p className="mt-3 text-gray-400 text-sm">
                                        No text review.
                                    </p>
                                )}

                                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                                    <span>
                                        Posted on{" "}
                                        {new Date(
                                            review.created_at
                                        ).toLocaleDateString()}
                                    </span>

                                    <Link
                                        href={`/movies/${review.movie.id}`}
                                        className="text-gray-300 hover:text-white transition"
                                    >
                                        Open movie →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

Profile.layout = (page) => <AppLayout>{page}</AppLayout>;
