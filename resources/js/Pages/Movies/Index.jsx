import { Link, usePage, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout.jsx";

function formatRating(r) {
    const n = Number(r ?? 0);
    return Number.isFinite(n) ? n.toFixed(1) : String(r ?? "0.0");
}

function Pagination({ links }) {
    if (!links || links.length <= 1) return null;

    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {links.map((link, idx) => {
                const disabled = link.url === null;
                const active = link.active;

                const label = link.label
                    .replaceAll("&laquo;", "«")
                    .replaceAll("&raquo;", "»");

                return (
                    <Link
                        key={idx}
                        href={link.url || ""}
                        preserveScroll
                        className={[
                            "rounded-lg border px-3 py-2 text-sm transition",
                            active
                                ? "bg-zinc-800 border-zinc-700 text-white"
                                : "bg-zinc-950 border-zinc-800 text-gray-300 hover:bg-zinc-900 hover:text-white",
                            disabled ? "pointer-events-none opacity-50" : "",
                        ].join(" ")}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}

export default function Index({ movies }) {
    const { auth } = usePage().props;

    function onDelete(movieId) {
        if (!confirm("Delete this movie?")) return;
        router.delete(`/admin/movies/${movieId}`, { preserveScroll: true });
    }

    const list = movies?.data ?? [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Movies Catalog</h1>
                    <p className="mt-1 text-sm text-gray-400">
                        {movies?.total ?? list.length} movie
                        {(movies?.total ?? list.length) === 1 ? "" : "s"}
                    </p>
                </div>

                {auth.user?.is_admin && (
                    <Link
                        href="/admin/movies/create"
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition"
                    >
                        Add movie
                    </Link>
                )}
            </div>

            {/* Empty */}
            {list.length === 0 && (
                <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-8 text-center shadow">
                    <div className="text-xl font-semibold">No movies yet</div>
                    <p className="mt-2 text-sm text-gray-400">
                        Add your first movie to start the catalog.
                    </p>

                    {auth.user?.is_admin && (
                        <Link
                            href="/admin/movies/create"
                            className="mt-4 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition"
                        >
                            ➕ Add movie
                        </Link>
                    )}
                </div>
            )}

            {/* Grid */}
            {list.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {list.map((movie) => (
                        <div
                            key={movie.id}
                            className="group rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden shadow hover:shadow-xl hover:border-zinc-600 transition"
                        >
                            <div className="relative">
                                <Link
                                    href={`/movies/${movie.id}`}
                                    className="block"
                                >
                                    {movie.poster_path ? (
                                        <img
                                            src={`/storage/${movie.poster_path}`}
                                            alt={movie.title}
                                            className="aspect-2/3 w-full object-cover"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="aspect-[2/3] flex items-center justify-center bg-zinc-700 text-gray-300">
                                            No poster
                                        </div>
                                    )}
                                </Link>

                                <div className="absolute left-3 top-3 z-20 rounded-full border border-zinc-700 bg-zinc-950/80 px-3 py-1 text-xs text-gray-100 backdrop-blur">
                                    ⭐ {formatRating(movie.rating)}
                                </div>

                                {auth.user?.is_admin && (
                                    <div className="absolute right-3 top-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <Link
                                            href={`/admin/movies/${movie.id}/edit`}
                                            className="rounded-lg bg-blue-600/90 px-3 py-1.5 text-xs hover:bg-blue-500 transition backdrop-blur"
                                            title="Edit"
                                        >
                                            ✏️
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(movie.id)}
                                            className="rounded-lg bg-red-600/90 px-3 py-1.5 text-xs hover:bg-red-500 transition backdrop-blur"
                                            title="Delete"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold leading-snug">
                                    <Link
                                        href={`/movies/${movie.id}`}
                                        className="hover:text-blue-400 transition"
                                    >
                                        {movie.title}
                                    </Link>
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    {movie.year}
                                </p>

                                {(movie.genres ?? []).length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {movie.genres.slice(0, 3).map((g) => (
                                            <span
                                                key={g.id}
                                                className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-gray-200"
                                            >
                                                {g.name}
                                            </span>
                                        ))}
                                        {movie.genres.length > 3 && (
                                            <span className="text-xs text-gray-400 px-2 py-1">
                                                +{movie.genres.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <Pagination links={movies?.links} />

            {/* Meta */}
            {movies?.from != null && movies?.to != null && (
                <div className="text-center text-xs text-gray-500">
                    Showing {movies.from}–{movies.to} of {movies.total}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <AppLayout>{page}</AppLayout>;
