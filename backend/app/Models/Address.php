<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['street', 'number', 'district', 'city', 'state'];
    protected $table = 'addresses';

    public function addressable(): MorphTo
    {
        return $this->morphTo();
    }
}
