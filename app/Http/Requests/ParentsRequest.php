<?php

namespace App\Http\Requests;

use App\Enums\BloodEnum;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ParentsRequest extends FormRequest
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
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'required|string|max:60|unique:parents,email|email:rfc,dns',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:m,f',
            'blood_group' => ['nullable', 'string', Rule::enum(BloodEnum::class)],
            'phone' => 'nullable|string|size:10|unique:parents,phone',
            'address' => 'nullable|string|max:255',
            'password' => 'required|string|min:8|max:20|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/|confirmed',
        ];
    }
}
