<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'cpf', 'login', 'password'];
    protected $table = 'customers';

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'fileable');
    }

    public function companies(): MorphToMany
    {
        return $this->morphToMany(Company::class, 'company_relationshipable')->withTimestamps();
    }
}
