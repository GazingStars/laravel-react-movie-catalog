import { useForm, Link } from "@inertiajs/react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post("/login");
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
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Log in to rate movies and write reviews.
                        </p>
                    </div>

                    <form onSubmit={submit} className="p-6 space-y-4">
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
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <div className="mt-2 text-sm text-red-400">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Remember */}
                        <label className="flex items-center gap-3 text-sm text-gray-300">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="h-4 w-4 rounded border-zinc-600 bg-zinc-950 text-blue-600 focus:ring-blue-500"
                            />
                            Remember me
                        </label>

                        {/* Actions */}
                        <button
                            disabled={processing}
                            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium hover:bg-blue-500 transition disabled:opacity-60"
                        >
                            Login
                        </button>

                        <div className="text-sm text-gray-400 text-center">
                            No account?{" "}
                            <Link
                                href="/register"
                                className="text-gray-200 hover:text-blue-400 transition"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    By logging in you can leave reviews and build your own top.
                </div>
            </div>
        </div>
    );
}
