import AppLayout from "@/Layouts/AppLayout";
import { useForm, usePage, router } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

export default function Show({ movie }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const myReview = useMemo(() => {
        if (!user) return null;
        return movie.reviews.find((r) => r.user_id === user.id) || null;
    }, [movie.reviews, user]);

    const [editing, setEditing] = useState(false);

    const createForm = useForm({
        score: 5,
        content: "",
    });

    const editForm = useForm({
        score: myReview?.score ?? 5,
        content: myReview?.content ?? "",
    });

    useEffect(() => {
        editForm.setData({
            score: myReview?.score ?? 5,
            content: myReview?.content ?? "",
        });
    }, [myReview?.id]);

    function submitCreate(e) {
        e.preventDefault();
        createForm.post(`/movies/${movie.id}/reviews`, {
            preserveScroll: true,
            onSuccess: () => createForm.reset("content"),
        });
    }

    function submitEdit(e) {
        e.preventDefault();
        editForm.put(`/reviews/${myReview.id}`, {
            preserveScroll: true,
            onSuccess: () => setEditing(false),
        });
    }

    function deleteReview() {
        if (!confirm("Delete your review?")) return;
        router.delete(`/reviews/${myReview.id}`, {
            preserveScroll: true,
            onSuccess: () => setEditing(false),
        });
    }

    return (
        <div className="space-y-10">
            {/* HERO */}
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 rounded-2xl bg-zinc-800 overflow-hidden shadow">
                {/* Poster */}
                <div className="bg-zinc-700">
                    {movie.poster_path ? (
                        <img
                            src={`/storage/${movie.poster_path}`}
                            alt={movie.title}
                            className="aspect-[2/3] w-full object-cover"
                        />
                    ) : (
                        <div className="aspect-[2/3] w-full flex items-center justify-center text-gray-300">
                            No poster
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>

                    <div className="mt-2 text-sm text-gray-300 flex flex-wrap gap-x-4 gap-y-1">
                        <span>⭐ {movie.rating}</span>
                        <span> {movie.year}</span>
                        {movie.genres?.length > 0 && (
                            <span className="text-gray-400">
                                {movie.genres.map((g) => g.name).join(", ")}
                            </span>
                        )}
                    </div>

                    {movie.description ? (
                        <p className="mt-4 text-gray-200 leading-relaxed whitespace-pre-line">
                            {movie.description}
                        </p>
                    ) : (
                        <p className="mt-4 text-gray-400">
                            No description yet.
                        </p>
                    )}
                </div>
            </div>

            {/* REVIEWS */}
            <div className="rounded-2xl bg-zinc-800 p-6 shadow">
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>

                {movie.reviews.length === 0 && (
                    <p className="text-gray-400">No reviews yet</p>
                )}

                <div className="space-y-4">
                    {movie.reviews.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-xl bg-zinc-900/40 p-4 border border-zinc-700"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <strong className="text-gray-100">
                                    {r.user?.name ?? "Unknown"}
                                </strong>
                                <span className="text-sm text-gray-300">
                                    Score: {r.score}
                                </span>
                            </div>
                            {r.content && (
                                <p className="mt-2 text-gray-200 whitespace-pre-line">
                                    {r.content}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* ADD REVIEW */}
                {user && !myReview && (
                    <form onSubmit={submitCreate} className="mt-8 space-y-3">
                        <h3 className="text-lg font-semibold">Add review</h3>

                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-300">
                                Score
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={createForm.data.score}
                                onChange={(e) =>
                                    createForm.setData(
                                        "score",
                                        Number(e.target.value)
                                    )
                                }
                                className="w-20 rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-gray-100"
                            />
                        </div>
                        {createForm.errors.score && (
                            <div className="text-sm text-red-400">
                                {createForm.errors.score}
                            </div>
                        )}

                        <textarea
                            placeholder="Your review"
                            value={createForm.data.content}
                            onChange={(e) =>
                                createForm.setData("content", e.target.value)
                            }
                            className="w-full min-h-[110px] rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-gray-100"
                        />
                        {createForm.errors.content && (
                            <div className="text-sm text-red-400">
                                {createForm.errors.content}
                            </div>
                        )}

                        <button
                            disabled={createForm.processing}
                            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition disabled:opacity-60"
                        >
                            Submit
                        </button>
                    </form>
                )}

                {/* MY REVIEW */}
                {user && myReview && (
                    <div className="mt-8 rounded-xl border border-zinc-700 p-4">
                        <h3 className="text-lg font-semibold mb-3">
                            Your review
                        </h3>

                        {!editing ? (
                            <>
                                <p className="text-gray-200">
                                    <strong>Score:</strong> {myReview.score}
                                </p>
                                {myReview.content && (
                                    <p className="mt-2 text-gray-200 whitespace-pre-line">
                                        {myReview.content}
                                    </p>
                                )}

                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500 transition"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={deleteReview}
                                        className="rounded-md bg-red-600 px-4 py-2 text-sm hover:bg-red-500 transition"
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={submitEdit} className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <label className="text-sm text-gray-300">
                                        Score
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={editForm.data.score}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "score",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-20 rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-gray-100"
                                    />
                                </div>
                                {editForm.errors.score && (
                                    <div className="text-sm text-red-400">
                                        {editForm.errors.score}
                                    </div>
                                )}

                                <textarea
                                    value={editForm.data.content}
                                    onChange={(e) =>
                                        editForm.setData(
                                            "content",
                                            e.target.value
                                        )
                                    }
                                    className="w-full min-h-[110px] rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-gray-100"
                                />
                                {editForm.errors.content && (
                                    <div className="text-sm text-red-400">
                                        {editForm.errors.content}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <button
                                        disabled={editForm.processing}
                                        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition disabled:opacity-60"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="rounded-md bg-zinc-700 px-4 py-2 text-sm hover:bg-zinc-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

Show.layout = (page) => <AppLayout>{page}</AppLayout>;
