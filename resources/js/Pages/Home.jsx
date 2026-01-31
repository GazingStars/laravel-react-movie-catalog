import { Link, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout.jsx";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home({ stats, top, latest }) {
  const { auth } = usePage().props;
  const user = auth.user;

  const Stat = ({ label, value, icon }) => (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-lg">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
    </div>
  );

  const MovieCard = ({ movie, compact = false }) => (
    <Link
      href={`/movies/${movie.id}`}
      className={cn(
        "group rounded-2xl border border-zinc-800 bg-zinc-950/40 overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-700 transition",
        compact ? "flex" : "block"
      )}
    >
      <div className={cn("relative", compact ? "w-24 shrink-0" : "")}>
        {movie.poster_path ? (
          <img
            src={`/storage/${movie.poster_path}`}
            alt={movie.title}
            className={cn(
              "object-cover",
              compact ? "h-28 w-24" : "aspect-[2/3] w-full"
            )}
            loading="lazy"
          />
        ) : (
          <div
            className={cn(
              "bg-zinc-800 text-gray-300 flex items-center justify-center",
              compact ? "h-28 w-24 text-xs" : "aspect-[2/3]"
            )}
          >
            No poster
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full border border-zinc-700 bg-zinc-950/80 px-3 py-1 text-xs text-gray-100 backdrop-blur">
          ⭐ {Number(movie.rating ?? 0).toFixed(1)}
        </div>
      </div>

      <div className={cn("p-4", compact ? "py-3" : "")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-base font-semibold text-white group-hover:text-blue-400 transition truncate">
              {movie.title}
            </div>
            <div className="mt-1 text-sm text-gray-400">{movie.year}</div>
          </div>
          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-gray-200">
            #{movie.id}
          </span>
        </div>

        {(movie.genres ?? []).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genres.slice(0, 3).map((g) => (
              <span
                key={g.id}
                className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-gray-200"
              >
                {g.name}
              </span>
            ))}
            {movie.genres.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{movie.genres.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 shadow">
        {/* background glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-600/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="relative p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-gray-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live catalog • Ratings • Reviews
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                🎬 Movies — каталог, где{" "}
                <span className="text-blue-400">приятно</span> смотреть и
                оценивать
              </h1>

              <p className="mt-4 text-gray-300 leading-relaxed">
                Быстро добавляй фильмы (административные возможности), оставляй отзывы, смотри рейтинг и
                жанры. Интерфейс — без лишнего шума: карточки, и нормальная навигация.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/movies"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-500 transition shadow"
                >
                  Открыть каталог →
                </Link>

                {user ? (
                  <Link
                    href="/profile"
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-gray-200 hover:bg-zinc-800 transition"
                  >
                    Профиль
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-gray-200 hover:bg-zinc-800 transition"
                    >
                      Войти
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-5 py-3 text-sm text-blue-200 hover:bg-blue-500/15 transition"
                    >
                      Регистрация
                    </Link>
                  </>
                )}

                {user?.is_admin && (
                  <Link
                    href="/admin/movies/create"
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium hover:bg-emerald-500 transition shadow"
                  >
                    ➕ Добавить фильм
                  </Link>
                )}
              </div>
            </div>

            {/* Right: mini features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 w-full lg:w-[360px]">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="text-sm font-semibold text-white">
                  ⚡ Быстро и чисто
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  Laravel + Inertia + React.
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="text-sm font-semibold text-white">
                  ⭐ Рейтинг и отзывы
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  Оценивай и пиши мнение — рейтинг обновляется.
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="text-sm font-semibold text-white">
                  🏷 Жанры и порядок
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  Карточки жанров, аккуратный UI.
                </div>
              </div>
            </div>
          </div>

          {/* stats row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Stat label="Фильмов" value={stats?.movies ?? "—"} icon="🎞️" />
            <Stat label="Отзывов" value={stats?.reviews ?? "—"} icon="💬" />
            <Stat label="Жанров" value={stats?.genres ?? "—"} icon="🏷️" />
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Top rated */}
        <div className="lg:col-span-2 rounded-3xl border border-zinc-800 bg-zinc-950/50 shadow overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">🔥 Top rated</div>
              <div className="text-sm text-gray-400 mt-1">
                Подборка самых высоко оценённых
              </div>
            </div>
            <Link
              href="/movies"
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-gray-200 hover:bg-zinc-800 transition"
            >
              В каталог
            </Link>
          </div>

          <div className="p-6">
            {(top ?? []).length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center">
                <div className="text-white font-semibold">Пока пусто</div>
                <div className="mt-2 text-sm text-gray-400">
                  Тут скоро появится топ.
                </div>
                {user?.is_admin && (
                  <Link
                    href="/admin/movies/create"
                    className="mt-4 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 transition"
                  >
                    ➕ Добавить фильм
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {top.slice(0, 6).map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Latest */}
        <aside className="rounded-3xl border border-zinc-800 bg-zinc-950/50 shadow overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <div className="text-lg font-semibold">🆕 Latest</div>
            <div className="text-sm text-gray-400 mt-1">
              Недавно добавленные фильмы
            </div>
          </div>

          <div className="p-4 space-y-3">
            {(latest ?? []).length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center text-sm text-gray-400">
                Нет новых фильмов.
              </div>
            ) : (
              latest.slice(0, 6).map((m) => (
                <MovieCard key={m.id} movie={m} compact />
              ))
            )}
          </div>

          <div className="p-4 border-t border-zinc-800 bg-zinc-950/70">
            <Link
              href="/movies"
              className="block rounded-xl bg-zinc-900 px-4 py-3 text-sm text-center text-gray-200 hover:bg-zinc-800 transition"
            >
              Смотреть всё →
            </Link>
          </div>
        </aside>
      </section>

      {/* CTA bottom */}
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-6 sm:p-8 shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-xl font-semibold">Готов продолжать?</div>
            <div className="mt-1 text-sm text-gray-400">
              Зайди в каталог, добавь оценку и оставь отзыв.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/movies"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium hover:bg-blue-500 transition"
            >
              Открыть каталог
            </Link>
            {user?.is_admin && (
              <Link
                href="/admin/movies/create"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium hover:bg-emerald-500 transition"
              >
                ➕ Добавить фильм
              </Link>
            )}
            {!user && (
              <Link
                href="/register"
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-gray-200 hover:bg-zinc-800 transition"
              >
                Создать аккаунт
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

Home.layout = (page) => <AppLayout>{page}</AppLayout>;
