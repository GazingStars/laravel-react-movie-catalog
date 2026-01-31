<?php

namespace App\Http\Requests\Movie;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'year'        => ['required', 'integer', 'between:1900,' . date('Y')],
            'description' => ['nullable', 'string'],
            'genres'      => ['array'],
            'genres.*'    => ['exists:genres,id'],
            'poster'      => ['nullable', 'image', 'max:2048'],
        ];
    }
}
