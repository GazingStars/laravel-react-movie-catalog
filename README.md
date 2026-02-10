[![CI](https://github.com/GazingStars/laravel-react-movie-catalog/actions/workflows/ci.yml/badge.svg)](https://github.com/GazingStars/laravel-react-movie-catalog/actions/workflows/ci.yml)

# Movie Catalog — Laravel + Inertia + React

Full‑stack SPA приложение каталога фильмов.

Стек: Laravel + Inertia.js + React + MySQL + Sanctum

Проект реализован с разделением ответственности:
MVC + Service Layer + Form Requests + API Resources.
Бизнес‑логика вынесена из контроллеров в сервисы, что упрощает тестирование и масштабирование.

------------------------------------------------------------

STACK

Backend:
- PHP 8+
- Laravel 11+
- MySQL
- Eloquent ORM
- Laravel Sanctum

Frontend:
- React
- Inertia.js
- Vite

------------------------------------------------------------

АРХИТЕКТУРА

Request flow:

```Browser 
↓ 
Route
↓
Controller
↓
FormRequest (validation + authorize)
↓
Service (business logic)
↓
Model (Eloquent) → DB
↓
Resource (DTO)
↓
Inertia::render()
↓
React Page
```
------------------------------------------------------------

СТРУКТУРА ПРОЕКТА

```
app/
Http/
Controllers/
Requests/
Resources/
Services/
Models/

resources/
js/
Pages/

routes/
web.php

database/
migrations/
seeders/
```
------------------------------------------------------------

ОТВЕТСТВЕННОСТЬ СЛОЕВ

Controllers:
- принимают запрос
- вызывают сервис
- возвращают ответ
  Без бизнес‑логики.

FormRequests:
- validation
- authorize
- нормализация входных данных

Services:
- вся бизнес‑логика
- транзакции
- работа с несколькими моделями

Models:
- ORM и связи
- scopes

Resources:
- формирование структуры ответа
- изоляция модели от UI

------------------------------------------------------------

АУТЕНТИФИКАЦИЯ

Laravel Sanctum (SPA cookie-based):
- CSRF protection
- без localStorage токенов
- безопаснее для браузера

------------------------------------------------------------

БАЗА ДАННЫХ

Основные сущности:

User
Movie
Genre
Review
Rating

------------------------------------------------------------

УСТАНОВКА

1. Клонирование

git clone <repo>
cd movie-catalog

2. Backend

composer install
cp .env.example .env
php artisan key:generate

Настройте .env:

DB_DATABASE=movies
DB_USERNAME=root
DB_PASSWORD=

3. Миграции и сидеры

php artisan migrate
php artisan db:seed

4. Frontend

npm install
npm run dev

------------------------------------------------------------

ЗАПУСК

Development:

php artisan serve
npm run dev

http://127.0.0.1:8000

Production:

npm run build
php artisan optimize

------------------------------------------------------------

ПОЛЕЗНЫЕ КОМАНДЫ

php artisan migrate:fresh --seed
php artisan route:list
php artisan tinker
php artisan make:request StoreMovieRequest

------------------------------------------------------------

ПРИНЦИПЫ ПРОЕКТА

- Thin Controllers
- Fat Services
- Validation только в Requests
- Нет бизнес‑логики в Models
- Resources как DTO
- SPA через Inertia без отдельного REST слоя

------------------------------------------------------------

ВОЗМОЖНЫЕ УЛУЧШЕНИЯ

- Feature/Unit тесты
- Redis cache
- Pagination
- Docker
- CI/CD
- API versioning
