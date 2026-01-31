import { Link, usePage, router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function initials(name = "") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    const a = parts[0]?.[0] ?? "";
    const b = parts[1]?.[0] ?? "";
    return (a + b).toUpperCase();
}

export default function AppLayout({ children }) {
    const page = usePage();
    const { auth } = page.props;
    const user = auth.user;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const userMenuRef = useRef(null);

    function logout() {
        router.post("/logout");
    }

    const currentUrl = useMemo(() => page.url ?? "", [page.url]);

    const nav = [
        ...(user ? [{ href: "/profile", label: "Profile" }] : []),
        ...(user?.is_admin
            ? [{ href: "/admin/movies/create", label: "Add movie" }]
            : []),
    ];

    const isActive = (href) => currentUrl === href;

    useEffect(() => {
        function onDocMouseDown(e) {
            if (!userMenuOpen) return;
            if (!userMenuRef.current) return;
            if (userMenuRef.current.contains(e.target)) return;
            setUserMenuOpen(false);
        }
        document.addEventListener("mousedown", onDocMouseDown);
        return () => document.removeEventListener("mousedown", onDocMouseDown);
    }, [userMenuOpen]);

    return (
        <div className="min-h-screen bg-zinc-900 text-gray-100 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50">
                {/* glass */}
                <div className="border-b border-zinc-800 bg-zinc-950/70 backdrop-blur">
                    <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/movies"
                                className="flex items-center gap-2 text-lg font-semibold hover:text-blue-400 transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="text-xl"></span>
                                <span>Movies</span>
                            </Link>

                            {/* Desktop nav */}
                            <nav className="hidden md:flex items-center gap-1">
                                {nav.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "rounded-xl px-3 py-2 text-sm transition",
                                            isActive(item.href)
                                                ? "bg-zinc-800 text-white"
                                                : "text-gray-300 hover:text-white hover:bg-zinc-900"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">
                            {/* Mobile menu */}
                            <button
                                onClick={() => setMobileOpen((v) => !v)}
                                className="md:hidden rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800 transition"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? "✕" : "☰"}
                            </button>

                            {user ? (
                                <>
                                    {user.is_admin && (
                                        <span className="hidden sm:inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200">
                                            Admin
                                        </span>
                                    )}

                                    {/* User dropdown */}
                                    <div className="relative" ref={userMenuRef}>
                                        <button
                                            onClick={() =>
                                                setUserMenuOpen((v) => !v)
                                            }
                                            className={cn(
                                                "flex items-center gap-3 rounded-2xl border px-3 py-2 transition",
                                                userMenuOpen
                                                    ? "border-zinc-700 bg-zinc-800"
                                                    : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                                            )}
                                        >
                                            <div className="hidden sm:flex flex-col items-end leading-tight">
                                                <span className="text-sm font-medium text-gray-100">
                                                    {user.name}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {user.is_admin
                                                        ? "Admin account"
                                                        : "Signed in"}
                                                </span>
                                            </div>

                                            <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-semibold">
                                                {initials(user.name)}
                                            </div>

                                            <span className="hidden sm:inline text-gray-400">
                                                ▾
                                            </span>
                                        </button>

                                        {userMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg">
                                                <div className="px-4 py-3 border-b border-zinc-800">
                                                    <div className="text-sm font-semibold">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {user.email}
                                                    </div>
                                                </div>

                                                <div className="p-1">
                                                    <Link
                                                        href="/profile"
                                                        className="block rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-zinc-900 transition"
                                                        onClick={() =>
                                                            setUserMenuOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        👤 Profile
                                                    </Link>

                                                    {user.is_admin && (
                                                        <Link
                                                            href="/admin/movies/create"
                                                            className="block rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-zinc-900 transition"
                                                            onClick={() =>
                                                                setUserMenuOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            ➕ Add movie
                                                        </Link>
                                                    )}

                                                    <button
                                                        onClick={logout}
                                                        className="w-full text-left rounded-xl px-3 py-2 text-sm text-red-300 hover:bg-zinc-900 transition"
                                                    >
                                                        ⎋ Logout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="hidden sm:flex items-center gap-2">
                                    <Link
                                        href="/login"
                                        className="rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-zinc-900 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500 transition"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* subtle bottom glow line */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

                {/* Mobile nav */}
                {mobileOpen && (
                    <div className="md:hidden border-b border-zinc-800 bg-zinc-950">
                        <div className="mx-auto max-w-7xl px-6 py-3 space-y-1">
                            {nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block rounded-xl px-3 py-2 text-sm transition",
                                        isActive(item.href)
                                            ? "bg-zinc-800 text-white"
                                            : "text-gray-300 hover:text-white hover:bg-zinc-900"
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {!user && (
                                <div className="pt-2 flex gap-2">
                                    <Link
                                        href="/login"
                                        className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-center hover:bg-zinc-800 transition"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm text-center hover:bg-blue-500 transition"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Content */}
            <main className="mx-auto max-w-7xl px-6 py-8 w-full flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-800 bg-zinc-950/60">
                <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-sm text-gray-400">
                        <span className="text-gray-200 font-semibold">
                            Movies
                        </span>{" "}
                        <span className="mx-2 text-gray-600">•</span>
                        Built with Laravel + Inertia + React
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <Link
                            href="/movies"
                            className="text-gray-400 hover:text-white transition"
                        >
                            Catalog
                        </Link>
                        {user ? (
                            <Link
                                href="/profile"
                                className="text-gray-400 hover:text-white transition"
                            >
                                Profile
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <span className="text-gray-600">
                            © {new Date().getFullYear()}
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
