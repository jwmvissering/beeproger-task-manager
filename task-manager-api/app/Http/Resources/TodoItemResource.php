<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'createdAt' => $this->created_at,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'priority' => $this->priority,
            'completed' => $this->completed,
            'completedAt' => $this->completed_at
        ];
    }
}
