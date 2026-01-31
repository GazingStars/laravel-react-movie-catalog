import { useForm, Link } from "@inertiajs/react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/register");
    }

    return (
        <div className="min-h-screen bg-zinc-900 text-gray-100 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="mb-6">
                    <Link
                        href="/movies"
                        className="inline-flex items-center gap-2 text-lg font-semibold hover:text-blue-400 transition"
                    >
                        <span className="text-xl">🎬</span>
                        <span>Movies</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-zinc-800 border border-zinc-700 shadow overflow-hidden">
                    <div className="p-6 border-b border-zinc-700">
                        <h1 className="text-2xl font-bold">Create account</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Join to rate movies and write reviews.
                        </p>
                    </div>

                    <form onSubmit={submit} className="p-6 space-y-4">
                        {/* Name */}
                        <div>
                            <label className="text-sm text-gray-300">
                                Name
                            </label>
                            <input
                                placeholder="Your name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={cn(
                                    "mt-2 w-full rounded-lg bg-zinc-950 border px-3 py-2 text-gray-100 outline-none",
                                    errors.name
                                        ? "border-red-500/70"
                                        : "border-zinc-700 focus:border-blue-500/70"
                                )}
                                autoComplete="name"
                            />
                            {errors.name && (
                                <div className="mt-2 text-sm text-red-400">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={cn(
                                    "mt-2 w-full rounded-lg bg-zinc-950 border px-3 py-2 text-gray-100 outline-none",
                                    errors.email
                                        ? "border-red-500/70"
                                        : "border-zinc-700 focus:border-blue-500/70"
                                )}
                                autoComplete="email"
                            />
                            {errors.email && (
                                <div className="mt-2 text-sm text-red-400">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={cn(
                                    "mt-2 w-full rounded-lg bg-zinc-950 border px-3 py-2 text-gray-100 outline-none",
                                    errors.password
                                        ? "border-red-500/70"
                                        : "border-zinc-700 focus:border-blue-500/70"
                                )}
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <div className="mt-2 text-sm text-red-400">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Confirm */}
                        <div>
                            <label className="text-sm text-gray-300">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className={cn(
                                    "mt-2 w-full rounded-lg bg-zinc-950 border px-3 py-2 text-gray-100 outline-none",
                                    errors.password_confirmation
                                        ? "border-red-500/70"
                                        : "border-zinc-700 focus:border-blue-500/70"
                                )}
                                autoComplete="new-password"
                            />
                            {errors.password_confirmation && (
                                <div className="mt-2 text-sm text-red-400">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <button
                            disabled={processing}
                            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium hover:bg-emerald-500 transition disabled:opacity-60"
                        >
                            Register
                        </button>

                        <div className="text-sm text-gray-400 text-center">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-gray-200 hover:text-blue-400 transition"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    You can delete your reviews anytime from the movie page.
                </div>
            </div>
        </div>
    );
}
