<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = "posts";

    protected $fillable = [
        'title',
        'description',
        'content',
        'photo',
        'user_id',
    ];

    public function categories()
    {
        return $this->belongsToMany(CategoryPost::class, 'post_category', 'post_id', 'category_id');
    }
}
