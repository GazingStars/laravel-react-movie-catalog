import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function GenrePicker({ genres, value, onChange, error }) {
    const [q, setQ] = useState("");

    const selected = useMemo(() => new Set((value ?? []).map(String)), [value]);

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return genres;
        return genres.filter((g) => g.name.toLowerCase().includes(query));
    }, [q, genres]);

    function toggle(id) {
        const sid = String(id);
        const next = new Set(selected);
        if (next.has(sid)) next.delete(sid);
        else next.add(sid);
        onChange(Array.from(next));
    }

    function clearAll() {
        onChange([]);
    }

    function selectAllFiltered() {
        const next = new Set(selected);
        filtered.forEach((g) => next.add(String(g.id)));
        onChange(Array.from(next));
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <label className="text-sm text-gray-300">Genres</label>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={selectAllFiltered}
                        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs hover:bg-zinc-800 transition"
                    >
                        Select filtered
                    </button>
                    <button
                        type="button"
                        onClick={clearAll}
                        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs hover:bg-zinc-800 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search genres..."
                className="mt-2 w-full rounded-lg bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-gray-100 outline-none focus:border-blue-500/70"
            />

            <div
                className={cn(
                    "mt-3 rounded-xl border bg-zinc-950/60 p-3",
                    error ? "border-red-500/70" : "border-zinc-700"
                )}
            >
                {filtered.length === 0 ? (
                    <div className="text-sm text-gray-400 px-1 py-2">
                        No genres found.
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {filtered.map((g) => {
                            const active = selected.has(String(g.id));
                            return (
                                <button
                                    key={g.id}
                                    type="button"
                                    onClick={() => toggle(g.id)}
                                    aria-pressed={active}
                                    className={cn(
                                        "rounded-full px-3 py-1 text-xs border transition",
                                        active
                                            ? "bg-blue-600 border-blue-500/60 text-white"
                                            : "bg-zinc-900 border-zinc-700 text-gray-200 hover:bg-zinc-800"
                                    )}
                                    title={
                                        active
                                            ? "Click to remove"
                                            : "Click to add"
                                    }
                                >
                                    {g.name}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="mt-2 text-xs text-gray-400">
                Selected:{" "}
                <span className="text-gray-200 font-semibold">
                    {selected.size}
                </span>
            </div>

            {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
        </div>
    );
}

export default function Create({ genres }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        year: "",
        description: "",
        genres: [],
        poster: null,
    });

    const [posterPreview, setPosterPreview] = useState(null);

    function onPickPoster(file) {
        setData("poster", file ?? null);
        if (!file) return setPosterPreview(null);
        setPosterPreview(URL.createObjectURL(file));
    }

    function submit(e) {
        e.preventDefault();
        post("/admin/movies", { forceFormData: true });
    }

    return (
        <div className="space-y-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">➕ Add movie</h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Fill details, choose genres with chips, upload a poster.
                    </p>
                </div>

                <Link
                    href="/movies"
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800 transition"
                >
                    ← Back to catalog
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6"
            >
                {/* Poster */}
                <div className="rounded-2xl bg-zinc-800 border border-zinc-700 shadow overflow-hidden">
                    <div className="p-5 border-b border-zinc-700">
                        <h2 className="text-lg font-semibold">Poster</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            JPG/PNG recommended.
                        </p>
                    </div>

                    <div className="p-5 space-y-4">
                        <div className="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
                            {posterPreview ? (
                                <img
                                    src={posterPreview}
                                    alt="Poster preview"
                                    className="aspect-[2/3] w-full object-cover"
                                />
                            ) : (
                                <div className="aspect-[2/3] w-full flex items-center justify-center text-gray-400">
                                    No poster selected
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onPickPoster(e.target.files?.[0])}
                            className="block w-full text-sm text-gray-300
                file:mr-4 file:rounded-lg file:border-0
                file:bg-zinc-900 file:px-4 file:py-2
                file:text-sm file:font-medium file:text-gray-100
                hover:file:bg-zinc-800
                border border-zinc-700 rounded-lg bg-zinc-950 px-3 py-2"
                        />
                        {errors.poster && (
                            <div className="text-sm text-red-400">
                                {errors.poster}
                            </div>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="rounded-2xl bg-zinc-800 border border-zinc-700 shadow">
                    <div className="p-5 border-b border-zinc-700">
                        <h2 className="text-lg font-semibold">Movie details</h2>
                    </div>

                    <div className="p-5 space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-300">
                                    Title
                                </label>
                                <input
                                    placeholder="Interstellar"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className={cn(
                                        "mt-2 w-full rounded-lg bg-zinc-950 border px-3 py-2 text-gray-100 outline-none",
                                        errors.title
                                            ? "border-red-500/70"
                                            : "border-zinc-700 focus:border-blue-500/70"
                                    )}
                                />
                                {errors.title && (
                                    <div className="mt-2 text-sm text-red-400">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-sm text-gray-300">
                                    Year
                                </label>
                                <input
                                    placeholder="2014"
                                    value={data.year}
                                    onChange={(e) =>
                                        setData("year", e.target.value)
                                    }
                                    className={cn(
                                        "mt-2 w-full rounded-lg bg-zinc-950 border px-3 py-2 text-gray-100 outline-none",
                                        errors.year
                                            ? "border-red-500/70"
                                            : "border-zinc-700 focus:border-blue-500/70"
                                    )}
                                />
                                {errors.year && (
                                    <div className="mt-2 text-sm text-red-400">
                                        {errors.year}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-300">
                                Description
                            </label>
                            <textarea
                                placeholder="A brief description..."
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className={cn(
                                    "mt-2 w-full min-h-[140px] rounded-lg bg-zinc-950 border px-3 py-2 text-gray-100 outline-none",
                                    errors.description
                                        ? "border-red-500/70"
                                        : "border-zinc-700 focus:border-blue-500/70"
                                )}
                            />
                            {errors.description && (
                                <div className="mt-2 text-sm text-red-400">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <GenrePicker
                            genres={genres}
                            value={data.genres}
                            onChange={(ids) => setData("genres", ids)}
                            error={errors.genres}
                        />

                        <div className="pt-2 flex flex-wrap gap-2">
                            <button
                                disabled={processing}
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition disabled:opacity-60"
                            >
                                Create
                            </button>

                            <Link
                                href="/movies"
                                className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800 transition"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

Create.layout = (page) => <AppLayout>{page}</AppLayout>;
