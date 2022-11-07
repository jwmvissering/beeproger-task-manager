<?php

namespace App\Http\Requests\TodoItems;

use Illuminate\Foundation\Http\FormRequest;

class TodoItemsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
            'order' => 'nullable|integer',
            'priority' => 'in:high,medium,low'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => 'A title is required.',
            'priority.in' => 'Priority must be high, medium,or low'
        ];
    }

}
