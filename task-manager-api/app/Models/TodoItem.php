<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'completed', 'completed_at', 'image'
    ];

    protected $dates = [
        'completed_at'
    ];

    protected $casts = [
        'completed' => 'boolean'
    ];
}
