<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryProduct extends Model
{
    protected $table = 'categories_products';

    protected $fillable = ["name"];

    public $timestamps = false;

    public function products()
    {
        return $this->belongsToMany(Product::class, 'category_product', 'category_products_id', 'product_id');
    }
}
